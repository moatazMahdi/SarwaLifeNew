import type { Phrase } from '../lang';

/** Arabic first, English second. Arabic stays byte-identical to the Figma copy. */
const p = (ar: string, en: string): Phrase => [ar, en];

/**
 * Figma: حساب القسط (section 1:601) — the three-step quote flow.
 *
 * Only the flow's own chrome lives here. The five products' copy and the optional extras'
 * labels are `Phrase` pairs in `data/products` already, because that catalogue is built
 * before a language is known; the steps read them with `t()` rather than restating them.
 *
 * English is kept deliberately short: the step captions, the counter row and the breakdown
 * table are all sized around Arabic, which sets narrower than Latin at the same point size.
 */
export const quote = {
  /** Header + stepper, shared by all three steps (`QuoteChrome`). */
  chrome: {
    /** Page title. "Get a quote" rather than a gloss of "premium calculation" — the flow
     *  ends in a saved quote, and the calculator wording is already on the step-2 button. */
    title: p('حساب القسط', 'Get a quote'),
    /**
     * The three bead captions. `numberOfLines={1}` inside a ~92px column at 10.5px, so
     * these have to stay to roughly a dozen Latin characters.
     */
    steps: {
      data: p('بياناتك', 'Your details'),
      cover: p('التغطية', 'Cover'),
      offer: p('العرض', 'Your quote'),
    },
  },

  /** Step 1 — بياناتك. */
  data: {
    dob: p('تاريخ الميلاد', 'Date of birth'),
    /**
     * The empty field's hint, and the shape it expects. The date is typed into one field
     * now, so this replaces the three day/month/year placeholders and the twelve month
     * names that filled their picker — the user writes the whole date once and the app
     * takes the three parts out of it.
     *
     * The Arabic names the parts in words rather than mirroring "DD/MM/YYYY": the separator
     * pattern is read left-to-right, so spelling it out is clearer than a Latin mask set in
     * an Arabic line.
     */
    dobHint: p('يوم / شهر / سنة', 'DD / MM / YYYY'),
    /** Shown once all eight digits are in and they do not describe a real day. */
    dobInvalid: p('تاريخ غير صحيح', "That date doesn't exist"),
    /** Shown for a real date that falls outside the issue ages. */
    dobAge: p(
      'التأمين متاح من سن 18 حتى 65 سنة',
      'Cover is available from age 18 to 65',
    ),
    age: p('العمر', 'Age'),
    /** The two chips themselves are `NATIONALITIES` in `data/products`. */
    nationality: p('الجنسية', 'Nationality'),
    smoker: p('هل أنت مدخّن؟', 'Do you smoke?'),
    yes: p('نعم', 'Yes'),
    no: p('لا', 'No'),
  },

  /** Step 2 — التغطية. */
  cover: {
    heading: p(
      'حدّد مبلغ تغطيتك التأمينية - من 10 الى 300 ألف جنية مصري',
      'Choose your sum insured — from 10,000 to 300,000 EGP',
    ),
    /** The slider carries no visible label; this is all a screen reader has to announce. */
    sliderA11y: p('مبلغ التغطية التأمينية', 'Sum insured'),
    optionalsTitle: p('التغطيات الاختيارية', 'Optional extras'),
    optionalsSubtitle: p(
      'مزايا إضافية يمكنك اضافتها إلى وثيقتك',
      'Extra benefits you can add to your policy',
    ),
    /** The كير بلس card's per-card counter. The −/+ glyphs are not copy and stay as they are. */
    cards: {
      label: p('عدد البطاقات', 'Number of cards'),
      less: p('إنقاص عدد البطاقات', 'Fewer cards'),
      more: p('زيادة عدد البطاقات', 'More cards'),
    },
  },

  /** Step 3 — العرض. */
  offer: {
    /** The hero caption above the headline figure. */
    caption: p('قسطك المقدّر · سنوي', 'Your estimated premium · yearly'),
    /**
     * Prefix for the hero chip, finished at render as `{chip} {money(cover)} {currency}` —
     * the same amount-then-unit order the rest of the screen uses.
     */
    chip: p('تغطية', 'Cover'),
    breakdownTitle: p('تفاصيل احتساب القسط', 'Premium breakdown'),
    /** The first breakdown row; the rest are the chosen extras, labelled from the catalogue. */
    core: p('التغطية الأساسية', 'Core cover'),
    total: p('الإجمالي السنوي', 'Yearly total'),
    note: p(
      'قسط تقديري محسوب وفق البيانات المُدخلة، ويُعتمد نهائياً عند الإصدار.',
      'An estimate based on the details you gave. The final premium is confirmed on issue.',
    ),
  },

  /** The footer buttons across the three steps. */
  cta: {
    /** Step 2 → runs the calculation and opens the loader. */
    calc: p('احسب القسط', 'Calculate premium'),
    /** Step 3, secondary. */
    save: p('احفظ العرض', 'Save quote'),
    /** Step 3, primary — leaves the flow for the account gate. */
    issue: p('أصدر وثيقتي الآن', 'Issue my policy now'),
  },

  /** The full-screen wait between step 2 and step 3 (`PremiumLoader`). */
  loader: {
    headline: p('بنحسب قسطك', 'Working out your premium'),
    subtitle: p(
      'ثوانٍ قليلة ونجهّز لك العرض المبدئي.',
      'A few seconds and your indicative quote is ready.',
    ),
    s1: p('بنراجع بياناتك', 'Checking your details'),
    s2: p('بنسعّر مبلغ التغطية', 'Pricing your sum insured'),
    s3: p('بنضيف التغطيات الاختيارية', 'Adding your optional extras'),
  },
} as const;
