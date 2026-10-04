import type { Phrase } from '../lang';

/** Arabic first, English second. Arabic stays byte-identical to the Figma copy. */
const p = (ar: string, en: string): Phrase => [ar, en];

/**
 * Identity verification: the national-ID capture, the extraction wait, the data review, the
 * liveness selfie and the two refusal screens.
 *
 * The Arabic here is deliberately colloquial — "بنقرأ بطاقتك", "خلّيك معانا ثوانٍ" — so the
 * English is kept plain and reassuring rather than legalistic. The one place it does turn
 * formal is the regulator note on the intro and the consent block on the review, because
 * those two are quoting rules rather than talking to the user.
 */
export const kyc = {
  /** The band above every account-creation step. */
  signupTitle: p('إنشاء حساب', 'Create account'),

  /**
   * The four beads of the account-creation stepper, and the first three of them again in the
   * intro screen's header. Held in one place so the two never drift apart.
   *
   * Kept to a single short word each: the bead column is 52px wide, so "Verification" would
   * wrap to two lines under a 30px circle.
   */
  steps: {
    identity: p('الهوية', 'Identity'),
    details: p('بياناتك', 'Details'),
    verify: p('التحقق', 'Verify'),
    security: p('الأمان', 'Security'),
  },

  /** The dashed drop zone for one side of the card. */
  slot: {
    hint: p('اضغط للتصوير', 'Tap to take a photo'),
    /** Screen-reader only — the slot shows a preview rather than a label once it is filled. */
    retake: p('أعد التصوير', 'Retake'),
  },

  /** Shared between the capture screen's heading and the intro screen's header. */
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

  /** The wait while the card is read. `BrandLoader` takes plain strings, so these are `t()`d by the screen. */
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
    /**
     * The consent sentence is assembled from four pieces because two of them are tappable.
     * English needs its articles on the connectors ("to the" / "and the") so the links stay
     * the bare document names in both languages.
     */
    consentPrefix: p('أوافق على', 'I agree to the'),
    terms: p('الشروط والأحكام', 'Terms & Conditions'),
    consentAnd: p('و', 'and the'),
    privacy: p('سياسة الخصوصية', 'Privacy Policy'),
    /**
     * Three spelling corrections against the Figma copy, which the rest of this file is
     * kept byte-identical to. They are made here rather than left alone because this is the
     * sentence the user is consenting to, and a misspelling in it reads as carelessness
     * about the thing it is asking permission for:
     *   • "استخدمام" → "استخدام" — a plain typo, not a variant.
     *   • "علي" → "على" — the same sentence already writes "أوافق على" correctly one line up.
     *   • "وفقا" → "وفقاً" — the intro screen's regulator note sets it with the tanween.
     * Worth confirming back into the design file so the two stop disagreeing.
     */
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
    /** The gold pill is 227px wide and carries a 20px camera glyph; this is about its limit. */
    cta: p('ابدأ التحقق', 'Start verification'),
  },

  /**
   * Shared by the app's two in-app cameras — the card and the selfie. They are the same
   * machine wearing two different windows, and a user who is refused the camera on one of
   * them should not be told about it in different words on the other.
   */
  camera: {
    starting: p('جارٍ تشغيل الكاميرا…', 'Starting the camera…'),
    needPermission: p('نحتاج إذن الكاميرا لمتابعة التحقق', 'We need camera access to carry on'),
    /**
     * Shown only once the permission has actually been refused. Android stops presenting its
     * own dialogue after the second refusal, so from that point `requestPermission()` resolves
     * denied with nothing appearing on screen at all — leaving the user watching a spinner
     * that will never finish, above a dead shutter, in the middle of a step they cannot skip.
     * The only way back in is Settings, and nothing but this line tells them so.
     */
    deniedHint: p(
      'تم رفض الإذن. افتح إعدادات التطبيق وفعّل الكاميرا، ثم ارجع لإكمال التحقق.',
      'Permission was refused. Turn the camera on in the app settings, then come back to finish.',
    ),
    openSettings: p('فتح الإعدادات', 'Open settings'),
    retake: p('إعادة التصوير', 'Retake'),
    /** Screen-reader only — the shutter is a bare disc. */
    shutter: p('التقاط صورة', 'Take photo'),
  },

  face: {
    headTitle: p('تصوير الوجهة', 'Take a selfie'),
    hint: p('اضغط لتصوير صورة شخصية', 'Tap to take a selfie'),
    check: p('تأكد أن وجهك واضح — ثم أكّد الصورة', 'Make sure your face is clear, then confirm'),
  },

  /**
   * The card camera. Its two titles are the same two the slots on the capture screen carry,
   * so the user lands on a screen that names the side they just tapped.
   *
   * The hint names the frame because there now is one: the intro screen has always promised
   * "داخل الإطار الظاهر على الشاشة", and until this camera existed the shot was handed to the
   * phone's own camera app, which draws no frame at all.
   */
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

  /**
   * The refusal screen, which reads differently depending on which half of the check went
   * wrong. The reasons carry the weight: "verification failed" on its own sends someone back
   * to re-shoot the photograph that just failed, so both lists name the thing to change.
   */
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
