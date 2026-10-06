import type { Phrase } from '../lang';

const p = (ar: string, en: string): Phrase => [ar, en];

export const kyc = {
  signupTitle: p('إنشاء حساب', 'Create account'),

  steps: {
    identity: p('الهوية', 'Identity'),
    details: p('بياناتك', 'Details'),
    verify: p('التحقق', 'Verify'),
    security: p('الأمان', 'Security'),
  },

  slot: {
    hint: p('اضغط للتصوير', 'Tap to take a photo'),

    retake: p('أعد التصوير', 'Retake'),
  },

  title: p('توثيق الهوية', 'Identity verification'),

  intro: {
    headline: p('قبل ما تبدأ التصوير', 'Before you start'),
    subtitle: p(
      'هنحتاج صورة واضحة لوش بطاقة الرقم القومي وظهرها — اتّبع الإرشادات دي عشان التصوير ينجح من أول مرّة.',
      'We need a clear photo of the front and the back of your national ID. Follow these tips and it should work first time.',
    ),
    dosTitle: p('إرشادات التصوير', 'Photo tips'),
    dos: [
      p('امسك البطاقة بثبات داخل الإطار الظاهر على الشاشة.', 'Hold the card steady inside the frame on screen.'),
      p('تأكّد من وضوح الأرقام والصورة قبل الالتقاط.', 'Check the numbers and the photo are sharp before you shoot.'),
      p('صوّر في مكان جيد الإضاءة وبعيداً عن انعكاس الضوء.', 'Shoot somewhere well lit and away from glare.'),
      p('ضع البطاقة على سطح داكن غير لامع.', 'Rest the card on a dark, matt surface.'),
    ],
    dontsTitle: p('تجنّب', 'Avoid'),
    donts: [
      p('لا تستخدم صورة من المعرض أو صورة مطبوعة.', "Don't use a photo from your gallery or a printed copy."),
      p('لا تغطّ أي جزء من البطاقة بأصابعك.', "Don't cover any part of the card with your fingers."),
      p('تجنّب الصور المائلة أو غير الواضحة.', 'Avoid tilted or blurry shots.'),
    ],
    note: p(
      'تُستخدم صور بطاقتك لأغراض التوثيق فقط وتُحفظ مشفّرة، وفقاً لتعليمات الهيئة العامة للرقابة المالية.',
      "Photos of your card are used for verification only and are stored encrypted, in line with the Financial Regulatory Authority's rules.",
    ),
    cta: p('ابدأ التصوير', 'Take the photos'),
  },

  capture: {
    subtitle: p(
      'صوّر بطاقة الرقم القومي — سنستخرج بياناتك منها تلقائياً.',
      "Photograph your national ID — we'll read your details off it automatically.",
    ),
    front: p('وجه البطاقة', 'Front of card'),
    back: p('ظهر البطاقة', 'Back of card'),
  },

  processing: {
    headline: p('بنقرأ بطاقتك', 'Reading your card'),
    subtitle: p(
      'ثوانٍ قليلة ونستخرج بياناتك — من فضلك لا تغلق التطبيق.',
      "A few seconds and we'll have your details — please don't close the app.",
    ),
    steps: [
      p('بنرفع صور البطاقة', 'Uploading your card photos'),
      p('بنقرأ بيانات البطاقة', 'Reading the card details'),
      p('بنتأكد من صلاحية البطاقة', 'Checking the card is valid'),
    ],
  },

  review: {
    title: p('راجع بياناتك', 'Check your details'),
    subtitle: p(
      'استخرجناها من بطاقتك — يمكنك تعديلها قبل التأكيد.',
      'We read these off your card — you can change them before confirming.',
    ),
    fullName: p('الإسم بالكامل', 'Full name'),
    nationalId: p('الرقم القومي', 'National ID'),
    governorate: p('المحافظة', 'Governorate'),
    city: p('المدينة', 'City'),
    age: p('السن', 'Age'),
    maritalStatus: p('الحالة الاجتماعية', 'Marital status'),

    consentPrefix: p('أوافق على', 'I agree to the'),
    terms: p('الشروط والأحكام', 'Terms & Conditions'),
    consentAnd: p('و', 'and the'),
    privacy: p('سياسة الخصوصية', 'Privacy Policy'),

    consentUse: p(
      'وأوافق على استخدام بياناتي لأغراض التحقق من الهوية',
      'and I agree to my data being used for identity verification',
    ),
    consentAuthority: p('وفقاً لتعليمات الهيئة', "in line with the Authority's rules"),
  },

  liveness: {
    title: p('تأكيد هويتك', "Confirm it's you"),
    subtitle: p(
      'وجّه الكاميرا نحو وجهك — لمطابقتها بصورة بطاقتك.',
      'Point the camera at your face so we can match it to your ID photo.',
    ),

    cta: p('ابدأ التحقق', 'Start verification'),
  },

  camera: {
    starting: p('جارٍ تشغيل الكاميرا…', 'Starting the camera…'),
    needPermission: p('نحتاج إذن الكاميرا لمتابعة التحقق', 'We need camera access to carry on'),

    deniedHint: p(
      'تم رفض الإذن. افتح إعدادات التطبيق وفعّل الكاميرا، ثم ارجع لإكمال التحقق.',
      'Permission was refused. Turn the camera on in the app settings, then come back to finish.',
    ),
    openSettings: p('فتح الإعدادات', 'Open settings'),
    retake: p('إعادة التصوير', 'Retake'),

    shutter: p('التقاط صورة', 'Take photo'),
  },

  face: {
    headTitle: p('تصوير الوجهة', 'Take a selfie'),
    hint: p('اضغط لتصوير صورة شخصية', 'Tap to take a selfie'),
    check: p('تأكد أن وجهك واضح — ثم أكّد الصورة', 'Make sure your face is clear, then confirm'),
  },

  idCamera: {
    frontTitle: p('تصوير وجه البطاقة', 'Front of your ID'),
    backTitle: p('تصوير ظهر البطاقة', 'Back of your ID'),
    hint: p('ظبّط البطاقة جوه الإطار واضغط للتصوير', 'Line the card up inside the frame, then shoot'),
    check: p('تأكد إن الأرقام واضحة — ثم أكّد الصورة', 'Check the numbers are sharp, then confirm'),
  },

  verifying: {
    headline: p('بنتحقق من هويتك', 'Verifying your identity'),
    subtitle: p(
      'خلّيك معانا ثوانٍ — من فضلك لا تغلق التطبيق.',
      "Stay with us a few seconds — please don't close the app.",
    ),
    steps: [
      p('بنرفع صورتك', 'Uploading your selfie'),
      p('بنطابقها بصورة البطاقة', 'Matching it to your ID photo'),
      p('بنتأكد من بياناتك', 'Checking your details'),
    ],
  },

  failed: {
    reasonsTitle: p('الأسباب الشائعة', 'Common causes'),
    support: p('تواصل مع خدمة العملاء', 'Contact customer support'),
    id: {
      title: p('تعذّرت قراءة البطاقة', "We couldn't read your card"),
      subtitle: p(
        'الصورة لم تكن واضحة بما يكفي لاستخراج بياناتك. أعد التصوير وسنحاول مرة أخرى.',
        "The photo wasn't clear enough for us to read your details. Take it again and we'll have another go.",
      ),
      reasons: [
        p('انعكاس ضوء أو فلاش على سطح البطاقة', 'Glare or flash on the surface of the card'),
        p('الصورة غير واضحة أو مهتزّة', 'The photo is blurred or shaky'),
        p('أحد أركان البطاقة خارج الإطار', 'A corner of the card is outside the frame'),
        p('الإضاءة خافتة — صوّر في مكان أكثر إضاءة', 'The light is dim — try somewhere brighter'),
      ],
      cta: p('إعادة تصوير البطاقة', 'Retake the card photos'),
    },
    liveness: {
      title: p('تعذّر التحقق من هويتك', "We couldn't verify your identity"),
      subtitle: p(
        'لم نتمكّن من مطابقة صورتك بصورة البطاقة. أعد المحاولة مع مراعاة الملاحظات التالية.',
        "We couldn't match your selfie to the photo on your card. Try again, bearing the points below in mind.",
      ),
      reasons: [
        p('وجهك غير مكتمل داخل الإطار', "Your face isn't fully inside the frame"),
        p('الإضاءة خافتة أو من خلفك', 'The light is dim, or coming from behind you'),
        p('نظّارة شمس أو كمّامة أو غطاء يحجب الملامح', 'Sunglasses, a mask or a covering hiding your features'),
        p('تحرّكت أثناء التقاط الصورة', 'You moved while the photo was being taken'),
      ],
      cta: p('إعادة المحاولة', 'Try again'),
    },
  },
} as const;
