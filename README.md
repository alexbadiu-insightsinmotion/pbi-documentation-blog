# PBI Documentation — blog

A blog site built with [Astro](https://astro.build) + Tailwind v4, styled after the
[Deneb Gallery](https://github.com/alexbadiu-insightsinmotion) Fabric App's warm
amber/parchment editorial design, and structured like
[promptingbi.com](https://promptingbi.com) (simple home card-list + article pages).

Content is not written here. It's pulled from the
[`PBI-Documentation`](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation)
GitHub repo, which is the single source of truth for the actual article text.

See `planSite.md` for the wave-by-wave roadmap this site was built against.

## Choosing which posts are published

`content-manifest.json` (repo root) is the allow-list. Only files listed there are
ever built as posts — everything else in `PBI-Documentation` (Cheat-Sheet/,
Components/, Presentations/, templates, etc.) is ignored automatically.

To publish a new post: add one entry with a `tag` and `author` (both required —
they're editorial calls that can't be derived from the content), e.g.

```json
{ "file": "27 - My New Post.md", "tag": "documentation", "author": "Alex Badiu" }
```

To unpublish a post: delete its entry.

Optional per-entry overrides: `slug`, `title`, `date`, `excerpt`. If omitted, the
sync script derives the title from the filename, slugifies it for the URL, and
looks up the file's first commit date in `PBI-Documentation` for the publish date.

**Publishing a new post also means adding its French translation** — see
"Bilingual content" below. This isn't automated by the sync script (no LLM is
wired into the build), so it's a manual/Claude-assisted step each time.

## How the content pipeline works

`npm run sync` (also runs automatically before `dev`/`build`) reads the manifest,
fetches each listed file straight from `PBI-Documentation` on GitHub, strips the
manual GitHub-anchor table of contents (Astro generates its own from headings),
pulls out the first image as the cover, and writes the result into
`src/content/blog/*.md` with generated frontmatter. That folder is gitignored and
regenerated every run — `PBI-Documentation` stays the only place the actual content
lives, so it can never go stale relative to this repo.

## Bilingual content (EN default, FR translation)

Every English post has a French counterpart at the same slug, under
`/fr/blog/<slug>/`. Unlike the English content, French translations are **not**
regenerated from `PBI-Documentation` — they're hand/Claude-authored files
committed directly to this repo at `content/translations/fr/<slug>.md`, since a
translation is a presentation-layer asset for this site rather than part of the
original LinkedIn-published post history.

To add a translation for a new post: translate the synced English file
(`src/content/blog/<slug>.md`) into French, keeping the same frontmatter fields
plus an `enSlug` field pointing back at the English slug, and write it to
`content/translations/fr/<slug>.md`.

**Keeping pass-through fields in sync:** `date`, `tag`, `author`, `cover`,
`sourceFile`, and `sourceUrl` are just copied from English at translation
time — if the source repo's image link gets fixed, or a manifest tag/author
gets corrected later, the French file would otherwise keep the stale value
forever. `npm run sync` runs `scripts/sync-fr-metadata.mjs` right after the
regular sync, which re-patches exactly those fields in every French file from
the current English sync — it never touches the translated title, excerpt, or
body.

Contact and Search have full French versions (`/fr/contact/`, `/fr/search/`,
with their own copy). Search's index (`search-index.json.js`) merges both
`blog` and `blogFr` collections, so either language's search page can surface
both — each result links to its own correct language and URL. The Deneb
gallery has a French chrome version (`/fr/deneb/`) too, but the 17 templates'
own text stays English (translating that content is out of scope) — a small
note on that page says so in French. Subscribe stays English-only.

## Commands

| Command           | Action                                                          |
| :----------------- | :-------------------------------------------------------------- |
| `npm install`       | Install dependencies                                            |
| `npm run sync`      | Pull posts from `PBI-Documentation` per `content-manifest.json` |
| `npm run dev`       | Sync, then start the local dev server at `localhost:4321`       |
| `npm run build`     | Sync, then build the static site to `./dist/`                   |
| `npm run preview`   | Preview a production build locally                              |

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on push to `main`,
on manual dispatch, and daily (so edits to already-included source posts show up
without needing a push here). Enable **GitHub Pages → Source: GitHub Actions** in
the repo settings once this is pushed.

## Site config

`src/site.config.ts` holds the title, tagline, description (EN + FR), `linkedin`
(your profile, used on Contact/footer), `coAuthor` (Greg's name + LinkedIn, used
on Contact), and `discussionsUrl` (the Subscribe destination — see below). The
`social` block (X/YouTube) starts empty; `Footer.astro` only renders the ones
that are set.

## Subscribe (GitHub Discussions, not an email service)

There's no newsletter service wired up, and no account was created as part of
building this. `Subscribe.astro`'s button (`site.watchUrl`) goes straight to
this repo's notification settings page
(`https://github.com/.../pbi-documentation-blog/subscription`) — no hunting
for a "Watch" button on some other page. To subscribe, a reader:
1. Clicks the button (signs in to GitHub if needed).
2. On the settings page that opens, chooses **All Activity** (or **Custom →
   Discussions** to only watch this, not code activity).

From then on, GitHub itself emails them the moment a new post is announced
via a Discussion in the **Announcements** category (`site.discussionsUrl`,
linked as a secondary "How does this work?" line under the button) — no
third-party service, no API key. There's a "How to get notified about new
posts" discussion in that category explaining the same thing (pin it from
the Discussions UI if you want it to stay at the top — the GraphQL API
doesn't expose pinning).

The other half is `scripts/announce-new-posts.mjs`, which runs as part of the
deploy workflow right after `npm run sync`: it compares the freshly-synced posts
in `src/content/blog/` against `announced-posts.json` (the list of slugs already
announced) and opens a new GitHub Discussion for anything not yet in that list,
titled after the post with a link back to it. It then commits the updated
`announced-posts.json` back to `main` (with `[skip ci]` so that commit doesn't
re-trigger the workflow). The 26 posts that existed when this was built are
pre-seeded into `announced-posts.json` so they don't all fire discussions at
once — only genuinely new posts going forward will.
