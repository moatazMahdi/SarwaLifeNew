import React from 'react';
import { AppText, Box, Row } from '../../../../shared/components';
import { Phrase, useI18n } from '../../../../shared/i18n';
import { styles } from './LegalClause.styles';

export function LegalClause({ clause }: { clause: Phrase }) {
  const { t } = useI18n();
  return (
    <Row style={styles.row}>
      <Box style={styles.dot} />
      <AppText style={styles.text}>{t(clause)}</AppText>
    </Row>
  );
}
