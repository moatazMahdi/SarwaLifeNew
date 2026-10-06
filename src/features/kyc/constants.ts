import { ImageSourcePropType } from 'react-native';
import { Phrase, S } from '../../shared/i18n';

export type Side = 'front' | 'back';
export type KycStage = 'id' | 'liveness';

export const LOGO: ImageSourcePropType = require('../../assets/logo.png');

export const SIGNUP_STEPS: Phrase[] = [
  S.kyc.steps.identity,
  S.kyc.steps.details,
  S.kyc.steps.verify,
  S.kyc.steps.security,
];

export const STEP_BEAD = 30;
export const STEP_LINE = 2;

export const SLOT = { height: 150, radius: 18 };

export const SCRIM = 'rgba(0,8,20,0.6)';

export const ID_CARD = {
  ratio: 85.6 / 53.98,
  inset: 26,
  maxWidth: 460,
  centerY: 0.42,
  radius: 18,
};

export const FACE_OVAL = {
  width: 263 / 375,
  height: 374 / 812,
  centerY: 363 / 812,
};

export const FAILED_COPY: Record<
  KycStage,
  { title: Phrase; subtitle: Phrase; reasons: readonly Phrase[]; cta: Phrase; route: string }
> = {
  id: { ...S.kyc.failed.id, route: 'KycCapture' },
  liveness: { ...S.kyc.failed.liveness, route: 'LivenessIntro' },
};
