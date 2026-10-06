import React from 'react';
import { AppText, Box } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './LegalNote.styles';

export function LegalNote() {
  const { t } = useI18n();
  return (
    <Box style={styles.note}>
      <AppText style={styles.text}>{t(S.legal.note)}</AppText>
    </Box>
  );
}
