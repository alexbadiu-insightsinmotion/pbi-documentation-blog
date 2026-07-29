// Zero-account "subscribe" mechanism: whenever a post shows up in
// src/content/blog/ (i.e. was just synced) that hasn't been announced yet,
// open a GitHub Discussion for it in the "Announcements" category. Anyone
// who clicks "Watch" on that category (or the whole repo) gets a real email
// from GitHub itself the moment this runs — no third-party email service,
// no API key, no account for the site owner to create.
//
// announced-posts.json tracks which slugs have already gotten a Discussion
// so re-running this (daily, or on every push) never double-announces.

import { readFile, readdir, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OWNER = 'alexbadiu-insightsinmotion';
const REPO = 'pbi-documentation-blog';
const SITE_URL = 'https://insightsinmotion.com';
const CATEGORY_NAME = 'Announcements';

const ROOT = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const ANNOUNCED_PATH = path.join(ROOT, 'announced-posts.json');
const BLOG_DIR = path.join(ROOT, 'src/content/blog');

function resolveToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execSync('gh auth token', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || undefined;
  } catch {
    return undefined;
  }
}

async function graphql(token, query, variables) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'pbi-documentation-blog-announce',
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

function unescapeYamlString(value) {
  return value.replace(/\\"/g, '"');
}

async function readSyncedPosts() {
  const files = await readdir(BLOG_DIR);
  const posts = [];
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const slug = file.replace(/\.md$/, '');
    const content = await readFile(path.join(BLOG_DIR, file), 'utf8');
    const frontmatter = content.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    const title = unescapeYamlString(frontmatter.match(/title:\s*"((?:[^"\\]|\\.)*)"/)?.[1] ?? slug);
    const excerpt = unescapeYamlString(frontmatter.match(/excerpt:\s*"((?:[^"\\]|\\.)*)"/)?.[1] ?? '');
    posts.push({ slug, title, excerpt });
  }
  return posts;
}

async function main() {
  const token = resolveToken();
  if (!token) {
    console.log('No GitHub token available — skipping announce step.');
    return;
  }

  let announced = [];
  try {
    announced = JSON.parse(await readFile(ANNOUNCED_PATH, 'utf8'));
  } catch {
    announced = [];
  }
  const announcedSet = new Set(announced);

  const posts = await readSyncedPosts();
  const newPosts = posts.filter((p) => !announcedSet.has(p.slug));

  if (newPosts.length === 0) {
    console.log('No new posts to announce.');
    return;
  }

  const repoData = await graphql(
    token,
    `query($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        id
        discussionCategories(first: 20) { nodes { id name } }
      }
    }`,
    { owner: OWNER, name: REPO }
  );

  const repoId = repoData.repository.id;
  const category = repoData.repository.discussionCategories.nodes.find((c) => c.name === CATEGORY_NAME);
  if (!category) {
    console.error(`Discussion category "${CATEGORY_NAME}" not found — skipping announce step.`);
    return;
  }

  for (const post of newPosts) {
    const url = `${SITE_URL}/blog/${post.slug}/`;
    const body = post.excerpt ? `${post.excerpt}\n\n[Read the full post](${url})` : `[Read the full post](${url})`;

    await graphql(
      token,
      `mutation($repoId: ID!, $categoryId: ID!, $title: String!, $body: String!) {
        createDiscussion(input: { repositoryId: $repoId, categoryId: $categoryId, title: $title, body: $body }) {
          discussion { url }
        }
      }`,
      { repoId, categoryId: category.id, title: post.title, body }
    );

    console.log(`  ✓ Announced: ${post.title}`);
    announcedSet.add(post.slug);
  }

  await writeFile(ANNOUNCED_PATH, `${JSON.stringify([...announcedSet].sort(), null, 2)}\n`, 'utf8');
  console.log(`\nAnnounced ${newPosts.length} new post(s).`);
}

await main();
