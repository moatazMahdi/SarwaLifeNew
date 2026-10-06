import type { Phrase } from '../lang';

const p = (ar: string, en: string): Phrase => [ar, en];

export const auth = {
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

  loginPhone: {
    title: p('أهلاً بك في ثروة حياة', 'Welcome to Sarwa Life'),
    subtitle: p(
      'وثائقك ومدفوعاتك ومطالباتك — في مكان واحد.',
      'Your policies, payments and claims — all in one place.',
    ),
  },

  phoneField: {
    label: p('رقم الهاتف المحمول', 'Mobile number'),

    error: p('خطأ في إدخال رقم الموبايل', 'Check your mobile number'),
  },

  otp: {
    title: p('اكتب رمز التحقق OTP', 'Enter your verification code'),

    sentTo: p('المُرسَل إلى رقم الهاتف', 'Sent to'),
    noCode: p('لم يصلك الرمز؟', "Didn't get the code?"),
    resend: p('إعادة الإرسال', 'Resend'),

    resendIn: p('إعادة الإرسال بعد', 'Resend in'),
    error: p(
      'رمز التحقق غير صحيح — راجع الرسالة وحاول مرة أخرى.',
      "That code isn't right — check the message and try again.",
    ),

    a11yCode: p('رمز التحقق', 'Verification code'),
  },

  signupPhone: {
    header: p('إنشاء حساب', 'Create an account'),
    title: p('لنبدأ', "Let's begin"),
    subtitle: p(
      'سنرسل رمز تأكيد إلى رقمك — وسيكون هذا الرقم وسيلة دخولك.',
      "We'll text you a verification code — and this number becomes your log-in.",
    ),

    legalPrefix: p('بالتسجيل، أنت توافق على', 'By signing up, you agree to the'),
    terms: p('الشروط والأحكام', 'Terms & Conditions'),
    legalAnd: p('و', 'and the'),
    privacy: p('سياسة الخصوصية', 'Privacy Policy'),
  },

  signupDone: {
    title: p('تم إنشاء حسابك! 🎉', 'Your account is ready! 🎉'),
    subtitle: p(
      'أهلاً بك في ثروة حياة — حسابك موثّق وجاهز.',
      'Welcome to Sarwa Life — your account is verified and ready.',
    ),

    ctaResume: p('أكمل لإصدار الوثيقة', 'Carry on to your policy'),
    ctaStart: p('لنبدأ', "Let's begin"),
  },
} as const;
