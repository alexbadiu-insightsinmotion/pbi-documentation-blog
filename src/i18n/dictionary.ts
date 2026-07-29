export type Lang = 'en' | 'fr';

export const dictionary = {
  en: {
    nav: { home: 'Home', about: 'About', deneb: 'Deneb', search: 'Search', contact: 'Contact' },
    langSwitch: 'FR',
    hero: {
      eyebrow: 'A blog on documenting Power BI, properly',
    },
    footer: {
      contact: 'Contact',
      site: 'Site',
      subscribe: 'Subscribe',
      addLinks: 'Add links in src/site.config.ts',
    },
    readMore: 'Read more',
  },
  fr: {
    nav: { home: 'Accueil', about: 'À propos', deneb: 'Deneb', search: 'Recherche', contact: 'Contact' },
    langSwitch: 'EN',
    hero: {
      eyebrow: 'Un blog sur la documentation Power BI, sérieusement',
    },
    footer: {
      contact: 'Contact',
      site: 'Site',
      subscribe: "S'abonner",
      addLinks: 'Ajoutez vos liens dans src/site.config.ts',
    },
    readMore: 'Lire la suite',
  },
} as const;

export function t(lang: Lang) {
  return dictionary[lang];
}
