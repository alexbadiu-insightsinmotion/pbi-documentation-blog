# pbi-documentation-blog — v2 corrections, planned in waves

## Context

The v1 site (Astro + Tailwind, styled after Deneb Gallery, content pulled from
`PBI-Documentation` via `content-manifest.json`) is built and live at
https://alexbadiu-insightsinmotion.github.io/pbi-documentation-blog/. Reviewing
the live homepage surfaced eight corrections/additions, ranging from a simple
card layout fix to a full bilingual (EN/FR) content model. This plan breaks
them into independent waves, ordered smaller/lower-risk first, largest
structural change (i18n) last, so each wave ships and is verifiable on its own
before the next begins.

Decisions confirmed with the user:
- French translations are hand-authored files living **in the blog site repo**
  (not as companion files in `PBI-Documentation`), since a translation is a
  presentation-layer asset for this site, not part of the original
  LinkedIn-published post history. Claude authors the initial 26 French
  versions as real translation work during Wave 6.
- Subscribe: build the real user-facing behavior (submit email → confirm once
  → get an email whenever a new post goes up) using a Buttondown-shaped
  embed-subscribe form + a hidden (unlinked) RSS feed for Buttondown's
  "RSS → email" automation to consume later. No account is created as part of
  this work and no account-creation checklist is put in front of the user —
  the only thing deferred is a single placeholder username constant.

## Wave 1 — Card redesign + manifest schema (items 1, 2)

**Problem:** `src/components/PostCard.astro` shows date + title + a broken,
markdown-leaking excerpt (`deriveExcerpt` in `scripts/sync-content.mjs`
doesn't strip `[text](url)` links, so raw markdown sometimes renders as
visible text on the card). The cover images already have the title baked in
as part of the graphic, so the separate title/excerpt text is redundant noise.

**Change:**
- `content.config.ts`: replace `tags: z.array(z.string())` with a single
  required `tag: z.string()` (hashtag-style: `deneb`, `documentation`, `TMDL`,
  `JSONtheme`, ...) and add required `author: z.string()`.
- `content-manifest.json`: every entry gains manual `tag` and `author` fields
  — these can't be derived from post content, they're editorial decisions.
  Best-effort `tag` per post proposed from content, but **authorship (Alex
  Badiu vs Greg Philps) needs a quick human check** — flagged rather than
  guessed wherever unclear.
- `scripts/sync-content.mjs`: fix `deriveExcerpt` to strip markdown links
  (`[text](url)` → `text`) and images (`![...](...)` → removed) before
  truncating — excerpt is no longer shown on the card, but still feeds meta
  descriptions, Search (Wave 3), and the RSS feed Buttondown will read
  (Wave 4).
- `src/components/PostCard.astro`: rebuilt to show only: cover image, a tag
  pill (`#deneb`), author name, and the "Read more →" link. Title/date/excerpt
  removed from the card (title remains the `<h1>` on the actual post page).

## Wave 2 — Contact page + delink RSS (items 3, 6)

**Change:**
- New `src/pages/contact.astro`, structured like promptingbi.com/contact:
  heading ("Let's connect"), intro copy, a primary CTA button ("Book a
  session") linking to
  `https://bookings.cloud.microsoft/book/PugliaBIConsulting@pugliabi.com/?ismsaljsauthenabled=true`,
  and the existing `site.social` links below it (LinkedIn/X/YouTube — still
  empty until filled in `src/site.config.ts`).
- `src/components/Header.astro` / `Footer.astro`: remove the "RSS" nav
  link entirely (no user-facing RSS section), add "Contact". `src/pages/rss.xml.js`
  itself stays — it becomes unlinked plumbing consumed only by Buttondown's
  automation in Wave 4, never presented to readers as a feature.

## Wave 3 — Search (item 4)

**Change:**
- `src/pages/search-index.json.js`: build-time endpoint emitting
  `[{ slug, title, tag, author, excerpt, cover }]` for every post (via
  `getCollection('blog')`, same pattern as `rss.xml.js`).
- `src/pages/search.astro`: an input box + vanilla-JS live filter (substring
  match across title/tag/author, no external search library needed for ~26
  posts) rendering results as simplified cards. Consistent with the
  no-framework architecture already established (`src/scripts/motion.ts`
  pattern) — a small `src/scripts/search.ts` fetches the JSON index once and
  filters client-side on `input` events.
- Add "Search" to Header nav.

## Wave 4 — Subscribe (item 8)

**Change:**
- `src/components/Subscribe.astro`: an embed-subscribe form in the
  Buttondown shape (`<form action="https://buttondown.com/api/emails/embed-subscribe/{BUTTONDOWN_USERNAME}">`),
  styled as an email input + pill button, with copy explaining the double
  opt-in ("verify your email once, get one whenever I publish"). Placed in
  the Footer and as a homepage section.
- `BUTTONDOWN_USERNAME` lives as a single named placeholder constant in
  `src/site.config.ts` — no account is created now; whenever the user has a
  Buttondown username, dropping it into that one constant activates the form.
  No checklist, no setup wave.
- `rss.xml.js` (already unlinked from nav in Wave 2) is the feed Buttondown's
  own "RSS → email" import points at later, to get the actual "new post →
  subscriber email" behavior — again, zero custom webhook/API code needed on
  our side for this to work once a username is set.

## Wave 5 — Deneb gallery section (item 7)

Scoped by reading all 17 template components in
`Deneb Gallery/deneb-gallery/src/components/templates/`: 10 are hand-drawn
inline SVG (no charting library), 7 are static PNGs (`public/assets/templates/*.png`)
with a wipe-in animation, only T01 and T07 have real interactivity (a range
slider and filter buttons, both plain `useState`). None depend on
`@microsoft/rayfin-*` — everything is portable pure React/TS/CSS. This means
the whole gallery ports **without reintroducing a UI framework**, consistent
with the vanilla-JS approach already used for scroll-reveal/motion:

**Change:**
- New `/deneb/` route (`src/pages/deneb.astro`) porting `IntroSection`
  (+ its `CountUp` stat animation, as vanilla JS), all 17 templates as static
  Astro markup (image tag for the 7 PNG-based ones; literal inline SVG for the
  10 hand-drawn ones), and `ClosingSection`.
- Port `useChartAnimation.ts` (the `data-anim` attribute-driven animation
  engine used by 15/17 templates) as a vanilla script alongside
  `src/scripts/motion.ts`, and the two `useState`-driven templates (T01
  slider, T07 filter buttons) as small dedicated vanilla scripts.
- Port `TemplateSection.tsx`'s two-column alternating layout as an Astro
  component (props instead of React props).
- Copy the 6 template PNGs into `public/assets/templates/`.
- Add "Deneb" to Header nav.

## Wave 6 — Bilingual EN/FR (item 5)

The largest wave — scoped deliberately to **blog posts + home + about + nav
strings**, not every ancillary page. Search, Contact, Subscribe, and the Deneb
gallery stay English-only for now; call this out explicitly rather than
silently expanding scope.

**Change:**
- Astro i18n routing: `locales: ['en', 'fr']`, `defaultLocale: 'en'`,
  `routing: { prefixDefaultLocale: false }` in `astro.config.mjs` — English
  stays at `/blog/<slug>/`, French at `/fr/blog/<slug>/`.
- New collection `blogFr` in `content.config.ts`, loading from
  `content/translations/fr/*.md` (committed to git, unlike the gitignored,
  sync-regenerated `src/content/blog/`) — same schema as `blog` plus an
  `enSlug` cross-reference field.
- **Claude authors all 26 French translations now**, written directly into
  `content/translations/fr/<slug>.md`, matching each English post's title,
  body, tag, author, and cover.
- Mirror `src/pages/blog/[slug].astro` → `src/pages/fr/blog/[slug].astro`
  reading from `blogFr`. Mirror `index.astro`/`about.astro` → `fr/index.astro`/`fr/about.astro`.
- A small `src/i18n/dictionary.ts` holding the static UI strings (nav labels,
  hero tagline, footer copy) in both languages, used by `Header.astro`/`Footer.astro`/`Hero.astro`
  to render the right language based on the current route.
- Header gains a persistent EN/FR language switcher linking to the
  translated counterpart of the current page (post ↔ its translation via
  `enSlug`, home ↔ `/fr/`, about ↔ `/fr/about/`).
- Document in `README.md` that publishing a new post going forward means
  adding both the manifest entry (Wave 1 schema) **and** its French file in
  `content/translations/fr/` — this isn't automatable by the plain Node sync
  script (no LLM wired into the build), so it stays a manual/Claude-assisted
  step each time.

## Verification (per wave)

- `npm run sync && npm run build` after each wave — confirm it still builds
  clean and page count matches expectations (28 pages today; Wave 6 roughly
  doubles blog+home+about routes).
- `npx astro preview` + `curl` key routes: home, a post, `/contact/`,
  `/search/`, `/deneb/`, `/fr/`, `/fr/blog/<slug>/` — confirm 200s.
- Grep rendered HTML for the specific fixed defect each wave targets, e.g.
  Wave 1: confirm no raw `[text](` markdown leaks into any card; Wave 6:
  confirm every EN post has a working `/fr/blog/<slug>/` counterpart link.
- Manual gut-check against the live site screenshot that triggered this plan:
  cards show only image/tag/author/Read-more, Contact has the working
  Bookings link, RSS is gone from nav, Search/Subscribe/Deneb sections exist.

## Status

- [x] Wave 1 — Card redesign + manifest schema
- [x] Wave 2 — Contact page + delink RSS
- [x] Wave 3 — Search
- [x] Wave 4 — Subscribe
- [x] Wave 5 — Deneb gallery section
- [x] Wave 6 — Bilingual EN/FR
- [x] Wave 7 — Post-launch corrections (below)
- [x] Wave 8 — Deneb gallery + site navigation (below)

## Wave 7 — Post-launch corrections

Feedback after the live site went up:

- **Code blocks were unreadable**: Shiki wraps a whole fenced code block in
  one multi-line `<code>`, and the earlier inline-code chip styling
  (background/border/padding on `code`) rendered each visual line as its own
  floating box, since `code` is `display: inline`. Reset that styling for
  code inside `<pre>` and gave the block itself proper card treatment.
- **Search cards were badly laid out**: they'd been given a title on top of
  the homepage's tag+author+read-more row layout, which only has room for
  that row — long titles collided with everything else. Dropped the title
  to match the homepage cards.
- **Broken/missing thumbnails**: `extractCover` only matched HTML `<img>`
  tags, missing two posts that use markdown `![]()` images — fixed. Four
  posts (Deployment, Model, Validation, Summary) have GitHub
  `user-attachments` image URLs that are dead upstream in PBI-Documentation
  itself — not fixable from the site; added an `onerror` fallback so a
  broken cover just hides instead of showing a blank box.
- **Booking CTA removed**: it pointed at someone else's Microsoft Bookings
  page. Rather than fabricate a replacement, the "Book a session" card was
  dropped from Contact entirely.
- **About page removed**: redundant per user request.
- **Contact rebuilt** around two explicit LinkedIn buttons (Alex + Greg,
  `site.linkedin` / `site.coAuthor.linkedin`) instead of a generic social loop.
- **Subscribe rebuilt from scratch**: the Buttondown-shaped email form was
  real UI but a non-functional "coming soon" placeholder is bad UX on a live
  public page, and there's no way to make automated email work without an
  account existing *somewhere* — no code-only path around that. Replaced
  with a zero-account mechanism: Subscribe links to this repo's GitHub
  Discussions "Announcements" category; `scripts/announce-new-posts.mjs`
  (wired into the deploy workflow after `npm run sync`) opens a Discussion
  for any post not yet in `announced-posts.json`, so GitHub itself emails
  anyone watching. `rss.xml.js` was removed since it existed only to feed
  Buttondown's RSS-to-email import.

## Wave 8 — Deneb gallery + site navigation

Six pieces of reviewer feedback on the live site. Items 2–4 turned out to be one
problem seen from three sides — a 17-section single-scroll page with no way to
navigate, cite, or reach its newest content — so they were done as one change.

**Can the gallery be dynamic?** Not fully, and that is worth recording. The
thumbnails are hand-authored: 10 inline-SVG recreations, 7 PNGs, and now one
calendar heat map. There is no data source a build step could render from. What
*was* removed is the per-release busywork around them (see below).

- **Template registry** (`src/components/deneb/templates.ts`): the gallery was a
  barrel of 17 imports and 17 literal tags, with order encoded twice as JSX
  source order. Now one entry per template drives display order, the eyebrow
  number, the anchor id, the navigator entry, the background banding and the
  count. Adding a template went from "edit five files and bump three hardcoded
  17s" to one component plus one registry line.

  The load-bearing detail: every template also hardcoded its *card* colour as
  the inverse of its own band — 17 independent copies of the same invariant, in
  scoped CSS or via `ImageChartCard`'s `cardBg`. Reversing the order would have
  left all of them wrong in a way that reads as flat rather than broken. So
  `bandStyle(alt)` now emits both, publishing the card colour as `--card-bg` for
  the section to inherit. Banding is alternation-correct end to end, which also
  fixed the pre-existing T16→T17 seam where two `--bg-alt` bands sat adjacent.

- **Newest first**: the gallery renders the registry reversed, so 18 leads and 01
  closes. `chartFirst` is derived from position, with a registry override kept as
  an escape hatch.

- **T18 Calendar Heat Map** (`T18_CalendarHeatMap.astro`): a bespoke full-bleed
  section like T17, hand-drawn inline SVG on a derived-geometry frontmatter (change
  `CELL` and every facet, label and the viewBox follow). Shows Q1–Q2 rather than the
  full year, with a sparse `marks` map so most days sit on quiet ground and only a
  handful carry colour — a heat map that colours every cell strongly is noise. Uses
  the muted tan-to-near-black ramp from T14 rather than the brighter gold one, and
  builds its legend gradient from the same `LEVELS` array as the cells so the two
  cannot drift. Animation reuses the existing engine: `fade` per month group (6, not
  per-day — 180 concurrent Web Animations would be waste), `grow-x` on the legend,
  and `rise` on the slicer chips, the one supported type no template used before.

  The SVG is capped at its own viewBox width via `--cal-w`. Letting it stretch to
  the card blew every font up 2.4x and made the section ~1600px tall.

- **Anchors** (items 3–4): every template section now emits `id={slug}` with a
  hover-and-focus-revealed `#` link in the heading. There were previously zero `id`
  attributes anywhere on the page, so nothing to migrate.

  Fixed a pre-existing bug while here: `scroll-behavior: smooth` plus a ~64px
  sticky header and no `scroll-margin-top` anywhere meant every anchor jump parked
  its target under the header — including the blog TOC, which had shipped that way
  since Wave 6. Two lines in `global.css` now cover both.

- **Navigator rail** (`DenebNav.astro` + `src/scripts/denebNav.ts`): a fixed rail,
  not a grid column, since the sections are full-bleed bands and a two-column grid
  would mean restructuring all 20. A labelled 180px rail needs ~1500px of viewport
  before it stops overlapping the 1180px content column, so it collapses to a
  ~20px tick column that lives in the section gutter and expands with labels on
  hover or focus. Hidden below 960px, matching the site's only breakpoint and the
  blog TOC's mobile strategy; newest-first ordering is what fixes the mobile
  complaint.

  The scroll-spy is a passive scroll listener, not an IntersectionObserver. Every
  other observer on the site answers "has this appeared yet?" and disconnects —
  ideal for observers. "Which section am I in?" is different: an observer only
  reports changes, so it needs a running set of what is on screen, and that
  bookkeeping desynchronises on large jumps (deep links, clicking a rail entry far
  down the page) leaving the rail stuck on a stale entry. It was written that way
  first and did exactly that. Computing the answer outright is shorter, always
  right, and mirrors `initScrollProgress()`'s existing listener.

- **`/tmdl/` and `/themes/`** (item 5): item 5 was "add these to the footer", but
  there were no such pages. Both upstream folders have the same shape — a numbered
  article series plus downloadable assets — so they share one `DocSeries.astro` and
  differ only in a data file and copy. TMDL is 9 docs (300–308) + 7 `.txt`; Theme is
  12 docs (101.1–107) + 14 `.json`. Note the upstream folder is `Theme` singular
  while the route is `/themes/`, and that `903` exists in *both* folders with
  different extensions, so any lookup must key on folder plus number.

  Shipped with titles and links only; `blurb` is an optional field so descriptions
  can be added a line at a time rather than blocking the navigation fixes.

- **Footer** (items 5–6): `[Site]` is now Home / Deneb / TMDL / Themes, and the
  `[Contact]` column's LinkedIn entry points at `/contact/` — where both profiles
  already live as CTAs — instead of straight out to LinkedIn. One route to LinkedIn
  instead of two, and the footer still reaches `/contact/`.

- **Header**: TMDL and Themes added, taking it to 6 links plus the FR pill. The
  header had no responsive story at all, and `body { overflow-x: hidden }` would
  have clipped rather than scrolled the overflow. `.header` now wraps before the
  nav does, so on a phone the nav drops to its own full-width line and takes two
  rows instead of four.

- Also fixed: T01's "View template" link pointed at
  `Components/Space-Saving Bar Chart with Top N and Others`, a path that does not
  exist upstream. Now points at the real `Components/Deneb/201 - …` doc.

**Verification.** 64 routes (was 60). All 18 eyebrows read 18→01 with 18 matching
`<section id>`; banding alternates with card colours inverse throughout. Cold
`/deneb/#calendar-heat-map` lands clear of the header with the text revealed.
Scroll-spy tracks forwards and backwards. Reduced motion renders everything
instantly. All 60 generated GitHub links were checked against the repo contents
API — 0 mismatches — and every internal link and in-page anchor across all 64
pages resolves (1036 links, 602 anchors, 0 broken).

### Wave 8b — Full EN/FR translation

Follow-up in the same wave: the site was bilingual in its chrome but not its
content. `/fr/deneb/`, `/fr/tmdl/` and `/fr/themes/` carried an "this is
presented in English" note, and `IntroSection`, `ClosingSection`, `Subscribe` and
`DocSeries` had English hardcoded in the markup. Roughly 200 strings.

**Change.** Copy moved out of components into three locale modules:
`src/i18n/dictionary.ts` (chrome), `src/i18n/deneb.ts` (gallery prose, keyed by
registry slug), `src/i18n/docSeries.ts` (the two series' page copy). Template
components became pure visuals that receive `title` / `description` /
`chartLabel` / `viewLabel` as props, resolved once in `DenebGallery` — so a
template no longer contains any user-facing string. `DocSeries` now takes only
`(lang, series)` and resolves copy and data itself, which collapsed the four
route files to a `Base` wrapper each.

A missing translation is a build error, not a silent English fallback: the
gallery throws if a registry slug has no copy for the active locale.

Three conventions, all deliberate:

- **Titles are translated, URLs are not.** Slugs and GitHub hrefs are identical
  across locales — verified: `/tmdl/` and `/fr/tmdl/` emit byte-identical link
  sets (17 each), as do themes (27) and deneb (19) — so a shared link resolves
  the same either way and the anchor `#calendar-heat-map` works from both.
- **Technical vocabulary stays English.** Performance Analyzer event names,
  DAX/measure names and field names appear as they do in the tooling and in the
  source template; only the prose around them moves. The doc-series data files
  keep one row per upstream file with both titles on it, so the two locales
  cannot drift apart by count or point at different files.
- **Chart-type names** are translated where French BI usage has a settled term
  (`Cascade`, `Matrice de corrélation`, `Segments` for slicers) and kept where the
  English term *is* the French usage (`Sunburst`, `IBCS`, `Top N`).

**Known limit, worth stating plainly:** the 7 PNG thumbnails have English text
baked into the image. Their captions are translated; the artwork is not, and
cannot be without redrawing all seven. The 11 inline-SVG thumbnails are fully
translated, including T18's month names and weekday initials (shown D L M M J V S
for a Sunday-start week) and T07's BCG segment names.

**Verification.** A sweep of all 6 FR chrome pages against 45 known English
strings returns 0 leaks, while the technical labels that should remain English are
all still present. Link parity confirmed as above; the full link audit re-ran
unchanged (1036 internal, 602 anchors, 190 repo links, 0 regressions).
