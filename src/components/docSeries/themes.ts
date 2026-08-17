// Components/Theme — 12 numbered articles (101.1–107) + 14 theme JSON fragments.
//
// Note the upstream folder is `Theme` (singular) while the route is /themes/.
// Titles drop the trailing "(Power BI Theme)" qualifier, which the page supplies.
// "Slicers" becomes "Segments", matching the French Power BI UI.
import { resolve, type DocRow } from './types.ts';
import type { Lang } from '../../i18n/dictionary';

const FOLDER = 'Theme';

const DOCS: DocRow[] = [
  {
    num: '101.1',
    file: '101.1 - Introduction and Base 1 - Global Colours and Page Attributes (Power BI Theme).md',
    en: 'Introduction and Base 1 — Global colours and page attributes',
    fr: 'Introduction et Base 1 — Couleurs globales et attributs de page',
  },
  {
    num: '101.2',
    file: '101.2 - Base 2 - Global Visual Attributes (Power BI Theme).md',
    en: 'Base 2 — Global visual attributes',
    fr: 'Base 2 — Attributs visuels globaux',
  },
  {
    num: '102.1',
    file: '102.1 - Bar and Column Charts (Power BI Theme).md',
    en: 'Bar and column charts',
    fr: 'Graphiques en barres et en colonnes',
  },
  {
    num: '102.2',
    file: '102.2 - Line and Area Charts (Power BI Theme).md',
    en: 'Line and area charts',
    fr: 'Graphiques en courbes et en aires',
  },
  {
    num: '103.1',
    file: '103.1 - Circular Charts (Power BI Theme).md',
    en: 'Circular charts',
    fr: 'Graphiques circulaires',
  },
  {
    num: '103.2',
    file: '103.2 - Cards (Power BI Theme).md',
    en: 'Cards',
    fr: 'Cartes',
  },
  {
    num: '104.1',
    file: '104.1 - Slicers (Power BI Theme).md',
    en: 'Slicers',
    fr: 'Segments',
  },
  {
    num: '104.2',
    file: '104.2 - Tables and Matrices (Power BI Theme).md',
    en: 'Tables and matrices',
    fr: 'Tables et matrices',
  },
  {
    num: '105.1',
    file: '105.1 - Other (Power BI Theme).md',
    en: 'Other visuals',
    fr: 'Autres visuels',
  },
  {
    num: '105.2',
    file: '105.2 - Custom Visuals and Closing Remarks (Power BI Theme).md',
    en: 'Custom visuals and closing remarks',
    fr: 'Visuels personnalisés et remarques finales',
  },
  {
    num: '106',
    file: '106 - Organizational Themes (Power BI Theme).md',
    en: 'Organizational themes',
    fr: 'Thèmes organisationnels',
  },
  {
    num: '107',
    file: '107 - Dark Themes (Power BI Theme).md',
    en: 'Dark themes',
    fr: 'Thèmes sombres',
  },
];

const ASSETS: DocRow[] = [
  {
    num: '900',
    file: '900 - Power BI Theme - Basic - Global Attributes.json',
    en: 'Basic theme — global attributes',
    fr: 'Thème de base — attributs globaux',
  },
  {
    num: '901',
    file: '901 - Power BI Theme Fragment - Base 1 - Name.json',
    en: 'Fragment — Base 1: name',
    fr: 'Fragment — Base 1 : nom',
  },
  {
    num: '902',
    file: '902 - Power BI Theme Fragment - Base 2 - Global Colours.json',
    en: 'Fragment — Base 2: global colours',
    fr: 'Fragment — Base 2 : couleurs globales',
  },
  {
    num: '903',
    file: '903 - Power BI Theme Fragment - Base 3 - Global Page Attributes.json',
    en: 'Fragment — Base 3: global page attributes',
    fr: 'Fragment — Base 3 : attributs de page globaux',
  },
  {
    num: '904',
    file: '904 - Power BI Theme Fragment - Base 4 - Global Visual Attributes.json',
    en: 'Fragment — Base 4: global visual attributes',
    fr: 'Fragment — Base 4 : attributs visuels globaux',
  },
  {
    num: '905',
    file: '905 - Power BI Theme Fragment - Bar and Column Charts.json',
    en: 'Fragment — bar and column charts',
    fr: 'Fragment — graphiques en barres et en colonnes',
  },
  {
    num: '906',
    file: '906 - Power BI Theme Fragment - Line and Area Charts.json',
    en: 'Fragment — line and area charts',
    fr: 'Fragment — graphiques en courbes et en aires',
  },
  {
    num: '907',
    file: '907 - Power BI Theme Fragment - Circular Charts.json',
    en: 'Fragment — circular charts',
    fr: 'Fragment — graphiques circulaires',
  },
  {
    num: '908',
    file: '908 - Power BI Theme Fragment - Cards.json',
    en: 'Fragment — cards',
    fr: 'Fragment — cartes',
  },
  {
    num: '909',
    file: '909 - Power BI Theme Fragment - Slicers.json',
    en: 'Fragment — slicers',
    fr: 'Fragment — segments',
  },
  {
    num: '910',
    file: '910 - Power BI Theme Fragment - Tables and Matrices.json',
    en: 'Fragment — tables and matrices',
    fr: 'Fragment — tables et matrices',
  },
  {
    num: '911',
    file: '911 - Power BI Theme Fragment - Other.json',
    en: 'Fragment — other visuals',
    fr: 'Fragment — autres visuels',
  },
  {
    num: '912',
    file: '912 - Power BI Theme Fragment - Custom Visuals.json',
    en: 'Fragment — custom visuals',
    fr: 'Fragment — visuels personnalisés',
  },
  {
    num: '913',
    file: '913 - Power BI Theme Fragment - Dark Themes.json',
    en: 'Fragment — dark themes',
    fr: 'Fragment — thèmes sombres',
  },
];

export const themeDocs = (lang: Lang) => resolve(DOCS, FOLDER, 'doc', lang);
export const themeAssets = (lang: Lang) => resolve(ASSETS, FOLDER, 'asset', lang);
