import React from 'react';
import { AppText, Box } from '../../../../shared/components';
import { Phrase, useI18n } from '../../../../shared/i18n';
import { styles } from './SummaryBlock.styles';

export function SummaryBlock({ label, value }: { label: Phrase; value: string }) {
  const { t } = useI18n();
  return (
    <Box style={styles.block}>
      <AppText style={styles.label}>{t(label)}</AppText>
      <Box style={styles.body}>
        <AppText style={styles.value}>{value}</AppText>
      </Box>
    </Box>
  );
}
