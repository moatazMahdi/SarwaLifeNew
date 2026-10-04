import { IconName } from '../assets/icons/iconXml';
import { ProductKey } from '../theme';
import type { Phrase } from '../i18n/lang';

/**
 * The product catalogue, in both languages.
 *
 * Every piece of copy here is a `Phrase` rather than a finished string: this table is built
 * once at module load, long before a language is known, so the choice has to be deferred to
 * the render that reads it. Screens write it with `t(...)` from `useI18n()`.
 *
 * The type-only import of `Phrase` is deliberate — pulling it from `../i18n` would drag the
 * provider (and `strings.ts` behind it) into this module's runtime graph for no reason.
 *
 * The Arabic is byte-identical to the Figma copy and is also the fallback, so it is the half
 * to edit when the design changes.
 */
const p = (ar: string, en: string): Phrase => [ar, en];

export type Benefit = { title: Phrase; desc: Phrase };

export type Product = {
  key: ProductKey;
  icon: IconName;
  title: Phrase;
  short: Phrase;
  tagline: Phrase;
  coverOptions: number[];
  /** Figma "المنتجات" (1:351) — the paragraph under the hero on the product screen. */
  intro: Phrase;
  /** Figma "المنتجات" (1:351) — the check-circle cards under the intro. */
  perks: Phrase[];
  benefits: Benefit[];
  covers: Phrase[];
  excludes: Phrase[];
  /** معامل التسعير الأساسي لكل 1000 جنيه تغطية سنوياً */
  rate: number;
};

export const PRODUCTS: Product[] = [
  {
    key: 'death',
    icon: 'death',
    title: p('حماية ضد مخاطر الوفاة', 'Life protection'),
    short: p(
      'تحصل أسرتك على مبلغ الحماية التأمينية حتى 300,000 جنيه مصري',
      'Your family receives a benefit of up to EGP 300,000',
    ),
    tagline: p('أمان مالي لأسرتك مهما حدث', 'Financial security for your family, whatever happens'),
    coverOptions: [50000, 100000, 200000, 300000],
    intro: p(
      'في حالة الوفاة لا "قدر الله" تحصل أسرتك على مبلغ الحماية التأمينية حتى 300,000 جنيه مصري. كما يمكنك الحصول على المزايا الإضافية التالية:',
      'In the event of death, God forbid, your family receives a benefit of up to EGP 300,000. You can also add the following extra benefits:',
    ),
    perks: [
      p(
        'منتج كير بلس — خصومات متميزة على الخدمات الطبية وخدمة الاستشارة الطبية.',
        'Care Plus — generous discounts on medical services and medical consultations.',
      ),
      p(
        'تغطية المصروفات الطبية الناتجة عن حادث بنسبة ١٠٪ من مبلغ التأمين على الحياة.',
        'Medical expenses arising from an accident, covered up to 10% of the life sum insured.',
      ),
      p(
        'تغطية مصروفات الإقامة في المستشفى بمبلغ 1000 جنيه مصري أسبوعياً.',
        'Hospital stay expenses covered at EGP 1,000 a week.',
      ),
    ],
    benefits: [
      {
        title: p('مبلغ تأمين فوري', 'Paid out quickly'),
        desc: p(
          'يُصرف لأسرتك مبلغ الحماية التأمينية كاملاً خلال أيام من تقديم المطالبة.',
          'The full benefit is paid to your family within days of the claim being filed.',
        ),
      },
      {
        title: p('دون كشف طبي', 'No medical exam'),
        desc: p(
          'إصدار الوثيقة بالإفصاح الطبي فقط حتى مبلغ 300,000 جنيه.',
          'The policy is issued on medical disclosure alone, up to EGP 300,000.',
        ),
      },
      {
        title: p('قسط ثابت', 'Fixed premium'),
        desc: p(
          'القسط لا يتغيّر طوال مدة الوثيقة.',
          'Your premium does not change for the life of the policy.',
        ),
      },
    ],
    covers: [
      p(
        'الوفاة الطبيعية في أي وقت خلال سريان الوثيقة',
        'Death from natural causes at any time while the policy is in force',
      ),
      p('الوفاة نتيجة حادث', 'Death as the result of an accident'),
      p(
        'الوفاة داخل وخارج جمهورية مصر العربية',
        'Death inside and outside the Arab Republic of Egypt',
      ),
    ],
    excludes: [
      p(
        'الانتحار خلال السنة الأولى من سريان الوثيقة',
        'Suicide during the first year of the policy',
      ),
      p(
        'الأمراض السابقة غير المُفصح عنها عند التقديم',
        'Pre-existing conditions not disclosed at application',
      ),
      p(
        'الأنشطة الخطرة والرياضات العنيفة غير المُصرّح بها',
        'Undeclared hazardous activities and contact sports',
      ),
    ],
    rate: 3.2,
  },
  {
    key: 'sav',
    icon: 'sav',
    title: p('وثيقة حماية - وفاة و ادخار', 'Protection & savings'),
    short: p(
      'حماية لأسرتك حتى 300,000 جنيه مصري، ومدّخرات تتكوّن لك مع كل قسط',
      'Cover of up to EGP 300,000 for your family, plus savings that build with every premium',
    ),
    tagline: p(
      'تحمي أسرتك وتدّخر لمستقبلك في وثيقة واحدة',
      'Protect your family and save for your future in a single policy',
    ),
    coverOptions: [50000, 100000, 200000, 300000],
    intro: p(
      'في حالة الوفاة لا "قدر الله" تحصل أسرتك على مبلغ الحماية التأمينية حتى 300,000 جنيه مصري، بالإضافة إلى قيمة المدّخرات التي تم تكوينها في الوثيقة. كما يمكنك الحصول على المزايا الإضافية التالية:',
      'In the event of death, God forbid, your family receives a benefit of up to EGP 300,000, plus the savings built up in the policy. You can also add the following extra benefits:',
    ),
    perks: [
      p(
        'منتج كير بلس — خصومات متميزة على خدمة الاستشارات الطبية.',
        'Care Plus — generous discounts on medical consultations.',
      ),
    ],
    benefits: [
      {
        title: p('حماية + ادخار', 'Protection + savings'),
        desc: p(
          'جزء من القسط يذهب للحماية التأمينية والجزء الآخر يُستثمر لصالحك.',
          'Part of your premium buys cover, the rest is invested for you.',
        ),
      },
      {
        title: p('قيمة استرداد', 'Surrender value'),
        desc: p(
          'يمكنك استرداد قيمة مدّخراتك بعد مرور ثلاث سنوات.',
          'You can cash in your savings after three years.',
        ),
      },
      {
        title: p('عائد تراكمي', 'Compounding return'),
        desc: p(
          'مدّخراتك تنمو سنوياً وفقاً لعائد الاستثمار المُعلن.',
          'Your savings grow each year at the declared investment return.',
        ),
      },
    ],
    covers: [
      p('الوفاة الطبيعية أو نتيجة حادث', 'Death from natural causes or an accident'),
      p(
        'تكوين مبلغ ادخاري يُصرف في نهاية مدة الوثيقة',
        'A savings amount built up and paid at the end of the policy term',
      ),
      p(
        'إمكانية زيادة القسط الادخاري في أي وقت',
        'The option to increase the savings premium at any time',
      ),
    ],
    excludes: [
      p(
        'الانتحار خلال السنة الأولى من سريان الوثيقة',
        'Suicide during the first year of the policy',
      ),
      p(
        'الاسترداد قبل مرور ثلاث سنوات من بداية الوثيقة',
        'Surrender before the policy is three years old',
      ),
      p('البيانات غير الصحيحة عند التقديم', 'Incorrect information given at application'),
    ],
    rate: 9.5,
  },
  {
    key: 'crit',
    icon: 'crit',
    title: p('الأمراض الحرجة', 'Critical illness'),
    short: p(
      'عند الإصابة بأحد الأمراض الحرجة المغطاة يُصرف لك مبلغ الحماية التأمينية حتى 300,000 جنيه مصري',
      'A benefit of up to EGP 300,000 is paid to you on diagnosis of a covered critical illness',
    ),
    tagline: p('مبلغ نقدي فوري وقت ما تحتاجه فعلاً', 'Cash in hand exactly when you need it'),
    coverOptions: [50000, 100000, 200000, 300000],
    intro: p(
      'عند الإصابة بأحد الأمراض الحرجة الرئيسية المغطاة يُصرف لك مبلغ الحماية التأمينية حتى 300,000 جنيه مصري مباشرة. كما يمكنك الحصول على المزايا الإضافية التالية:',
      'On diagnosis of one of the major critical illnesses covered, a benefit of up to EGP 300,000 is paid directly to you. You can also add the following extra benefits:',
    ),
    perks: [
      p(
        'منتج كير بلس — خصومات متميزة على خدمة الاستشارات الطبية.',
        'Care Plus — generous discounts on medical consultations.',
      ),
    ],
    benefits: [
      {
        title: p('يُصرف لك أنت', 'Paid to you'),
        desc: p(
          'المبلغ يُصرف لك شخصياً فور تأكيد التشخيص — تتصرّف فيه كما تشاء.',
          'The benefit is paid to you personally as soon as the diagnosis is confirmed — spend it however you choose.',
        ),
      },
      {
        title: p('٢٠ مرضاً مغطى', '20 illnesses covered'),
        desc: p(
          'تشمل أمراض القلب والسرطان والفشل الكلوي والسكتة الدماغية وغيرها.',
          'Including heart disease, cancer, kidney failure, stroke and more.',
        ),
      },
      {
        title: p('الوثيقة تستمر', 'The policy continues'),
        desc: p(
          'تظل التغطية سارية لباقي الأمراض بعد صرف أول مطالبة جزئية.',
          'Cover stays in force for the remaining illnesses after a first partial claim is paid.',
        ),
      },
    ],
    covers: [
      p('السرطان بمراحله المغطاة', 'Cancer at the covered stages'),
      p('الأزمات القلبية وجراحات الشرايين التاجية', 'Heart attacks and coronary artery surgery'),
      p(
        'السكتة الدماغية والفشل الكلوي وزراعة الأعضاء',
        'Stroke, kidney failure and organ transplants',
      ),
    ],
    excludes: [
      p('الأمراض المُشخّصة قبل إصدار الوثيقة', 'Illnesses diagnosed before the policy was issued'),
      p('فترة الانتظار ٩٠ يوماً من تاريخ بدء السريان', 'A 90-day waiting period from the start date'),
      p(
        'الحالات الناتجة عن تعاطي المخدرات أو الكحول',
        'Conditions caused by drug or alcohol abuse',
      ),
    ],
    rate: 4.8,
  },
  {
    key: 'fcan',
    icon: 'fcan',
    title: p('سرطان الإناث', "Women's cancer"),
    short: p(
      'عند الإصابة بأحد أنواع سرطان الإناث المغطاة يُصرف لك مبلغ الحماية التأمينية حتى 300,000 جنيه مصري',
      "A benefit of up to EGP 300,000 is paid to you on diagnosis of a covered women's cancer",
    ),
    tagline: p('تغطية متخصصة بقسط في المتناول', 'Specialist cover at an affordable premium'),
    coverOptions: [50000, 100000, 200000, 300000],
    intro: p(
      'عند الإصابة بأحد أنواع سرطان الإناث الرئيسية المغطاة يُصرف لك مبلغ الحماية التأمينية حتى 300,000 جنيه مصري مباشرة. كما يمكنك الحصول على المزايا الإضافية التالية:',
      "On diagnosis of one of the major women's cancers covered, a benefit of up to EGP 300,000 is paid directly to you. You can also add the following extra benefits:",
    ),
    perks: [
      p(
        'منتج كير بلس — خصومات متميزة على خدمة الاستشارات الطبية.',
        'Care Plus — generous discounts on medical consultations.',
      ),
    ],
    benefits: [
      {
        title: p('تغطية متخصصة', 'Specialist cover'),
        desc: p(
          'مصمّمة خصيصاً لأنواع السرطان الأكثر شيوعاً بين السيدات.',
          'Built around the cancers most common among women.',
        ),
      },
      {
        title: p('قسط منخفض', 'Lower premium'),
        desc: p(
          'تغطية مركّزة تعني قسطاً أقل بكثير من الوثائق العامة.',
          'Focused cover means a far lower premium than a general policy.',
        ),
      },
      {
        title: p('كشف مبكر', 'Early detection'),
        desc: p(
          'تغطية جزئية عند اكتشاف الحالة في مرحلة مبكرة.',
          'A partial benefit when the condition is caught at an early stage.',
        ),
      },
    ],
    covers: [
      p('سرطان الثدي', 'Breast cancer'),
      p('سرطان عنق الرحم والمبيض', 'Cervical and ovarian cancer'),
      p('سرطان الرحم', 'Uterine cancer'),
    ],
    excludes: [
      p('الحالات المُشخّصة قبل إصدار الوثيقة', 'Conditions diagnosed before the policy was issued'),
      p('فترة الانتظار ٩٠ يوماً من تاريخ بدء السريان', 'A 90-day waiting period from the start date'),
      p('الأورام الحميدة', 'Benign tumours'),
    ],
    rate: 2.4,
  },
  {
    key: 'mcan',
    icon: 'mcan',
    title: p('سرطان الرجال', "Men's cancer"),
    short: p(
      'عند الإصابة بأحد أنواع سرطان الذكور المغطاة يُصرف لك مبلغ الحماية التأمينية حتى 300,000 جنيه مصري',
      "A benefit of up to EGP 300,000 is paid to you on diagnosis of a covered men's cancer",
    ),
    tagline: p('تغطية متخصصة بقسط في المتناول', 'Specialist cover at an affordable premium'),
    coverOptions: [50000, 100000, 200000, 300000],
    intro: p(
      'عند الإصابة بأحد أنواع سرطان الذكور الرئيسية المغطاة يُصرف لك مبلغ الحماية التأمينية حتى 300,000 جنيه مصري مباشرة. كما يمكنك الحصول على المزايا الإضافية التالية:',
      "On diagnosis of one of the major men's cancers covered, a benefit of up to EGP 300,000 is paid directly to you. You can also add the following extra benefits:",
    ),
    perks: [
      p(
        'منتج كير بلس — خصومات متميزة على خدمة الاستشارات الطبية.',
        'Care Plus — generous discounts on medical consultations.',
      ),
    ],
    benefits: [
      {
        title: p('تغطية متخصصة', 'Specialist cover'),
        desc: p(
          'مصمّمة خصيصاً لأنواع السرطان الأكثر شيوعاً بين الرجال.',
          'Built around the cancers most common among men.',
        ),
      },
      {
        title: p('قسط منخفض', 'Lower premium'),
        desc: p(
          'تغطية مركّزة تعني قسطاً أقل بكثير من الوثائق العامة.',
          'Focused cover means a far lower premium than a general policy.',
        ),
      },
      {
        title: p('كشف مبكر', 'Early detection'),
        desc: p(
          'تغطية جزئية عند اكتشاف الحالة في مرحلة مبكرة.',
          'A partial benefit when the condition is caught at an early stage.',
        ),
      },
    ],
    covers: [
      p('سرطان البروستاتا', 'Prostate cancer'),
      p('سرطان القولون والمستقيم', 'Colorectal cancer'),
      p('سرطان الخصية', 'Testicular cancer'),
    ],
    excludes: [
      p('الحالات المُشخّصة قبل إصدار الوثيقة', 'Conditions diagnosed before the policy was issued'),
      p('فترة الانتظار ٩٠ يوماً من تاريخ بدء السريان', 'A 90-day waiting period from the start date'),
      p('الأورام الحميدة', 'Benign tumours'),
    ],
    rate: 2.2,
  },
];

export function getProduct(key?: string): Product {
  return PRODUCTS.find((x) => x.key === key) ?? PRODUCTS[0];
}

export type OptionalKey = 'hospital' | 'accident' | 'careplus';

export const OPTIONALS: {
  key: OptionalKey;
  label: Phrase;
  desc: Phrase;
  yearly: number;
  /** كير بلس تُشترى كبطاقات — القسط يُضرب في عدد البطاقات. */
  perCard?: boolean;
}[] = [
  {
    key: 'hospital',
    label: p('تغطية مصروفات الاقامة عند دخول المستشفى', 'Hospital stay expenses'),
    desc: p(
      'مبلغ يومي يُصرف لك عن كل ليلة إقامة بالمستشفى حتى ٣٠ ليلة سنوياً.',
      'A daily amount paid to you for every night in hospital, up to 30 nights a year.',
    ),
    yearly: 264,
  },
  {
    key: 'accident',
    label: p('تغطية المصروفات الطبية الناتجة عن حادث', 'Medical expenses from an accident'),
    desc: p(
      'تعويض النفقات الطبية الناتجة عن الحوادث حتى 20,000 جنيه سنوياً.',
      'Reimbursement of medical costs arising from accidents, up to EGP 20,000 a year.',
    ),
    yearly: 312,
  },
  {
    key: 'careplus',
    label: p('بطاقة الخصم على الخدمات الطبية (كير بلس)', 'Medical services discount card (Care Plus)'),
    desc: p(
      'خصومات تصل إلى ٥٠٪ لدى شبكة واسعة من المستشفيات والمعامل والصيدليات.',
      'Discounts of up to 50% across a wide network of hospitals, labs and pharmacies.',
    ),
    yearly: 480,
    perCard: true,
  },
];

/** حدود شريط التغطية في شاشة "التغطية" (Figma 2065:2867). */
export const COVER_MIN = 10000;
export const COVER_MAX = 300000;
export const COVER_STEP = 5000;
export const COVER_DEFAULT = 15000;
export const CARDS_MAX = 5;

/**
 * Destination for the "تواصل معنا" button on the product screen (wa.me format: country
 * code + number, digits only). TODO: swap in Sarwa Life's real support line.
 */
export const SUPPORT_WHATSAPP = '201000000000';

/**
 * الجنسية خيارَان فقط في شاشة "بياناتك" — مصري / غير مصري.
 *
 * The Arabic half doubles as the stored value (`QuoteInput.nationality`), so switching
 * language relabels the two chips without clearing the answer underneath them.
 */
export const NATIONALITIES: Phrase[] = [p('مصري', 'Egyptian'), p('غير مصري', 'Non-Egyptian')];

export type QuoteInput = {
  dob: string;
  age: number;
  nationality: string;
  smoker: boolean;
  cover: number;
  optionals: OptionalKey[];
  /** عدد بطاقات كير بلس (١ فأكثر) — يُستخدم فقط عند اختيار `careplus`. */
  cards: number;
};

export type QuoteResult = {
  base: number;
  ageLoad: number;
  smokerLoad: number;
  /** قسط التغطية الأساسية = الأساسي + فرق السن + تحميل التدخين (صف "التغطية الأساسية"). */
  core: number;
  /** تفصيل كل تغطية اختيارية مختارة، بنفس ترتيب `OPTIONALS` (صفوف الشاشة الثالثة). */
  lines: { key: OptionalKey; label: Phrase; amount: number }[];
  optionalsTotal: number;
  yearly: number;
  monthly: number;
};

export function calcPremium(product: Product, input: QuoteInput): QuoteResult {
  const base = (input.cover / 1000) * product.rate;
  const ageLoad = base * Math.max(0, (input.age - 25)) * 0.018;
  const smokerLoad = input.smoker ? (base + ageLoad) * 0.35 : 0;
  const cards = Math.max(1, input.cards || 1);

  const lines = OPTIONALS.filter((o) => input.optionals.includes(o.key)).map((o) => ({
    key: o.key,
    label: o.label,
    amount: o.perCard ? o.yearly * cards : o.yearly,
  }));
  const optionalsTotal = lines.reduce((s, l) => s + l.amount, 0);

  const core = Math.round(base + ageLoad + smokerLoad);
  return {
    base: Math.round(base),
    ageLoad: Math.round(ageLoad),
    smokerLoad: Math.round(smokerLoad),
    core,
    lines,
    optionalsTotal,
    yearly: core + optionalsTotal,
    monthly: Math.round((core + optionalsTotal) / 12),
  };
}

/**
 * Money keeps Western digits and Western grouping in both languages — that is how prices are
 * printed in Egypt, including in Arabic-language material. Only bare counts switch digit
 * sets; see `digits` in `i18n/lang`.
 */
export function money(n: number): string {
  return n.toLocaleString('en-US');
}

/**
 * The age in whole years, or 0 for anything this function cannot read as a real birth date.
 *
 * The round-trip check is the part that matters. `new Date(1990, 1, 31)` does not fail — it
 * rolls forward to 3 March and hands back a perfectly valid object, and `new Date(1990, 12, 1)`
 * quietly becomes January 1991. So "31/02/1990" and "01/13/1990" both used to return an age in
 * the thirties, which lit "التالي" on the quote's first step while the field underneath it was
 * showing "تاريخ غير صحيح" in red — the screen contradicting itself, and a premium priced off a
 * date the user never typed. Reading the three parts back off the `Date` catches every such
 * roll-over: if the month or the day moved, the date did not exist.
 */
export function ageFromDob(dob: string): number {
  const m = dob.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return 0;
  const [, d, mo, y] = m;
  const birth = new Date(Number(y), Number(mo) - 1, Number(d));
  if (Number.isNaN(birth.getTime())) return 0;
  if (
    birth.getFullYear() !== Number(y) ||
    birth.getMonth() !== Number(mo) - 1 ||
    birth.getDate() !== Number(d)
  ) {
    return 0;
  }
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const md = now.getMonth() - birth.getMonth();
  if (md < 0 || (md === 0 && now.getDate() < birth.getDate())) age -= 1;
  return age > 0 && age < 120 ? age : 0;
}
