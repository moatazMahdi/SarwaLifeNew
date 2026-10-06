import React from 'react';
import { S, useI18n } from '../../../shared/i18n';
import { KycLoader } from '../components';
import { useKycProcessing } from '../hooks/useKycCheck';

export function KycProcessingScreen(props: any) {
  const { t } = useI18n();
  const onDone = useKycProcessing(props);

  return (
    <KycLoader
      headline={t(S.kyc.processing.headline)}
      subtitle={t(S.kyc.processing.subtitle)}
      steps={S.kyc.processing.steps.map(t)}
      onDone={onDone}
    />
  );
}
