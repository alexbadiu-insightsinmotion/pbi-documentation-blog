export type Lang = 'en' | 'fr';

export const dictionary = {
  en: {
    nav: {
      home: 'Home',
      deneb: 'Deneb',
      tmdl: 'TMDL',
      themes: 'Themes',
      search: 'Search',
      contact: 'Contact',
    },
    langSwitch: 'FR',
    hero: {
      eyebrow: 'A blog on documenting Power BI, properly',
    },
    // Chrome strings only. The gallery's prose lives in src/i18n/deneb.ts.
    deneb: {
      navLabel: 'Templates',
      viewTemplate: 'View template',
    },
    // Rendered on FR pages only. The page copy is translated; the GitHub
    // documents it links out to are not, which is what this says.
    linkedDocsNote: 'The linked documents are in English.',
    subscribeBlock: {
      heading: 'Get new posts by email',
      lede: "One click, on GitHub's own notifications — no newsletter, no signup form.",
      cta: 'Watch this repo',
      hint: 'On the page that opens, pick <strong>All Activity</strong> (or Custom &rarr; Discussions).',
      how: 'How does this work?',
    },
    footer: {
      contact: 'Contact',
      site: 'Site',
      subscribe: 'Subscribe',
    },
    readMore: 'Read more',
  },
  fr: {
    nav: {
      home: 'Accueil',
      deneb: 'Deneb',
      tmdl: 'TMDL',
      themes: 'Thèmes',
      search: 'Recherche',
      contact: 'Contact',
    },
    langSwitch: 'EN',
    hero: {
      eyebrow: 'Un blog sur la documentation Power BI, sérieusement',
    },
    deneb: {
      navLabel: 'Templates',
      viewTemplate: 'Voir le template',
    },
    linkedDocsNote: 'Les documents liés sont en anglais.',
    subscribeBlock: {
      heading: 'Recevoir les nouveaux articles par e-mail',
      lede: 'Un clic, via les notifications GitHub — pas de newsletter, pas de formulaire.',
      cta: 'Suivre ce dépôt',
      hint: 'Sur la page qui s’ouvre, choisissez <strong>All Activity</strong> (ou Custom &rarr; Discussions).',
      how: 'Comment cela fonctionne&nbsp;?',
    },
    footer: {
      contact: 'Contact',
      site: 'Site',
      subscribe: "S'abonner",
    },
    readMore: 'Lire la suite',
  },
} as const;

export function t(lang: Lang) {
  return dictionary[lang];
}
