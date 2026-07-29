// Pulls the allow-listed posts from content-manifest.json out of the
// PBI-Documentation GitHub repo and materializes them as Astro content
// collection entries in src/content/blog/. That output folder is gitignored
// and regenerated on every run, so PBI-Documentation stays the single
// source of truth — nothing here ever needs to be edited by hand.

import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OWNER = 'alexbadiu-insightsinmotion';
const REPO = 'PBI-Documentation';
const BRANCH = 'main';

const ROOT = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const MANIFEST_PATH = path.join(ROOT, 'content-manifest.json');
const OUT_DIR = path.join(ROOT, 'src/content/blog');

function resolveToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execSync('gh auth token', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || undefined;
  } catch {
    return undefined;
  }
}

function authHeaders(token) {
  const headers = { 'User-Agent': 'pbi-documentation-blog-sync' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function titleFromFilename(file) {
  return file
    .replace(/\.md$/i, '')
    .replace(/^\d+\s*-\s*/, '')
    .trim();
}

async function fetchRawMarkdown(file) {
  const encodedPath = file.split('/').map(encodeURIComponent).join('/');
  const url = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${encodedPath}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${file}: ${res.status} ${res.statusText}`);
  return res.text();
}

async function getFirstCommitDate(file, token) {
  try {
    const api = `https://api.github.com/repos/${OWNER}/${REPO}/commits`;
    const qs = `path=${encodeURIComponent(file)}&per_page=1`;
    const first = await fetch(`${api}?${qs}`, { headers: authHeaders(token) });
    if (!first.ok) return null;

    let lastPage = 1;
    const link = first.headers.get('link');
    if (link) {
      const match = link.match(/[?&]page=(\d+)>;\s*rel="last"/);
      if (match) lastPage = parseInt(match[1], 10);
    }

    const res = lastPage === 1 ? first : await fetch(`${api}?${qs}&page=${lastPage}`, { headers: authHeaders(token) });
    const data = await res.json();
    const commit = Array.isArray(data) ? data[data.length - 1] : null;
    const date = commit?.commit?.author?.date;
    return date ? date.slice(0, 10) : null;
  } catch {
    return null;
  }
}

function extractCover(body) {
  const match = body.match(/<img[^>]*\ssrc=["']([^"']+)["'][^>]*\/?>/i);
  if (!match) return { cover: undefined, body };
  const cleaned = body.replace(match[0], '').replace(/^\s+/, '');
  return { cover: match[1], body: cleaned };
}

function stripTableOfContents(body) {
  return body.replace(/^#{1,4}\s*Table of Contents\s*$[\s\S]*?(?=^#{1,3}\s)/im, '');
}

function stripLeadingIssueTag(body) {
  return body.replace(/^#Documentation\/Issue\d+\s*\n+/i, '');
}

function collapseBlankLines(body) {
  return body.replace(/\n{3,}/g, '\n\n').trim();
}

function deriveExcerpt(body) {
  const firstParagraph = body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith('#') && !block.startsWith('<img'));
  if (!firstParagraph) return '';
  const plain = firstParagraph.replace(/[*_`#]/g, '').replace(/\s+/g, ' ').trim();
  return plain.length > 200 ? `${plain.slice(0, 197)}...` : plain;
}

function toFrontmatterValue(value) {
  return JSON.stringify(value);
}

async function run() {
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
  const token = resolveToken();

  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  let ok = 0;
  const failures = [];

  for (const entry of manifest) {
    try {
      const raw = await fetchRawMarkdown(entry.file);
      const title = entry.title ?? titleFromFilename(entry.file);
      const slug = entry.slug ?? slugify(title);

      const { cover, body: withoutCover } = extractCover(raw);
      const body = collapseBlankLines(stripLeadingIssueTag(stripTableOfContents(withoutCover)));

      const date = entry.date ?? (await getFirstCommitDate(entry.file, token)) ?? new Date().toISOString().slice(0, 10);
      const excerpt = entry.excerpt ?? deriveExcerpt(body);
      const sourceUrl = `https://github.com/${OWNER}/${REPO}/blob/${BRANCH}/${entry.file.split('/').map(encodeURIComponent).join('/')}`;

      const frontmatter = [
        `title: ${toFrontmatterValue(title)}`,
        `date: ${date}`,
        `tags: ${JSON.stringify(entry.tags ?? [])}`,
        cover ? `cover: ${toFrontmatterValue(cover)}` : null,
        excerpt ? `excerpt: ${toFrontmatterValue(excerpt)}` : null,
        `sourceFile: ${toFrontmatterValue(entry.file)}`,
        `sourceUrl: ${toFrontmatterValue(sourceUrl)}`,
      ].filter(Boolean).join('\n');
      const frontmatterBlock = `---\n${frontmatter}\n---\n\n`;

      await writeFile(path.join(OUT_DIR, `${slug}.md`), frontmatterBlock + body + '\n', 'utf8');
      ok += 1;
      console.log(`  ✓ ${entry.file} -> ${slug}.md`);
    } catch (err) {
      failures.push({ file: entry.file, error: err.message });
      console.error(`  ✗ ${entry.file}: ${err.message}`);
    }
  }

  console.log(`\nSynced ${ok}/${manifest.length} posts into src/content/blog/`);
  if (failures.length) {
    console.error(`${failures.length} post(s) failed to sync — see errors above.`);
    process.exitCode = 1;
  }
}

// Guard against an empty OUT_DIR breaking Astro's content collection glob
// loader on a fresh checkout before the first sync has ever run.
await (async () => {
  try {
    await readdir(OUT_DIR);
  } catch {
    await mkdir(OUT_DIR, { recursive: true });
  }
})();

await run();
