// Verifies that every upstream file the Deneb gallery links to actually exists.
//
// Wave 8 did this check by hand. It is worth automating because the filenames are
// not derivable: 913.1 and 914.1 drop the `template.` segment every other template
// JSON carries, and the version suffix moves between v1.8.1, v1.8.2 and v1.9.1. A
// typo in one produces a link that looks perfectly plausible and 404s.
//
// Audits the registry rather than dist/, because every href on the page is built
// from the registry through one helper (`upstreamHref`), so the registry is the
// only place a name can be wrong — and this then runs without a build.
//
// Usage: node scripts/audit-repo-links.mjs
// Honours GITHUB_TOKEN when present (5000 req/hr instead of 60).

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const OWNER = 'alexbadiu-insightsinmotion';
const REPO = 'PBI-Documentation';
const BRANCH = 'main';
const DIR = 'Components/Deneb';

const REGISTRY = path.join(ROOT, 'src/components/deneb/templates.ts');
const COPY = path.join(ROOT, 'src/i18n/deneb.ts');

/**
 * Pull one entry per template out of the registry source.
 *
 * Regex rather than an import: templates.ts imports .astro components, which node
 * cannot load. The shape it matches is the one the file documents, and a registry
 * that stops matching fails loudly below rather than silently auditing nothing.
 */
async function readRegistry() {
  const src = await readFile(REGISTRY, 'utf8');
  const block = src.slice(src.indexOf('export const TEMPLATES'), src.indexOf('\n];'));
  const entries = [];
  const re =
    /num: '(\d{2})',\s*\n\s*slug: '([^']+)',\s*\n\s*Component: \w+,\s*\n\s*doc: '([^']+)',\s*\n\s*json: (\[[^\]]*\])/g;
  let m;
  while ((m = re.exec(block))) {
    const json = [...m[4].matchAll(/'([^']+)'/g)].map((j) => j[1]);
    entries.push({ num: m[1], slug: m[2], doc: m[3], json });
  }
  if (!entries.length) throw new Error('registry parse found no entries — has TemplateEntry changed shape?');
  return entries;
}

async function exists(file) {
  const url =
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/` +
    `${DIR.split('/').map(encodeURIComponent).join('/')}/${encodeURIComponent(file)}?ref=${BRANCH}`;
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'pbi-docs-blog-audit' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(url, { headers });
  if (res.status === 200) return { ok: true, size: (await res.json()).size };
  if (res.status === 404) return { ok: false, reason: '404' };
  return { ok: false, reason: `HTTP ${res.status}` };
}

const entries = await readRegistry();
const { templates: en } = (await import('../src/i18n/deneb.ts')).denebCopy('en');
const { templates: fr } = (await import('../src/i18n/deneb.ts')).denebCopy('fr');

const problems = [];

if (entries.length !== Object.keys(en).length) {
  problems.push(`registry has ${entries.length} entries, en copy has ${Object.keys(en).length}`);
}

for (const e of entries) {
  // A template with variants needs one label per JSON in both locales, or the
  // links render as several identical "Template JSON" rows. DenebGallery throws
  // on this at build time; catching it here reports all of them at once.
  for (const [lang, copy] of [['en', en], ['fr', fr]]) {
    const c = copy[e.slug];
    if (!c) {
      problems.push(`${e.num} ${e.slug}: no ${lang} copy`);
      continue;
    }
    if (!c.description) problems.push(`${e.num} ${e.slug}: empty ${lang} description`);
    const labels = c.jsonLabels ?? [];
    if (e.json.length > 1 && labels.length !== e.json.length) {
      problems.push(`${e.num} ${e.slug}: ${e.json.length} JSONs but ${labels.length} ${lang} jsonLabels`);
    }
  }

  for (const file of [e.doc, ...e.json]) {
    const r = await exists(file);
    if (r.ok) {
      console.log(`  ok   ${e.num}  ${file}  (${r.size} bytes)`);
    } else {
      console.log(`  FAIL ${e.num}  ${file}  (${r.reason})`);
      problems.push(`${e.num} ${e.slug}: ${file} — ${r.reason}`);
    }
  }
}

const checked = entries.reduce((n, e) => n + 1 + e.json.length, 0);
console.log(`\n${entries.length} templates, ${checked} upstream files checked.`);

if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log('0 mismatches.');
