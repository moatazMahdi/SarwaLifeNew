import type { TextStyle } from 'react-native';

export const fontFamily = {
  regular: 'IBMPlexSansArabic-Regular',
  medium: 'IBMPlexSansArabic-Medium',
  semiBold: 'IBMPlexSansArabic-SemiBold',
  bold: 'IBMPlexSansArabic-Bold',
  extraBold: 'IBMPlexSansArabic-Bold',
  black: 'IBMPlexSansArabic-Bold',
} as const;

const fontWeight: Record<keyof typeof fontFamily, TextStyle['fontWeight']> = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '700',
  black: '700',
};

const face = (k: keyof typeof fontFamily) => ({
  fontFamily: fontFamily[k],
  fontWeight: fontWeight[k],
});

export const typography = {
  headline: { ...face('black'), fontSize: 26, lineHeight: 39 },
  greeting: { ...face('black'), fontSize: 20, lineHeight: 30 },
  screenTitle: { ...face('black'), fontSize: 19, lineHeight: 28.5 },
  headerTitle: { ...face('black'), fontSize: 18, lineHeight: 27 },
  sectionTitle: { ...face('black'), fontSize: 17, lineHeight: 25.5, letterSpacing: -0.2 },

  obHeadline: { ...face('bold'), fontSize: 36, lineHeight: 58, letterSpacing: -1.08 },
  obSubtitle: { ...face('medium'), fontSize: 14, lineHeight: 28 },
  obSkip: { ...face('bold'), fontSize: 13, lineHeight: 19.5 },

  homeGreeting: { ...face('semiBold'), fontSize: 28, lineHeight: 38, letterSpacing: -0.84 },
  homeTagline: { ...face('semiBold'), fontSize: 20, lineHeight: 34, letterSpacing: -0.8 },
  buttonLabel: { ...face('extraBold'), fontSize: 17, lineHeight: 25.5 },

  productTitle: { ...face('bold'), fontSize: 22, lineHeight: 28.6, letterSpacing: -0.4 },
  productIntro: { ...face('semiBold'), fontSize: 14, lineHeight: 24.5 },
  perkText: { ...face('semiBold'), fontSize: 13, lineHeight: 20.8 },
  btnLabelSm: { ...face('extraBold'), fontSize: 14, lineHeight: 21 },

  pageTitle: { ...face('semiBold'), fontSize: 18, lineHeight: 32, letterSpacing: -0.54 },
  stepNum: { ...face('extraBold'), fontSize: 14, lineHeight: 21 },
  stepCaption: { ...face('bold'), fontSize: 10.5, lineHeight: 15.75 },
  inputLabel: { ...face('bold'), fontSize: 16, lineHeight: 20, letterSpacing: -0.4 },
  inputValue: { ...face('medium'), fontSize: 15, lineHeight: 22.5, letterSpacing: -0.5 },
  ageNumber: { ...face('medium'), fontSize: 36, lineHeight: 44 },
  ageCaption: { ...face('medium'), fontSize: 16, lineHeight: 20 },
  choiceOn: { ...face('bold'), fontSize: 16, lineHeight: 24, letterSpacing: -0.5 },
  choiceOff: { ...face('medium'), fontSize: 16, lineHeight: 24, letterSpacing: -0.5 },

  quoteHeading: { ...face('bold'), fontSize: 19, lineHeight: 27, letterSpacing: -0.55 },

  sliderValue: { ...face('extraBold'), fontSize: 34, lineHeight: 40, letterSpacing: -0.8 },
  sliderUnit: { ...face('regular'), fontSize: 12, lineHeight: 40 },
  sliderBound: { ...face('medium'), fontSize: 12, lineHeight: 16 },
  optTitle: { ...face('bold'), fontSize: 16, lineHeight: 20.25 },
  optSubtitle: { ...face('semiBold'), fontSize: 14, lineHeight: 17.25 },
  optLabel: { ...face('bold'), fontSize: 12.5, lineHeight: 19.58, letterSpacing: -0.2 },
  countLabel: { ...face('medium'), fontSize: 11.5, lineHeight: 17.25 },
  countValue: { ...face('bold'), fontSize: 14, lineHeight: 21 },
  countGlyph: { ...face('bold'), fontSize: 16, lineHeight: 24 },
  premiumCaption: { ...face('semiBold'), fontSize: 12, lineHeight: 21 },
  premiumAmount: { ...face('extraBold'), fontSize: 39, lineHeight: 40, letterSpacing: -1 },
  premiumUnit: { ...face('regular'), fontSize: 12, lineHeight: 40 },
  chipLabel: { ...face('bold'), fontSize: 11.5, lineHeight: 17.25 },
  rowAmount: { ...face('bold'), fontSize: 14, lineHeight: 21 },
  rowLabel: { ...face('bold'), fontSize: 12, lineHeight: 18 },

  totalText: { ...face('bold'), fontSize: 17.5, lineHeight: 25, letterSpacing: -0.3 },
  btnLabelMd: { ...face('extraBold'), fontSize: 15, lineHeight: 22.5 },

  authTitle: { ...face('bold'), fontSize: 25, lineHeight: 33.75, letterSpacing: -0.4 },

  authOption: { ...face('bold'), fontSize: 18, lineHeight: 27, letterSpacing: -0.2 },
  authLink: { ...face('bold'), fontSize: 16, lineHeight: 21 },
  authResend: { ...face('bold'), fontSize: 14.5, lineHeight: 21.75 },
  authResendMuted: { ...face('semiBold'), fontSize: 14.5, lineHeight: 21.75 },
  authAmount: { ...face('bold'), fontSize: 20, lineHeight: 22.5 },
  authPhone: { ...face('bold'), fontSize: 19, lineHeight: 26.6, letterSpacing: 1 },
  authCode: { ...face('bold'), fontSize: 15, lineHeight: 22.5 },
  authOtpDigit: { ...face('bold'), fontSize: 24, lineHeight: 34 },
  cardTitle: { ...face('black'), fontSize: 14.5, lineHeight: 19.58, letterSpacing: -0.2 },
  fieldLabel: { ...face('extraBold'), fontSize: 13.5, lineHeight: 20.25 },
  subtitle: { ...face('semiBold'), fontSize: 13.5, lineHeight: 20.25 },
  helperText: { ...face('medium'), fontSize: 13, lineHeight: 21.45 },
  introText: { ...face('medium'), fontSize: 14.5, lineHeight: 23.93 },
  footerNote: { ...face('medium'), fontSize: 12, lineHeight: 20.4 },
  footerLink: { ...face('extraBold'), fontSize: 12, lineHeight: 20.4 },
  bodyText: { ...face('semiBold'), fontSize: 12.5, lineHeight: 19.38 },
  linkText: { ...face('extraBold'), fontSize: 12.5, lineHeight: 19.38 },
  cardBody: { ...face('medium'), fontSize: 11.5, lineHeight: 17.25 },
  badgeLabel: { ...face('extraBold'), fontSize: 11.5, lineHeight: 17.25 },
  stepLabel: { ...face('bold'), fontSize: 10, lineHeight: 15 },
  codeInput: { ...face('bold'), fontSize: 16, lineHeight: 22.4, letterSpacing: 2 },
} as const;
