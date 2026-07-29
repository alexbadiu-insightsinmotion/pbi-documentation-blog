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

Search, Contact, Subscribe, and the Deneb gallery (`/deneb/`) are English-only —
only the blog posts, home page, about page, and site chrome (nav/footer/hero) are
bilingual for now.

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

`src/site.config.ts` holds the title, tagline, description (EN + FR), social links,
the Bookings.cloud.microsoft URL used on `/contact/`, and `buttondownUsername` (empty
until you have a Buttondown account — see Subscribe below). The social links start
empty; `Footer.astro` only renders the ones that are set.

## Subscribe

The Subscribe form (footer + homepage) is a real Buttondown embed-subscribe form —
double opt-in email, then an email whenever a new post is published — but it's
inactive until `site.config.ts`'s `buttondownUsername` is set (no account was
created as part of building this). `rss.xml.js` still exists as a feed (not linked
in nav — there's no user-facing "RSS" anywhere) purely so Buttondown's own
"RSS → email" import can point at it once you're ready to activate Subscribe.
