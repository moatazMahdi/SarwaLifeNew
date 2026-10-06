import React from 'react';
import { S, useI18n } from '../../../shared/i18n';
import { KycLoader } from '../components';
import { useKycVerifying } from '../hooks/useKycCheck';

export function KycVerifyingScreen(props: any) {
  const { t } = useI18n();
  const onDone = useKycVerifying(props);

  return (
    <KycLoader
      headline={t(S.kyc.verifying.headline)}
      subtitle={t(S.kyc.verifying.subtitle)}
      steps={S.kyc.verifying.steps.map(t)}
      stepMs={2000}
      onDone={onDone}
    />
  );
}
