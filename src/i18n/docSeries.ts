// Page copy for the two documentation series, per locale.
//
// Kept beside src/i18n/deneb.ts for the same reason: this is prose, not chrome.
// The series key doubles as the route name (/tmdl/, /themes/) even though the
// upstream folder for themes is `Theme`, singular.
import type { Lang } from './dictionary';

export type Series = 'tmdl' | 'themes';

export interface SeriesCopy {
  /** Uppercase eyebrow. */
  label: string;
  /** Headline HTML — carries <span class="accent">. */
  headline: string;
  lede: string;
  docsHeading: string;
  /** Heading for the downloads block; also the second stat's label. */
  assetsHeading: string;
  assetsLede: string;
  /** Short noun for one downloadable file, shown per row. */
  assetNoun: string;
  statLabel: string;
  /** Per-card call to action. */
  viewLabel: string;
  ctaLabel: string;
  ctaHref: string;
  /** Meta description. */
  metaDescription: (docs: number, assets: number) => string;
  /** Page <title>. */
  title: string;
}

const REPO_TREE = 'https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/tree/main/Components';

const COPY: Record<Lang, Record<Series, SeriesCopy>> = {
  en: {
    tmdl: {
      label: 'TMDL',
      title: 'TMDL',
      headline: 'Model definitions, <span class="accent">as text</span>.',
      lede: 'TMDL turns a semantic model into something you can read, diff, review and paste. This series works through it end to end — from the editing workflow in DAX Query View to the tables and measures worth scripting once and reusing everywhere.',
      docsHeading: 'The series',
      assetsHeading: 'Scripts',
      assetsLede: 'Paste-ready TMDL. Each script is the finished artefact from its article — open it, copy it into DAX Query View, and apply.',
      assetNoun: 'TMDL',
      statLabel: 'Articles',
      viewLabel: 'Read',
      ctaLabel: 'Browse the TMDL folder on GitHub',
      ctaHref: `${REPO_TREE}/TMDL`,
      metaDescription: (d, a) =>
        `A ${d}-part series on TMDL for Power BI — measure workflows, dates and last-refresh tables, RLS and OLS, DAX INFO views — with ${a} ready-to-run scripts.`,
    },
    themes: {
      label: 'Power BI Themes',
      title: 'Themes',
      headline: 'One theme file, <span class="accent">every visual</span>.',
      lede: 'A Power BI theme JSON can style far more than the colour palette — if you know which properties exist and where they sit. This series builds one up class by class, from global colours and page attributes through to slicers, matrices and dark mode.',
      docsHeading: 'The series',
      assetsHeading: 'Fragments',
      assetsLede: 'Each fragment is a self-contained slice of theme JSON. Take the ones you need and merge them, or start from the basic global-attributes theme and build up.',
      assetNoun: 'JSON',
      statLabel: 'Articles',
      viewLabel: 'Read',
      ctaLabel: 'Browse the Theme folder on GitHub',
      ctaHref: `${REPO_TREE}/Theme`,
      metaDescription: (d, a) =>
        `A ${d}-part series on building a Power BI theme JSON from the ground up, with ${a} drop-in theme fragments covering every visual class.`,
    },
  },
  fr: {
    tmdl: {
      label: 'TMDL',
      title: 'TMDL',
      headline: 'Le modèle, <span class="accent">sous forme de texte</span>.',
      lede: 'TMDL transforme un modèle sémantique en quelque chose que l’on peut lire, comparer, relire et coller. Cette série le parcourt de bout en bout — du flux d’édition dans la vue Requête DAX aux tables et mesures qui méritent d’être scriptées une fois pour être réutilisées partout.',
      docsHeading: 'La série',
      assetsHeading: 'Scripts',
      assetsLede: 'Du TMDL prêt à coller. Chaque script est l’artefact final de son article — ouvrez-le, copiez-le dans la vue Requête DAX et appliquez.',
      assetNoun: 'TMDL',
      statLabel: 'Articles',
      viewLabel: 'Lire',
      ctaLabel: 'Parcourir le dossier TMDL sur GitHub',
      ctaHref: `${REPO_TREE}/TMDL`,
      metaDescription: (d, a) =>
        `Une série en ${d} parties sur TMDL pour Power BI — flux de développement des mesures, tables de dates et de dernière actualisation, RLS et OLS, vues DAX INFO — accompagnée de ${a} scripts prêts à l’emploi.`,
    },
    themes: {
      label: 'Thèmes Power BI',
      title: 'Thèmes',
      headline: 'Un seul fichier de thème, <span class="accent">tous les visuels</span>.',
      lede: 'Un thème JSON Power BI peut mettre en forme bien plus que la palette de couleurs — à condition de savoir quelles propriétés existent et où elles se situent. Cette série en construit un classe par classe, des couleurs globales et attributs de page jusqu’aux segments, aux matrices et au mode sombre.',
      docsHeading: 'La série',
      assetsHeading: 'Fragments',
      assetsLede: 'Chaque fragment est une portion autonome de thème JSON. Prenez ceux dont vous avez besoin et fusionnez-les, ou partez du thème de base et construisez à partir de là.',
      assetNoun: 'JSON',
      statLabel: 'Articles',
      viewLabel: 'Lire',
      ctaLabel: 'Parcourir le dossier Theme sur GitHub',
      ctaHref: `${REPO_TREE}/Theme`,
      metaDescription: (d, a) =>
        `Une série en ${d} parties sur la création d’un thème JSON Power BI de A à Z, avec ${a} fragments de thème prêts à l’emploi couvrant chaque classe de visuel.`,
    },
  },
};

export const seriesCopy = (lang: Lang, series: Series): SeriesCopy => COPY[lang][series];
