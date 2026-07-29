# PBI Documentation — blog

A blog site built with [Astro](https://astro.build) + Tailwind v4, styled after the
[Deneb Gallery](https://github.com/alexbadiu-insightsinmotion) Fabric App's warm
amber/parchment editorial design, and structured like
[promptingbi.com](https://promptingbi.com) (simple home card-list + article pages).

Content is not written here. It's pulled from the
[`PBI-Documentation`](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation)
GitHub repo, which is the single source of truth for the actual article text.

## Choosing which posts are published

`content-manifest.json` (repo root) is the allow-list. Only files listed there are
ever built as posts — everything else in `PBI-Documentation` (Cheat-Sheet/,
Components/, Presentations/, templates, etc.) is ignored automatically.

To publish a new post: add one line, e.g.

```json
{ "file": "27 - My New Post.md" }
```

To unpublish a post: delete its entry (or comment it out isn't valid JSON, so just remove it).

Optional per-entry overrides: `slug`, `title`, `date`, `tags`, `excerpt`. If omitted,
the sync script derives the title from the filename, slugifies it for the URL, and
looks up the file's first commit date in `PBI-Documentation` for the publish date.

## How the content pipeline works

`npm run sync` (also runs automatically before `dev`/`build`) reads the manifest,
fetches each listed file straight from `PBI-Documentation` on GitHub, strips the
manual GitHub-anchor table of contents (Astro generates its own from headings),
pulls out the first image as the cover, and writes the result into
`src/content/blog/*.md` with generated frontmatter. That folder is gitignored and
regenerated every run — `PBI-Documentation` stays the only place the actual content
lives, so it can never go stale relative to this repo.

## Commands

| Command         | Action                                                        |
| :-------------- | :------------------------------------------------------------ |
| `npm install`   | Install dependencies                                          |
| `npm run sync`  | Pull posts from `PBI-Documentation` per `content-manifest.json` |
| `npm run dev`   | Sync, then start the local dev server at `localhost:4321`     |
| `npm run build` | Sync, then build the static site to `./dist/`                 |
| `npm run preview` | Preview a production build locally                           |

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on push to `main`,
on manual dispatch, and daily (so edits to already-included source posts show up
without needing a push here). Enable **GitHub Pages → Source: GitHub Actions** in
the repo settings once this is pushed.

## Site config

`src/site.config.ts` holds the title, tagline, description, and social links shown
in the header/footer. The social links start empty — fill them in whenever you have
them; `Footer.astro` only renders the ones that are set.
