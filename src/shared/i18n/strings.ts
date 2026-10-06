import type { Phrase } from './lang';
import { product } from './ns/product';
import { quote } from './ns/quote';
import { auth } from './ns/auth';
import { kyc } from './ns/kyc';
import { checkout } from './ns/checkout';
import { legal } from './ns/legal';
import { faq } from './ns/faq';

const p = (ar: string, en: string): Phrase => [ar, en];

export const S = {
  common: {
    currency: p('ج.م', 'EGP'),
    yearly: p('سنوياً', 'per year'),
    monthly: p('شهرياً', 'per month'),
    back: p('رجوع', 'Back'),
    next: p('التالي', 'Next'),
    confirm: p('تأكيد', 'Confirm'),
    continue: p('متابعة', 'Continue'),
    save: p('حفظ التعديلات', 'Save changes'),
    cancel: p('إلغاء', 'Cancel'),
  },

  lang: {
    switchTo: p('التبديل إلى English', 'Switch to العربية'),

    other: p('English', 'العربية'),
    restartTitle: p('إعادة تشغيل التطبيق', 'Restart required'),
    restartBody: p(
      'لتغيير اتجاه الواجهة، أغلق التطبيق وافتحه من جديد.',
      'Close and reopen the app to change the layout direction.',
    ),
    ok: p('تمام', 'OK'),
  },

  splash: {
    title: p('ثروة حياة', 'Sarwa Life'),
    tagline: p('حماية في متناول يدك', 'Protection within reach'),
    legal: p(
      'شركة مسجلة بالهيئة العامة للرقابة المالية برقم (...)',
      'Registered with the Financial Regulatory Authority under no. (...)',
    ),
  },

  onboarding: {
    skip: p('تخطّي', 'Skip'),
    start: p('ابدأ الان', 'Get started'),
    noPaper: p('دون أوراق', 'No paperwork'),
    s1: {
      chip: p('تغطية تأمينية حتى ٣٠٠٬٠٠٠ جنيه مصري', 'Cover of up to EGP 300,000'),
      headline: p('من تحبّهم… في أمان', 'The people you love, protected'),
      subtitle: p(
        'تغطيات تأمينية متنوعة على الحياة والعلاج الطبي والاستثمار',
        'Cover for life, medical treatment and investment',
      ),
    },
    s2: {
      chip: p('الوثيقة PDF فور الإصدار', 'PDF policy the moment it is issued'),
      headline: p('وثيقتك في دقائق', 'Your policy in minutes'),
      subtitle: p(
        'من هاتفك مباشرة، اختر التغطية التأمينية واحسب القسط المناسب لك، وسدد القسط واحصل على وثيقة التأمين دون إجراءات.',
        'Straight from your phone: choose your cover, work out the premium that suits you, pay it and receive your policy — no paperwork.',
      ),
    },
    s3: {
      chip: p('دون رسوم خفية', 'No hidden fees'),
      headline: p('بجنيهات قليلة سنوياً', 'For a few pounds a year'),
      subtitle: p(
        'وأحصل على وثيقة، أنت من يحدد مبلغ التغطية التأمينية والقسط المناسب، ويمكنك تعديلها في أي وقت.',
        'You choose the sum insured and the premium that suits you, and you can change them at any time.',
      ),
    },
  },

  home: {
    greeting: p('أهلاً بك 👋', 'Welcome 👋'),
    tagline: p(
      'اختر تغطيتك واحصل على وثيقتك من التطبيق',
      'Choose your cover and get your policy in the app',
    ),
    sectionTitle: p('برامجنا التأمينية', 'Our insurance plans'),
    contact: p('تواصل معنا', 'Chat with us'),
  },

  products: {
    death: {
      title: p('حماية ضد مخاطر الوفاة', 'Life protection'),
      desc: p(
        'تحصل أسرتك على مبلغ الحماية التأمينية حتى 300,000 جنيه مصري',
        'Your family receives a benefit of up to EGP 300,000',
      ),
    },
    sav: {
      title: p('وثيقة حماية - وفاة و ادخار', 'Protection & savings'),
      desc: p(
        'حماية لأسرتك حتى 300,000 جنيه مصري، ومدّخرات تتكوّن لك مع كل قسط',
        'Cover of up to EGP 300,000 for your family, plus savings that build with every premium',
      ),
    },
    crit: {
      title: p('الأمراض الحرجة', 'Critical illness'),
      desc: p(
        'عند الإصابة بأحد الأمراض الحرجة المغطاة يُصرف لك مبلغ الحماية التأمينية حتى 300,000 جنيه مصري',
        'A benefit of up to EGP 300,000 is paid to you on diagnosis of a covered critical illness',
      ),
    },
    fcan: {
      title: p('سرطان الإناث', "Women's cancer"),
      desc: p(
        'عند الإصابة بأحد أنواع سرطان الإناث المغطاة يُصرف لك مبلغ الحماية التأمينية حتى 300,000 جنيه مصري',
        "A benefit of up to EGP 300,000 is paid to you on diagnosis of a covered women's cancer",
      ),
    },
    mcan: {
      title: p('سرطان الرجال', "Men's cancer"),
      desc: p(
        'عند الإصابة بأحد أنواع سرطان الذكور المغطاة يُصرف لك مبلغ الحماية التأمينية حتى 300,000 جنيه مصري',
        "A benefit of up to EGP 300,000 is paid to you on diagnosis of a covered men's cancer",
      ),
    },
  },

  product,
  quote,
  auth,
  kyc,
  checkout,
  legal,
  faq,
} as const;
