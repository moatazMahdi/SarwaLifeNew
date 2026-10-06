import React from 'react';
import { AppText, Box } from '../../../../shared/components';
import { Phrase, useI18n } from '../../../../shared/i18n';
import { styles } from './SummaryField.styles';

export function SummaryField({ label, value }: { label: Phrase; value: string }) {
  const { t } = useI18n();
  return (
    <Box style={styles.field}>
      <AppText style={styles.label}>{t(label)}</AppText>
      <AppText style={styles.value} numberOfLines={2}>
        {value}
      </AppText>
    </Box>
  );
}
