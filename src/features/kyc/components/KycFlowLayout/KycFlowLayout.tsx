import React from 'react';
import { AuthTopBar, SafeArea } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { StepperBar } from '../StepperBar/StepperBar';
import { styles } from './KycFlowLayout.styles';

type Props = { step: number; onBack: () => void; children: React.ReactNode };

export function KycFlowLayout({ step, onBack, children }: Props) {
  const { t } = useI18n();
  return (
    <SafeArea style={styles.screen} edges={['top', 'bottom']}>
      <AuthTopBar title={t(S.kyc.signupTitle)} onBack={onBack} />
      <StepperBar current={step} />
      {children}
    </SafeArea>
  );
}
