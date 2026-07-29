// Central site copy/config. Fill in the empty social links whenever you have them —
// Footer.astro only renders the ones that are set.
export const site = {
  title: 'PBI Documentation',
  wordmark: { main: 'PBI', accent: 'Documentation' },
  tagline: 'Power BI documentation, refined.',
  description:
    'Practical writing on documenting Power BI projects — design documents, PBIR annotations, translytical task flows, and the tooling around them.',
  descriptionFr:
    'Des articles pratiques sur la documentation des projets Power BI — documents de conception, annotations PBIR, translytical task flows, et les outils qui vont avec.',
  author: 'Alexandru Badiu',
  githubRepo: 'https://github.com/alexbadiu-insightsinmotion/PBI-Documentation',
  bookingUrl: 'https://bookings.cloud.microsoft/book/PugliaBIConsulting@pugliabi.com/?ismsaljsauthenabled=true',
  social: {
    linkedin: '',
    x: '',
    youtube: '',
  },
  // Set once you have a Buttondown username — activates the Subscribe form (Wave 4).
  buttondownUsername: '',
};
