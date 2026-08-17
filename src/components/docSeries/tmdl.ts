// Components/TMDL — 9 numbered articles (300–308) + 7 ready-to-run TMDL scripts.
//
// Titles drop the number prefix and the trailing "(TMDL)" qualifier, which the
// page already supplies. Acronyms (TMDL, DAX, RLS, OLS, UNICHAR, INFO) are the
// same in both locales and stay as they are.
import { resolve, type DocRow } from './types.ts';
import type { Lang } from '../../i18n/dictionary';

const FOLDER = 'TMDL';

const DOCS: DocRow[] = [
  {
    num: '300',
    file: '300 - Foundation & Setup - Introduction to TMDL.md',
    en: 'Foundation & Setup — Introduction to TMDL',
    fr: 'Fondations et mise en place — Introduction à TMDL',
  },
  {
    num: '301',
    file: '301 - TMDL + DAX Query View - Measure editing & creation.md',
    en: 'TMDL + DAX Query View — Measure editing & creation',
    fr: 'TMDL + vue Requête DAX — Édition et création de mesures',
  },
  {
    num: '302',
    file: '302 - TMDL + DAX Query View - Measure Development Workflow.md',
    en: 'TMDL + DAX Query View — Measure development workflow',
    fr: 'TMDL + vue Requête DAX — Flux de développement des mesures',
  },
  {
    num: '303',
    file: '303 - Dates table (TMDL).md',
    en: 'Dates table',
    fr: 'Table de dates',
  },
  {
    num: '304',
    file: '304 - Last Refresh table (TMDL).md',
    en: 'Last Refresh table',
    fr: 'Table de dernière actualisation',
  },
  {
    num: '305',
    file: '305 - Measures (TMDL).md',
    en: 'Measures',
    fr: 'Mesures',
  },
  {
    num: '306',
    file: '306 - TMDL - RLS and OLS.md',
    en: 'RLS and OLS',
    fr: 'RLS et OLS',
  },
  {
    num: '307',
    file: '307 - UNICHAR measures (TMDL).md',
    en: 'UNICHAR measures',
    fr: 'Mesures UNICHAR',
  },
  {
    num: '308',
    file: '308 - DAX INFO tables (TMDL).md',
    en: 'DAX INFO tables',
    fr: 'Tables DAX INFO',
  },
];

const ASSETS: DocRow[] = [
  {
    num: '903',
    file: '903 - Power BI TMDL Script - Dates table.txt',
    en: 'Dates table',
    fr: 'Table de dates',
  },
  {
    num: '904',
    file: '904 - Power BI TMDL Script - Last Refresh table.txt',
    en: 'Last Refresh table',
    fr: 'Table de dernière actualisation',
  },
  {
    num: '905.1',
    file: '905.1 - Power BI TMDL Script - Key Measures table.txt',
    en: 'Key Measures table',
    fr: 'Table des mesures clés',
  },
  {
    num: '905.2',
    file: '905.2 - Power BI TMDL Script - Base, Last Refresh, and Report Admin Measures.txt',
    en: 'Base, Last Refresh, and Report Admin measures',
    fr: 'Mesures de base, de dernière actualisation et d’administration du rapport',
  },
  {
    num: '907.1',
    file: '907.1 - Power BI TMDL Script - UNICHAR Measures - Enterprise DNA Forum.txt',
    en: 'UNICHAR measures — Enterprise DNA Forum',
    fr: 'Mesures UNICHAR — Forum Enterprise DNA',
  },
  {
    num: '907.2',
    file: '907.2 - Power BI TMDL Script - UNICHAR Measures - FabSnippets_NudgeBI.txt',
    en: 'UNICHAR measures — FabSnippets / NudgeBI',
    fr: 'Mesures UNICHAR — FabSnippets / NudgeBI',
  },
  {
    num: '908',
    file: '908 - Power BI TMDL Script - DAX INFO View.txt',
    en: 'DAX INFO view',
    fr: 'Vue DAX INFO',
  },
];

export const tmdlDocs = (lang: Lang) => resolve(DOCS, FOLDER, 'doc', lang);
export const tmdlAssets = (lang: Lang) => resolve(ASSETS, FOLDER, 'asset', lang);
