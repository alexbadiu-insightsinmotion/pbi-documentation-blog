// French translation files are hand/Claude-authored once and committed —
// unlike src/content/blog/, they're never regenerated from PBI-Documentation.
// That's correct for the translated title/excerpt/body, but wrong for the
// fields that are just copied verbatim from English (cover, date, tag,
// author, sourceFile, sourceUrl) — if the source repo's image link gets
// fixed, or a manifest tag/author gets corrected, French silently keeps the
// old value forever unless something re-patches it.
//
// This script re-patches exactly those pass-through fields in every French
// file from the current English sync, leaving title/excerpt/body/enSlug
// (the actual translation) untouched. Run after `npm run sync`.

import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const EN_DIR = path.join(ROOT, 'src/content/blog');
const FR_DIR = path.join(ROOT, 'content/translations/fr');

const PASSTHROUGH_FIELDS = ['date', 'tag', 'author', 'cover', 'sourceFile', 'sourceUrl'];

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n\n?([\s\S]*)$/);
  if (!match) return null;
  const [, raw, body] = match;
  const fields = {};
  for (const line of raw.split('\n')) {
    const fieldMatch = line.match(/^([a-zA-Z]+):\s*(.*)$/);
    if (fieldMatch) fields[fieldMatch[1]] = fieldMatch[2];
  }
  return { fields, body };
}

function serializeFrontmatter(fields) {
  const order = ['title', 'date', 'tag', 'author', 'cover', 'excerpt', 'sourceFile', 'sourceUrl', 'enSlug'];
  return order
    .filter((key) => fields[key] !== undefined)
    .map((key) => `${key}: ${fields[key]}`)
    .join('\n');
}

async function main() {
  const frFiles = (await readdir(FR_DIR)).filter((f) => f.endsWith('.md'));
  let patched = 0;

  for (const file of frFiles) {
    const slug = file.replace(/\.md$/, '');
    const enPath = path.join(EN_DIR, file);

    let enContent;
    try {
      enContent = await readFile(enPath, 'utf8');
    } catch {
      console.log(`  – ${slug}: no matching English file (post no longer published?), skipping`);
      continue;
    }

    const frPath = path.join(FR_DIR, file);
    const frContent = await readFile(frPath, 'utf8');

    const en = parseFrontmatter(enContent);
    const fr = parseFrontmatter(frContent);
    if (!en || !fr) continue;

    let changed = false;
    for (const key of PASSTHROUGH_FIELDS) {
      if (en.fields[key] !== undefined && en.fields[key] !== fr.fields[key]) {
        fr.fields[key] = en.fields[key];
        changed = true;
      }
    }

    if (changed) {
      const newContent = `---\n${serializeFrontmatter(fr.fields)}\n---\n\n${fr.body}`;
      await writeFile(frPath, newContent, 'utf8');
      console.log(`  ✓ ${slug}: metadata refreshed`);
      patched += 1;
    }
  }

  console.log(`\n${patched} French file(s) had stale metadata refreshed.`);
}

await main();
