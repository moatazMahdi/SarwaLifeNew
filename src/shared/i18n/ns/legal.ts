import type { Phrase } from '../lang';

const p = (ar: string, en: string): Phrase => [ar, en];

export type LegalSection = { title: Phrase; body: readonly Phrase[] };

const terms = {
  title: p('الشروط والأحكام', 'Terms and Conditions'),
  intro: p(
    'تحكم هذه الشروط العلاقة بينك وبين شركة ثروة لتأمينات الحياة فيما يخص إصدار وثائق التأمين عبر التطبيق.',
    'These terms govern the relationship between you and Sarwa Life Insurance Company in respect of the issuance of insurance policies through the app.',
  ),

  s1: {
    title: p('التعريفات', 'Definitions'),
    body: [
      p(
        '«الشركة» تعني شركة ثروة لتأمينات الحياة، المسجّلة لدى الهيئة العامة للرقابة المالية.',
        '“The Company” means Sarwa Life Insurance Company, registered with the Financial Regulatory Authority.',
      ),
      p(
        '«الوثيقة» تعني عقد التأمين المُبرم بين الشركة وحامل الوثيقة، وما يلحق به من ملاحق.',
        '“The Policy” means the contract of insurance concluded between the Company and the policyholder, together with any endorsements appended to it.',
      ),
      p(
        '«القسط» هو المبلغ الذي يلتزم حامل الوثيقة بسداده في مواعيد الاستحقاق المتّفق عليها.',
        '“The Premium” means the amount the policyholder undertakes to pay on the agreed due dates.',
      ),
    ],
  },

  s2: {
    title: p('سريان التغطية', 'Effectiveness of the Cover'),
    body: [
      p(
        'تبدأ التغطية التأمينية من تاريخ سداد القسط الأول وقبول الشركة للطلب كتابةً أو إلكترونياً.',
        'The insurance cover begins on the date the first premium is paid and the Company accepts the application in writing or electronically.',
      ),
      p(
        'تسري فترة انتظار مدّتها ٩٠ يوماً على تغطيات الأمراض الحرجة والسرطان من تاريخ بدء السريان.',
        'A waiting period of 90 days applies to the critical illness and cancer covers from the date the cover takes effect.',
      ),
      p(
        'تظل الوثيقة سارية طالما تمّ سداد الأقساط في مواعيدها، مع فترة سماح ٣٠ يوماً لكل قسط.',
        'The policy remains in force for as long as the premiums are paid when due, with a grace period of 30 days for each premium.',
      ),
    ],
  },

  s3: {
    title: p('التزامات حامل الوثيقة', 'Obligations of the Policyholder'),
    body: [
      p(
        'الإفصاح الكامل والصحيح عن كل البيانات الصحّية والشخصية المطلوبة عند التقديم.',
        'Full and accurate disclosure of all the health and personal data required at the time of application.',
      ),
      p(
        'إخطار الشركة بأي تغيير في بيانات التواصل أو المستفيدين خلال ٣٠ يوماً من حدوثه.',
        'Notifying the Company of any change to the contact details or the beneficiaries within 30 days of its occurrence.',
      ),
      p(
        'سداد الأقساط في مواعيد استحقاقها بالطريقة المتّفق عليها.',
        'Payment of the premiums on their due dates by the agreed method.',
      ),
    ],
  },

  s4: {
    title: p('الاستثناءات العامة', 'General Exclusions'),
    body: [
      p(
        'الانتحار خلال الاثني عشر شهراً الأولى من تاريخ سريان الوثيقة.',
        'Suicide within the first twelve months from the date the policy takes effect.',
      ),
      p(
        'الحالات الناتجة عن تعاطي المخدرات أو الكحول أو الأنشطة غير المشروعة.',
        'Cases resulting from the use of narcotics or alcohol, or from unlawful activities.',
      ),
      p(
        'الحالات المرضية السابقة غير المُفصح عنها عند التقديم.',
        'Pre-existing medical conditions not disclosed at the time of application.',
      ),
      p(
        'الحروب والاضطرابات الأهلية والمخاطر النووية.',
        'War, civil disturbance and nuclear risks.',
      ),
    ],
  },

  s5: {
    title: p('المطالبات', 'Claims'),
    body: [
      p(
        'تُقدَّم المطالبة خلال ٣٠ يوماً من تاريخ وقوع الحدث المؤمَّن ضدّه.',
        'The claim shall be submitted within 30 days of the date on which the insured event occurs.',
      ),
      p(
        'تلتزم الشركة بالبتّ في المطالبة خلال ١٥ يوم عمل من استلام المستندات كاملة.',
        'The Company undertakes to decide upon the claim within 15 working days of receiving the complete documents.',
      ),
      p(
        'يُصرف مبلغ الحماية التأمينية للمستفيدين المحدّدين بالوثيقة أو للورثة الشرعيين.',
        'The insurance benefit amount is paid to the beneficiaries named in the policy or to the legal heirs.',
      ),
    ],
  },

  s6: {
    title: p('الإلغاء والاسترداد', 'Cancellation and Refund'),
    body: [
      p(
        'يحق لحامل الوثيقة إلغاؤها خلال ٢١ يوماً من الإصدار واسترداد القسط المدفوع كاملاً.',
        'The policyholder has the right to cancel the policy within 21 days of issuance and to recover the premium paid in full.',
      ),
      p(
        'بعد هذه المدّة يُطبَّق جدول قيم الاسترداد المرفق بالوثيقة، إن وُجد.',
        'After that period, the table of surrender values attached to the policy applies, if any.',
      ),
    ],
  },
} as const;

const privacy = {
  title: p('سياسة الخصوصية', 'Privacy Policy'),
  intro: p(
    'توضّح هذه السياسة كيف نجمع بياناتك ونستخدمها ونحميها عند استخدامك تطبيق ثروة حياة.',
    'This policy explains how we collect, use and protect your data when you use the Sarwa Life app.',
  ),

  s1: {
    title: p('البيانات التي نجمعها', 'The Data We Collect'),
    body: [
      p(
        'بيانات الهوية: الاسم، الرقم القومي، تاريخ الميلاد، العنوان، وصور بطاقة الرقم القومي.',
        'Identity data: name, national ID number, date of birth, address, and images of the national ID card.',
      ),
      p(
        'بيانات التواصل: رقم الهاتف المحمول والبريد الإلكتروني.',
        'Contact data: mobile telephone number and email address.',
      ),
      p(
        'البيانات الصحّية التي تُفصح عنها ضمن الإفصاح الطبي.',
        'The health data you disclose as part of the medical disclosure.',
      ),
      p(
        'الصورة الشخصية المُلتقَطة أثناء التحقق من الهوية (Liveness Check).',
        'The personal photograph captured during identity verification (Liveness Check).',
      ),
    ],
  },

  s2: {
    title: p('الغرض من المعالجة', 'Purpose of the Processing'),
    body: [
      p(
        'التحقق من هويتك استيفاءً لمتطلبات الهيئة العامة للرقابة المالية وقواعد «اعرف عميلك».',
        'Verifying your identity in fulfilment of the requirements of the Financial Regulatory Authority and the “Know Your Customer” rules.',
      ),
      p(
        'تسعير وإصدار وثيقتك وإدارة المطالبات والمدفوعات المرتبطة بها.',
        'Pricing and issuing your policy, and administering the claims and payments related to it.',
      ),
      p(
        'التواصل معك بخصوص وثيقتك والتذكير بمواعيد السداد.',
        'Contacting you regarding your policy and reminding you of the payment dates.',
      ),
    ],
  },

  s3: {
    title: p('حماية البيانات', 'Protection of the Data'),
    body: [
      p(
        'تُخزَّن بياناتك وصور مستنداتك مشفّرة على خوادم آمنة داخل جمهورية مصر العربية.',
        'Your data and the images of your documents are stored in encrypted form on secure servers inside the Arab Republic of Egypt.',
      ),
      p(
        'الوصول للبيانات مقصور على الموظفين المخوَّلين وبحسب الحاجة لأداء العمل فقط.',
        'Access to the data is confined to authorised employees, and only as needed to carry out the work.',
      ),
      p(
        'لا نبيع بياناتك أو نشاركها لأغراض تسويقية مع أطراف ثالثة.',
        'We do not sell your data or share it with third parties for marketing purposes.',
      ),
    ],
  },

  s4: {
    title: p('مشاركة البيانات', 'Sharing of the Data'),
    body: [
      p(
        'الجهات الرقابية عند الطلب القانوني، ومنها الهيئة العامة للرقابة المالية.',
        'The supervisory authorities upon lawful request, among them the Financial Regulatory Authority.',
      ),
      p(
        'شركات إعادة التأمين ومقدّمي الخدمات الطبية بالقدر اللازم لتنفيذ الوثيقة.',
        'Reinsurance companies and medical service providers, to the extent necessary to perform the policy.',
      ),
      p(
        'بوّابات الدفع الإلكتروني لإتمام عمليات السداد فقط.',
        'Electronic payment gateways, for the completion of payment transactions only.',
      ),
    ],
  },

  s5: {
    title: p('مدّة الاحتفاظ', 'Retention Period'),
    body: [
      p(
        'نحتفظ ببياناتك طوال سريان الوثيقة ولمدّة عشر سنوات بعد انتهائها، وفقاً للمتطلبات القانونية.',
        'We retain your data throughout the term of the policy and for ten years after it ends, in accordance with the legal requirements.',
      ),
    ],
  },

  s6: {
    title: p('حقوقك', 'Your Rights'),
    body: [
      p(
        'الاطّلاع على بياناتك وطلب تصحيحها أو تحديثها.',
        'To access your data and to request its correction or updating.',
      ),
      p(
        'سحب موافقتك على معالجة بياناتك — مع العلم بأن ذلك قد يؤثر على استمرار وثيقتك.',
        'To withdraw your consent to the processing of your data — noting that this may affect the continuation of your policy.',
      ),
      p(
        'تقديم شكوى إلى الشركة أو إلى الهيئة العامة للرقابة المالية.',
        'To lodge a complaint with the Company or with the Financial Regulatory Authority.',
      ),
    ],
  },
} as const;

export const legal = {
  updated: p('آخر تحديث: يناير ٢٠٢٦', 'Last updated: January 2026'),

  note: p(
    'الشركة مسجّلة بالهيئة العامة للرقابة المالية. في حال التعارض بين هذا الملخّص ونص الوثيقة المُصدَرة، يُعتدّ بنص الوثيقة.',
    'The Company is registered with the Financial Regulatory Authority. In the event of a conflict between this summary and the text of the issued policy, the text of the policy shall prevail.',
  ),
  terms,
  privacy,
} as const;
