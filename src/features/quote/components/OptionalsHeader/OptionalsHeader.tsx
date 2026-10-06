import React from 'react';
import { AppText, Box } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './OptionalsHeader.styles';

export function OptionalsHeader() {
  const { t } = useI18n();
  return (
    <>
      <Box style={styles.rule} />
      <Box style={styles.header}>
        <AppText style={styles.title}>{t(S.quote.cover.optionalsTitle)}</AppText>
        <AppText style={styles.subtitle}>{t(S.quote.cover.optionalsSubtitle)}</AppText>
      </Box>
    </>
  );
}
