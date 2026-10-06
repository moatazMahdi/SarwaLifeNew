import type { Phrase } from '../lang';

const p = (ar: string, en: string): Phrase => [ar, en];

export const quote = {
  chrome: {
    title: p('حساب القسط', 'Get a quote'),

    steps: {
      data: p('بياناتك', 'Your details'),
      cover: p('التغطية', 'Cover'),
      offer: p('العرض', 'Your quote'),
    },
  },

  data: {
    dob: p('تاريخ الميلاد', 'Date of birth'),

    dobHint: p('يوم / شهر / سنة', 'DD / MM / YYYY'),

    dobInvalid: p('تاريخ غير صحيح', "That date doesn't exist"),

    dobAge: p(
      'التأمين متاح من سن 18 حتى 65 سنة',
      'Cover is available from age 18 to 65',
    ),
    age: p('العمر', 'Age'),

    nationality: p('الجنسية', 'Nationality'),
    smoker: p('هل أنت مدخّن؟', 'Do you smoke?'),
    yes: p('نعم', 'Yes'),
    no: p('لا', 'No'),
  },

  cover: {
    heading: p(
      'حدّد مبلغ تغطيتك التأمينية - من 10 الى 300 ألف جنية مصري',
      'Choose your sum insured — from 10,000 to 300,000 EGP',
    ),

    sliderA11y: p('مبلغ التغطية التأمينية', 'Sum insured'),
    optionalsTitle: p('التغطيات الاختيارية', 'Optional extras'),
    optionalsSubtitle: p(
      'مزايا إضافية يمكنك اضافتها إلى وثيقتك',
      'Extra benefits you can add to your policy',
    ),

    cards: {
      label: p('عدد البطاقات', 'Number of cards'),
      less: p('إنقاص عدد البطاقات', 'Fewer cards'),
      more: p('زيادة عدد البطاقات', 'More cards'),
    },
  },

  offer: {
    caption: p('قسطك المقدّر · سنوي', 'Your estimated premium · yearly'),

    chip: p('تغطية', 'Cover'),
    breakdownTitle: p('تفاصيل احتساب القسط', 'Premium breakdown'),

    core: p('التغطية الأساسية', 'Core cover'),
    total: p('الإجمالي السنوي', 'Yearly total'),
    note: p(
      'قسط تقديري محسوب وفق البيانات المُدخلة، ويُعتمد نهائياً عند الإصدار.',
      'An estimate based on the details you gave. The final premium is confirmed on issue.',
    ),
  },

  cta: {
    calc: p('احسب القسط', 'Calculate premium'),

    save: p('احفظ العرض', 'Save quote'),

    issue: p('أصدر وثيقتي الآن', 'Issue my policy now'),
  },

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
