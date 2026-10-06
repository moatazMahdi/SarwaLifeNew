import { I18nManager, ImageSourcePropType } from 'react-native';
import { Phrase, S } from '../../shared/i18n';

export const QUOTE_STEPS: Phrase[] = [
  S.quote.chrome.steps.data,
  S.quote.chrome.steps.cover,
  S.quote.chrome.steps.offer,
];

export const FOOTER_FADE = 20;

export const SLIDER = {
  track: 16,
  thumb: 28,
  touch: 48,
  halo: 28 + 18,
};

export const SWITCH = {
  width: 44,
  height: 26,
  knob: 20,
  pad: 3,
};

const KNOB_NEAR = SWITCH.pad;
const KNOB_FAR = SWITCH.width - SWITCH.knob - SWITCH.pad;

export const KNOB_OFF = I18nManager.isRTL ? KNOB_FAR : KNOB_NEAR;
export const KNOB_ON = I18nManager.isRTL ? KNOB_NEAR : KNOB_FAR;

export const SLIDER_MIRRORED = I18nManager.isRTL;

export const HERO_WATERMARK: ImageSourcePropType = require('../../assets/hero-watermark.png');
