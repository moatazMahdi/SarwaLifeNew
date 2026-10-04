import type { Phrase } from '../lang';

/** Arabic first, English second. Arabic stays byte-identical to the Figma copy. */
const p = (ar: string, en: string): Phrase => [ar, en];

/**
 * Logging in and creating an account — Figma 2068:3539 → 2070:5089.
 *
 * The shared controls get their own groups (`phoneField`, `otp`) because the login and the
 * account-creation screens mount the same components; one entry per control is what keeps
 * the two paths from drifting into saying slightly different things.
 */
export const auth = {
  /** Figma 2068:3539 — "قبل إصدار وثيقتك", the fork between an existing and a new customer. */
  gate: {
    premiumLabel: p('قسطك المحسوب', 'Your premium'),
    title: p('قبل إصدار وثيقتك', 'Before we issue your policy'),
    subtitle: p(
      'نحتاج للتعرّف عليك — هل أنت عميل حالي لدى ثروة؟',
      'We need to know who you are — are you already a Sarwa customer?',
    ),
    existing: p('نعم، أنا عميل حالي', "Yes, I'm already a customer"),
    newCustomer: p('لا، أنا عميل جديد', "No, I'm new here"),
    note: p(
      'توثيق الهوية إجراء مطلوب من الهيئة العامة للرقابة المالية قبل إصدار أي وثيقة.',
      'Identity verification is required by the Financial Regulatory Authority before any policy can be issued.',
    ),
    browse: p('ما زلت تتصفّح؟ العودة للعرض', 'Still browsing? Back to the quote'),
  },

  /** Figma 2069:3743 — "تسجيل الدخول". */
  loginPhone: {
    title: p('أهلاً بك في ثروة حياة', 'Welcome to Sarwa Life'),
    subtitle: p(
      'وثائقك ومدفوعاتك ومطالباتك — في مكان واحد.',
      'Your policies, payments and claims — all in one place.',
    ),
  },

  /** The shared number control — Figma 2069:3772 / 2070:3922. */
  phoneField: {
    label: p('رقم الهاتف المحمول', 'Mobile number'),
    /**
     * One line for every rejection. It does not say *why*: a user who typed a Gulf mobile
     * does not need to be told his country is unsupported mid-form, he needs to be told the
     * field is wrong so he can fix it.
     */
    error: p('خطأ في إدخال رقم الموبايل', 'Check your mobile number'),
  },

  /** The shared code screen — Figma 2069:3845 (login) and 2070:3956 (account creation). */
  otp: {
    title: p('اكتب رمز التحقق OTP', 'Enter your verification code'),
    /** Followed by the masked number, so it stops where the figure begins. */
    sentTo: p('المُرسَل إلى رقم الهاتف', 'Sent to'),
    noCode: p('لم يصلك الرمز؟', "Didn't get the code?"),
    resend: p('إعادة الإرسال', 'Resend'),
    /** Followed by the countdown, written with `n()` so Arabic gets Arabic-Indic digits. */
    resendIn: p('إعادة الإرسال بعد', 'Resend in'),
    error: p(
      'رمز التحقق غير صحيح — راجع الرسالة وحاول مرة أخرى.',
      "That code isn't right — check the message and try again.",
    ),
    /** Read aloud for the six boxes, which carry no visible label. */
    a11yCode: p('رمز التحقق', 'Verification code'),
  },

  /** Figma 2070:3901 — "إنشاء حساب- لنبدأ". */
  signupPhone: {
    header: p('إنشاء حساب', 'Create an account'),
    title: p('لنبدأ', "Let's begin"),
    subtitle: p(
      'سنرسل رمز تأكيد إلى رقمك — وسيكون هذا الرقم وسيلة دخولك.',
      "We'll text you a verification code — and this number becomes your log-in.",
    ),
    /** One sentence in four runs: prefix, link, joiner, link. */
    legalPrefix: p('بالتسجيل، أنت توافق على', 'By signing up, you agree to the'),
    terms: p('الشروط والأحكام', 'Terms & Conditions'),
    legalAnd: p('و', 'and the'),
    privacy: p('سياسة الخصوصية', 'Privacy Policy'),
  },

  /** Figma 2070:5089 — "تم إنشاء حسابك! 🎉". */
  signupDone: {
    title: p('تم إنشاء حسابك! 🎉', 'Your account is ready! 🎉'),
    subtitle: p(
      'أهلاً بك في ثروة حياة — حسابك موثّق وجاهز.',
      'Welcome to Sarwa Life — your account is verified and ready.',
    ),
    /** Names the thing the account creation interrupted, rather than a generic start. */
    ctaResume: p('أكمل لإصدار الوثيقة', 'Carry on to your policy'),
    ctaStart: p('لنبدأ', "Let's begin"),
  },
} as const;
