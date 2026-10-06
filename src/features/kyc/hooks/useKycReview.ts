import { useState } from 'react';
import { DEMO_PROFILE, useFlow } from '../../../shared/state/FlowContext';
import { Phrase, S, useI18n } from '../../../shared/i18n';

export function useKycReview({ navigation, route }: any) {
  const { t, n } = useI18n();
  const params = route?.params ?? {};
  const { profile } = useFlow();
  const [agreed, setAgreed] = useState(false);
  const p = profile ?? DEMO_PROFILE;

  const rows: [label: Phrase, value: string][] = [
    [S.kyc.review.fullName, p.fullName],
    [S.kyc.review.nationalId, p.nationalId],
    [S.kyc.review.governorate, p.governorate],
    [S.kyc.review.city, p.city],
    [S.kyc.review.age, `${n(p.age)} ${t(S.checkout.personal.years)}`],
    [S.kyc.review.maritalStatus, p.maritalStatus],
  ];

  return {
    rows,
    agreed,
    toggleAgreed: () => setAgreed((v) => !v),
    onBack: () => navigation?.goBack(),
    onNext: () => navigation?.navigate('LivenessIntro', params),
    openTerms: () => navigation?.navigate('Terms'),
    openPrivacy: () => navigation?.navigate('Privacy'),
  };
}
