import { ImageSourcePropType } from 'react-native';
import { Phrase, S } from '../../shared/i18n';

export type Chip = { text: Phrase; top: number; left?: number; right?: number };

export type Slide = {
  art: ImageSourcePropType;
  artWidth: number;
  artHeight: number;
  chips: Chip[];
  headline: Phrase;
  subtitle: Phrase;
  cta: Phrase;
};

export const LOGO: ImageSourcePropType = require('../../assets/logo.png');

export const SLIDES: Slide[] = [
  {
    art: require('../../assets/onboarding/ob1.png'),
    artWidth: 372,
    artHeight: 298,
    chips: [
      { text: S.onboarding.s1.chip, top: -28, right: 0 },
      { text: S.onboarding.noPaper, top: 240, left: 48 },
    ],
    headline: S.onboarding.s1.headline,
    subtitle: S.onboarding.s1.subtitle,
    cta: S.common.next,
  },
  {
    art: require('../../assets/onboarding/ob2.png'),
    artWidth: 384,
    artHeight: 351,
    chips: [
      { text: S.onboarding.s2.chip, top: 85, right: 6 },
      { text: S.onboarding.noPaper, top: 353, left: 54 },
    ],
    headline: S.onboarding.s2.headline,
    subtitle: S.onboarding.s2.subtitle,
    cta: S.common.next,
  },
  {
    art: require('../../assets/onboarding/ob3.png'),
    artWidth: 371,
    artHeight: 344,
    chips: [{ text: S.onboarding.s3.chip, top: 162, right: 18.75 }],
    headline: S.onboarding.s3.headline,
    subtitle: S.onboarding.s3.subtitle,
    cta: S.onboarding.start,
  },
];
