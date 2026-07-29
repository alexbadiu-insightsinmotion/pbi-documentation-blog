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
