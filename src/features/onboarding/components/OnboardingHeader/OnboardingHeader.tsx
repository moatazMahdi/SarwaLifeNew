import React from 'react';
import { Button, Row } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './OnboardingHeader.styles';

type Props = { showSkip: boolean; onSkip: () => void };

export function OnboardingHeader({ showSkip, onSkip }: Props) {
  const { t } = useI18n();

  return (
    <Row style={styles.header}>
      {showSkip ? <Button variant="pill" label={t(S.onboarding.skip)} onPress={onSkip} /> : null}
    </Row>
  );
}
