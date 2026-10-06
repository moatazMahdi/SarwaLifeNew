import type { Phrase } from '../lang';

const p = (ar: string, en: string): Phrase => [ar, en];

export const product = {
  cta: {
    calc: p('احسب قسطي الآن', 'Calculate my premium'),

    contact: p('تواصل معنا', 'Chat with us'),
  },

  a11y: {
    back: p('رجوع', 'Back'),
    share: p('مشاركة', 'Share'),
  },
} as const;
