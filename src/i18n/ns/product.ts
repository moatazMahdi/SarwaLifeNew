import type { Phrase } from '../lang';

/** Arabic first, English second. Arabic stays byte-identical to the Figma copy. */
const p = (ar: string, en: string): Phrase => [ar, en];

/**
 * Figma: المنتجات (section 1:351) — the product detail screen.
 *
 * Almost all of this screen's copy is the product's own (title, intro, perks), which lives in
 * `data/products` as `Phrase` pairs because the catalogue is built before a language is known.
 * What belongs here is only the chrome the five products share: the two footer buttons and the
 * labels on the hero's icon-only controls.
 */
export const product = {
  cta: {
    /** Footer primary — leads into the quote flow. */
    calc: p('احسب قسطي الآن', 'Calculate my premium'),
    /** Footer secondary — opens WhatsApp. Same wording as the home screen's contact button. */
    contact: p('تواصل معنا', 'Chat with us'),
  },

  /**
   * The hero's two glass buttons carry an icon and no text, so a screen reader has nothing to
   * announce without these.
   */
  a11y: {
    back: p('رجوع', 'Back'),
    share: p('مشاركة', 'Share'),
  },
} as const;
