// Shared shape for the numbered documentation series (/tmdl/, /themes/).
//
// Both series live in the PBI-Documentation repo as a numbered article set plus
// downloadable assets, so a single component renders both from these lists.
// `num` and `href` derive mechanically from the upstream filename — one row per
// file, both locales' titles on it — so adding a document later is a one-line
// edit and the two languages cannot drift out of sync by count.

import type { Lang } from '../../i18n/dictionary';

export interface DocEntry {
  /** Upstream number, e.g. '303' or '101.1'. Displayed as the card's eyebrow. */
  num: string;
  title: string;
  /** Absolute GitHub URL to the source file. */
  href: string;
  kind: 'doc' | 'asset';
  blurb?: string;
}

/** One upstream file, with its title in every locale. */
export interface DocRow {
  num: string;
  /** Exact upstream filename, including extension. */
  file: string;
  en: string;
  fr: string;
}

const REPO = 'https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Components';

/**
 * Builds the source URL for one upstream file.
 *
 * Encoding is encodeURIComponent per path segment, matching both the existing
 * Deneb githubHref values and scripts/sync-content.mjs: spaces become %20 while
 * parentheses and ampersands stay literal, which GitHub handles fine.
 *
 * `folder` is the upstream folder name, which is not always the route name —
 * the themes page is /themes/ but the source folder is `Theme`, singular.
 */
export const sourceHref = (folder: string, filename: string): string =>
  `${REPO}/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;

/** Resolves a locale's title and the derived href for each row. */
export const resolve = (
  rows: DocRow[],
  folder: string,
  kind: DocEntry['kind'],
  lang: Lang
): DocEntry[] =>
  rows.map((r) => ({
    num: r.num,
    title: r[lang],
    href: sourceHref(folder, r.file),
    kind,
  }));
