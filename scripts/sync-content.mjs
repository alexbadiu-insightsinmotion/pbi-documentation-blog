// Pulls the allow-listed posts from content-manifest.json out of the
// PBI-Documentation GitHub repo and materializes them as Astro content
// collection entries in src/content/blog/. That output folder is gitignored
// and regenerated on every run, so PBI-Documentation stays the single
// source of truth — nothing here ever needs to be edited by hand. Stale files
// are pruned only when every manifest entry synced cleanly.

import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OWNER = 'alexbadiu-insightsinmotion';
const REPO = 'PBI-Documentation';
const BRANCH = 'main';
const API_ROOT = 'https://api.github.com';
const MAX_ATTEMPTS = 4;

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

function authHeaders(token, accept = 'application/vnd.github+json') {
  const headers = { 'User-Agent': 'pbi-documentation-blog-sync', Accept: accept };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Every request goes through api.github.com rather than raw.githubusercontent.com.
// The raw host ignores the Authorization header entirely and throttles per-IP, so
// a token buys nothing there and one throttled IP fails all posts at once. The API
// path is authenticated (5000 req/hr) and transient throttles get backed off here.
async function fetchWithRetry(url, headers) {
  let lastStatus = 'unknown error';

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const res = await fetch(url, { headers });
    if (res.ok) return res;
    lastStatus = `${res.status} ${res.statusText}`;

    const retryable = res.status === 429 || res.status === 403 || res.status >= 500;
    if (!retryable || attempt === MAX_ATTEMPTS) break;

    const retryAfter = Number(res.headers.get('retry-after'));
    const waitMs = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 1000 * 2 ** (attempt - 1);
    console.warn(`    … ${lastStatus} — retrying in ${Math.round(waitMs / 1000)}s (attempt ${attempt + 1}/${MAX_ATTEMPTS})`);
    await sleep(waitMs);
  }

  throw new Error(lastStatus);
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

async function fetchRawMarkdown(file, token) {
  const encodedPath = file.split('/').map(encodeURIComponent).join('/');
  const url = `${API_ROOT}/repos/${OWNER}/${REPO}/contents/${encodedPath}?ref=${BRANCH}`;
  try {
    // The raw media type hands back the file body verbatim, so there is no
    // base64 envelope to decode and no 1 MB JSON payload ceiling.
    const res = await fetchWithRetry(url, authHeaders(token, 'application/vnd.github.raw'));
    return await res.text();
  } catch (err) {
    throw new Error(`Failed to fetch ${file}: ${err.message}`);
  }
}

async function getFirstCommitDate(file, token) {
  try {
    const api = `${API_ROOT}/repos/${OWNER}/${REPO}/commits`;
    const qs = `path=${encodeURIComponent(file)}&per_page=1`;
    const first = await fetchWithRetry(`${api}?${qs}`, authHeaders(token));

    let lastPage = 1;
    const link = first.headers.get('link');
    if (link) {
      const match = link.match(/[?&]page=(\d+)>;\s*rel="last"/);
      if (match) lastPage = parseInt(match[1], 10);
    }

    const res = lastPage === 1 ? first : await fetchWithRetry(`${api}?${qs}&page=${lastPage}`, authHeaders(token));
    const data = await res.json();
    const commit = Array.isArray(data) ? data[data.length - 1] : null;
    const date = commit?.commit?.author?.date;
    return date ? date.slice(0, 10) : null;
  } catch {
    return null;
  }
}

function extractCover(body) {
  // Some posts use an HTML <img>, others a markdown ![alt](url) image —
  // whichever appears first in the body is the intended cover.
  const htmlMatch = body.match(/<img[^>]*\ssrc=["']([^"']+)["'][^>]*\/?>/i);
  const mdMatch = body.match(/!\[[^\]]*\]\(([^)]+)\)/);

  let match = null;
  let url;
  if (htmlMatch && (!mdMatch || body.indexOf(htmlMatch[0]) <= body.indexOf(mdMatch[0]))) {
    match = htmlMatch;
    url = htmlMatch[1];
  } else if (mdMatch) {
    match = mdMatch;
    url = mdMatch[1];
  }

  if (!match) return { cover: undefined, body };
  const cleaned = body.replace(match[0], '').replace(/^\s+/, '');
  return { cover: url, body: cleaned };
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

function stripMarkdownLinksAndImages(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
}

function hasRealText(block) {
  // Rejects heading lines, bare image tags/links, and HTML-only spacer
  // blocks (some posts have leftover "<br>\n<br>" spacers where the cover
  // image was, or a second markdown ![...](...) image right after it).
  const withoutMarkdownImage = block.replace(/^!\[[^\]]*\]\([^)]*\)$/, '');
  return /[a-z0-9]/i.test(withoutMarkdownImage.replace(/<[^>]+>/g, ''));
}

function deriveExcerpt(body) {
  const firstParagraph = body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith('#') && !block.startsWith('<img') && hasRealText(block));
  if (!firstParagraph) return '';
  const plain = stripMarkdownLinksAndImages(firstParagraph)
    .replace(/<[^>]+>/g, '')
    .replace(/[*_`#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > 200 ? `${plain.slice(0, 197)}...` : plain;
}

function toFrontmatterValue(value) {
  return JSON.stringify(value);
}

async function run() {
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
  const token = resolveToken();
  if (!token) {
    console.warn('No GitHub token found — set GITHUB_TOKEN or run `gh auth login`, otherwise requests are unauthenticated and throttle quickly.\n');
  }

  await mkdir(OUT_DIR, { recursive: true });

  // Fetch everything before touching the output folder. Clearing it up front
  // meant a throttled or offline run wiped every post and left the content
  // collection empty, which breaks the dev server rather than degrading to
  // the content already on disk.
  const generated = [];
  const failures = [];

  for (const entry of manifest) {
    try {
      if (!entry.tag) throw new Error('manifest entry is missing required "tag"');
      if (!entry.author) throw new Error('manifest entry is missing required "author"');

      const raw = await fetchRawMarkdown(entry.file, token);
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
        `tag: ${toFrontmatterValue(entry.tag)}`,
        `author: ${toFrontmatterValue(entry.author)}`,
        cover ? `cover: ${toFrontmatterValue(cover)}` : null,
        excerpt ? `excerpt: ${toFrontmatterValue(excerpt)}` : null,
        `sourceFile: ${toFrontmatterValue(entry.file)}`,
        `sourceUrl: ${toFrontmatterValue(sourceUrl)}`,
      ].filter(Boolean).join('\n');
      const frontmatterBlock = `---\n${frontmatter}\n---\n\n`;

      generated.push({ file: entry.file, filename: `${slug}.md`, contents: frontmatterBlock + body + '\n' });
      console.log(`  ✓ ${entry.file} -> ${slug}.md`);
    } catch (err) {
      failures.push({ file: entry.file, error: err.message });
      console.error(`  ✗ ${entry.file}: ${err.message}`);
    }
  }

  for (const post of generated) {
    await writeFile(path.join(OUT_DIR, post.filename), post.contents, 'utf8');
  }

  // Prune only after a clean sweep. On a partial run the leftovers may well be
  // the still-good copies of the posts that just failed.
  if (!failures.length) {
    const keep = new Set(generated.map((post) => post.filename));
    for (const name of await readdir(OUT_DIR)) {
      if (name.endsWith('.md') && !keep.has(name)) {
        await rm(path.join(OUT_DIR, name));
        console.log(`  - removed stale ${name}`);
      }
    }
  }

  console.log(`\nSynced ${generated.length}/${manifest.length} posts into src/content/blog/`);
  if (failures.length) {
    console.error(`${failures.length} post(s) failed to sync — see errors above.`);
    console.error('Content already in src/content/blog/ was left in place.');
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
