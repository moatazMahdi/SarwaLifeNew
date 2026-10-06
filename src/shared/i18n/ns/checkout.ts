import type { Phrase } from '../lang';

const p = (ar: string, en: string): Phrase => [ar, en];

export const checkout = {
  topBar: p('اصدار الوثيقة', 'Issue your policy'),

  steps: [
    p('\u200Eتأكيد', 'Confirm'),
    p('مستفيد', 'Beneficiary'),
    p('\u200Eإفصاح', 'Disclosure'),
    p('\u200Eدفع', 'Payment'),
  ],

  chip: {
    kicker: p('المنتج', 'Product'),
    cover: p('التغطية', 'Cover'),
  },

  summary: {
    product: p('المنتج', 'Product'),
    sumInsured: p('مبلغ التأمين', 'Sum insured'),
    covers: p('التغطيات', 'Cover'),
    yearlyPremium: p('القسط السنوي', 'Annual premium'),
    policyNumber: p('رقم الوثيقة', 'Policy number'),
    method: p('وسيلة السداد', 'Payment method'),
    amountDue: p('المبلغ المستحق', 'Amount due'),
  },

  personal: {
    title: p('تأكيد البيانات الشخصية', 'Confirm your details'),
    subtitle: p(
      'راجع بياناتك قبل المتابعة — يمكنك تعديل الحقول المتاحة.',
      'Check your details before you continue — you can edit the available fields.',
    ),
    edit: p('تعديل البيانات', 'Edit details'),

    editTitle: p('تعديل البيانات', 'Edit your details'),
    editSubtitle: p(
      'عدّل ما يلزم ثم احفظ — ستظهر البيانات الجديدة في الوثيقة.',
      'Change what you need and save — the new details will appear on your policy.',
    ),
    fullName: p('الإسم بالكامل', 'Full name'),
    nationalId: p('الرقم القومي', 'National ID'),
    governorate: p('المحافظة', 'Governorate'),
    city: p('المدينة', 'City'),
    age: p('السن', 'Age'),

    years: p('سنة', 'years'),
    maritalStatus: p('الحالة الاجتماعية', 'Marital status'),
  },

  beneficiaries: {
    title: p('تحديد المستفيدين', 'Your beneficiaries'),
    subtitle: p('من يستلم مبلغ التأمين؟', 'Who receives the sum insured?'),
    heirs: p('الورثة الشرعيين', 'Legal heirs'),
    heirsDesc: p(
      'يُوزّع مبلغ التأمين على الورثة الشرعيين وفقاً للقانون المصري.',
      'The sum insured is distributed among the legal heirs in accordance with Egyptian law.',
    ),
    note: p(
      'المستفيد محدّد بحسب المنتج المختار، ولا يمكن تغييره.',
      'The beneficiary is set by the product you chose and cannot be changed.',
    ),
  },

  medical: {
    title: p('الإفصاح الطبي', 'Medical disclosure'),
    subtitle: p('أسئلة تتعلق بحالتك الصحية', 'A few questions about your health'),
    note: p(
      'نطرح هذه الأسئلة لضمان سريان وثيقتك عند الحاجة إليها — يُرجى الإجابة بدقة.',
      'We ask these questions so your policy is valid when you need it — please answer accurately.',
    ),
    chronic: p('هل تعاني من أي أمراض مزمنة؟', 'Do you have any chronic illnesses?'),
    critical: p(
      'هل سبق تشخيصك بمرض خطير؟',
      'Have you ever been diagnosed with a serious illness?',
    ),
    surgery: p(
      'هل أجريت عملية جراحية خلال آخر ٥ سنوات؟',
      'Have you had surgery in the past 5 years?',
    ),
    yes: p('نعم', 'Yes'),
    no: p('لا', 'No'),
    attest: p(
      'أقرّ بأن جميع الإجابات صحيحة، وأي إخفاء للحقائق قد يؤدي إلى بطلان الوثيقة وفقاً للشروط والأحكام.',
      'I confirm that every answer is correct. Withholding any fact may render the policy void under the terms and conditions.',
    ),
  },

  payment: {
    title: p('الدفع والتأكيد', 'Payment and confirmation'),
    subtitle: p('راجع تفاصيل وثيقتك قبل السداد.', 'Review your policy details before you pay.'),

    baseCover: p('التغطية الأساسية للمنتج', "The product's standard cover"),
    methodTitle: p('اختر وسيلة السداد', 'Choose a payment method'),
    methodSubtitle: p(
      'لن يُخصم منك سوى المبلغ الموضّح أمامك.',
      'You will only be charged the amount shown above.',
    ),

    fawry: p('فوري', 'Fawry'),
    fawryDesc: p('ادفع بكود فوري', 'Pay with a Fawry code'),
    card: p('بطاقة ائتمان / خصم', 'Credit or debit card'),
    cardDesc: p('فيزا / ماستركارد / ميزة', 'Visa / Mastercard / Meeza'),
    wallet: p('محفظة إلكترونية', 'Mobile wallet'),
    walletDesc: p('فودافون / اتصالات / أورانج كاش', 'Vodafone / Etisalat / Orange Cash'),

    consentPre: p('أوافق على', 'I agree to the'),
    terms: p('الشروط والأحكام', 'Terms and Conditions'),
    consentAnd: p('و', 'and the'),
    privacy: p('سياسة الخصوصية', 'Privacy Policy'),
    consentPost: p(
      'وأقرّ بصحة البيانات المُدخلة.',
      'and confirm that the details I have entered are correct.',
    ),

    issue: p('أصدر وثيقتي الآن', 'Issue my policy now'),
  },

  methodNames: {
    fawry: p('فوري', 'Fawry'),
    card: p('بطاقة ائتمان', 'Credit card'),
    wallet: p('محفظة إلكترونية', 'Mobile wallet'),

    fallback: p('الدفع الإلكتروني', 'Online payment'),
  },

  failed: {
    title: p('لم تتم عملية الدفع', 'Payment not completed'),
    subtitle: p(
      'لم يُخصم من حسابك أي مبلغ. يمكنك إعادة المحاولة الآن أو اختيار وسيلة سداد أخرى.',
      'No money has been taken from your account. You can try again now or choose another payment method.',
    ),
    retry: p('إعادة المحاولة', 'Try again'),
    changeMethod: p('تغيير وسيلة السداد', 'Change payment method'),
  },

  issued: {
    title: p('تم إصدار وثيقتك!\u00A0🎉', 'Your policy is issued!\u00A0🎉'),
    subtitle: p(
      'أسرتك في حماية اعتباراً من اليوم — وثيقتك سارية ومحفوظة في التطبيق.',
      'Your family is protected from today — your policy is active and saved in the app.',
    ),
    download: p('تحميل الوثيقة PDF', 'Download policy PDF'),
    downloadTitle: p('تحميل الوثيقة', 'Download policy'),
    downloadBody: p(
      'سيتم تحميل نسخة PDF من وثيقتك.',
      'A PDF copy of your policy will be downloaded.',
    ),
    share: p('أرسلها لمن يهمّك', 'Share with someone close'),

    shareBody: p(
      'تم إصدار وثيقة تأمين ثروة حياة الخاصة بي. رقم الوثيقة:',
      'My Sarwa Life insurance policy has been issued. Policy number:',
    ),
    home: p('العودة للرئيسية', 'Back to home'),
  },
} as const;
