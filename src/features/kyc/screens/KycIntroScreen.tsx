import React from 'react';
import { Screen, ScreenHeader } from '../../../shared/components';
import { colors } from '../../../shared/theme';
import { S, useI18n } from '../../../shared/i18n';
import { IntroContent, IntroFooter, StepperBar } from '../components';
import { useKycIntro } from '../hooks/useKycIntro';

export function KycIntroScreen(props: any) {
  const { t } = useI18n();
  const { onBack, onStart } = useKycIntro(props);

  return (
    <Screen background={colors.bg}>
      <ScreenHeader title={t(S.kyc.title)} onBack={onBack} />
      <StepperBar current={1} />
      <IntroContent />
      <IntroFooter onStart={onStart} />
    </Screen>
  );
}
