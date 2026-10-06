import React from 'react';
import { AppText, Box } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { GatePremium } from '../GatePremium/GatePremium';
import { styles } from './GateIntro.styles';

export function GateIntro({ yearly }: { yearly: number }) {
  const { t } = useI18n();
  return (
    <Box style={styles.intro}>
      {yearly > 0 ? <GatePremium yearly={yearly} /> : null}
      <Box style={styles.titleBlock}>
        <AppText style={styles.title}>{t(S.auth.gate.title)}</AppText>
        <AppText style={styles.subtitle}>{t(S.auth.gate.subtitle)}</AppText>
      </Box>
    </Box>
  );
}
