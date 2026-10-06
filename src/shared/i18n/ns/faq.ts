import type { Phrase } from '../lang';

const p = (ar: string, en: string): Phrase => [ar, en];

export const faq = {
  title: p('الأسئلة الشائعة', 'Frequently asked questions'),

  intro: p(
    'إجابات لأكثر الأسئلة تكراراً حول برامج ثروة وخدماتها.',
    'Answers to the questions we are asked most often about Sarwa’s plans and services.',
  ),

  guest: p('زائر', 'Guest'),

  items: [
    {
      q: p('كيف أُصدر وثيقتي من التطبيق؟', 'How do I issue my policy from the app?'),
      a: p(
        'اختر البرنامج من الشاشة الرئيسية واحسب القسط، ثم أنشئ حسابك ووثّق هويتك ببطاقة الرقم القومي وصورة حيّة. بعدها تستكمل بيانات المستفيدين والإفصاح الطبي وتسدّد القسط الأول، فتُصدر الوثيقة ويظهر رقمها في التطبيق.',
        'Pick a plan on the home screen and calculate the premium, then create your account and verify your identity with your national ID card and a live photo. After that you complete the beneficiary details and the medical disclosure and pay the first premium, and the policy is issued with its number shown in the app.',
      ),
    },
    {
      q: p('متى تبدأ التغطية؟', 'When does the cover start?'),
      a: p(
        'تبدأ التغطية من تاريخ سداد القسط الأول وقبول الشركة للطلب. وتسري فترة انتظار مدّتها ٩٠ يوماً على تغطيات الأمراض الحرجة والسرطان من تاريخ بدء السريان.',
        'The cover begins on the date the first premium is paid and the Company accepts the application. A waiting period of 90 days applies to the critical illness and cancer covers from the date the cover takes effect.',
      ),
    },
    {
      q: p('كيف أسدّد القسط؟', 'How do I pay the premium?'),
      a: p(
        'يمكنك السداد داخل التطبيق عبر فوري أو ببطاقة ائتمان أو بمحفظة إلكترونية. وتظل الوثيقة سارية طالما سُدّدت الأقساط في مواعيدها، مع فترة سماح ٣٠ يوماً لكل قسط.',
        'You can pay inside the app through Fawry, by credit card, or with a mobile wallet. The policy remains in force for as long as the premiums are paid when due, with a grace period of 30 days for each premium.',
      ),
    },
    {
      q: p('كيف أقدّم مطالبة؟', 'How do I make a claim?'),
      a: p(
        'تُقدَّم المطالبة خلال ٣٠ يوماً من تاريخ وقوع الحدث المؤمَّن ضدّه، وتلتزم الشركة بالبتّ فيها خلال ١٥ يوم عمل من استلام المستندات كاملة. ويُصرف مبلغ الحماية التأمينية للمستفيدين المحدّدين بالوثيقة أو للورثة الشرعيين.',
        'The claim is submitted within 30 days of the date on which the insured event occurs, and the Company undertakes to decide upon it within 15 working days of receiving the complete documents. The insurance benefit amount is paid to the beneficiaries named in the policy or to the legal heirs.',
      ),
    },
    {
      q: p(
        'من هم المستفيدون الذين يمكنني اختيارهم؟',
        'Which beneficiaries can I choose?',
      ),
      a: p(
        'المستفيد محدّد بحسب البرنامج الذي تختاره، ويُوزّع مبلغ التأمين على الورثة الشرعيين وفقاً للقانون المصري. وعليك إخطار الشركة بأي تغيير في بيانات المستفيدين خلال ٣٠ يوماً من حدوثه.',
        'The beneficiary is set by the plan you choose, and the sum insured is distributed among the legal heirs in accordance with Egyptian law. You must notify the Company of any change to the beneficiary details within 30 days of its occurrence.',
      ),
    },
    {
      q: p('هل ثروة حياة مرخّصة؟', 'Is Sarwa Life licensed?'),
      a: p(
        'نعم. شركة ثروة لتأمينات الحياة مسجّلة لدى الهيئة العامة للرقابة المالية وتخضع لإشرافها. وتجد تفاصيل العلاقة التعاقدية كاملةً في الشروط والأحكام داخل التطبيق.',
        'Yes. Sarwa Life Insurance Company is registered with the Financial Regulatory Authority and is subject to its supervision. You will find the full details of the contractual relationship in the Terms and Conditions inside the app.',
      ),
    },
  ],

  noAnswer: p('لم تجد إجابة لسؤالك؟', 'Didn’t find your answer?'),
  callMe: p('اطلب مستشاراً يتصل بك', 'Request an adviser to call you'),

  a11yExpand: p('عرض الإجابة', 'Show the answer'),
  a11yCollapse: p('إخفاء الإجابة', 'Hide the answer'),
} as const;
