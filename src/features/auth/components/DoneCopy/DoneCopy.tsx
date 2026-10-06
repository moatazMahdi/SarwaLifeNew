import React from 'react';
import { AppText, Box } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { SuccessBadge } from '../SuccessBadge/SuccessBadge';
import { styles } from './DoneCopy.styles';

export function DoneCopy() {
  const { t } = useI18n();
  return (
    <Box style={styles.body}>
      <SuccessBadge />
      <Box style={styles.titleBlock}>
        <AppText style={styles.title}>{t(S.auth.signupDone.title)}</AppText>
        <AppText style={styles.subtitle}>{t(S.auth.signupDone.subtitle)}</AppText>
      </Box>
    </Box>
  );
}
