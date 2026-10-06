import React from 'react';
import { AppText, Box, Row } from '../../../../shared/components';
import { Phrase, S, useI18n } from '../../../../shared/i18n';
import { styles } from './ReasonsCard.styles';

export function ReasonsCard({ reasons }: { reasons: readonly Phrase[] }) {
  const { t } = useI18n();
  return (
    <Box style={styles.card}>
      <AppText style={styles.title}>{t(S.kyc.failed.reasonsTitle)}</AppText>
      {reasons.map((reason) => (
        <Row key={reason[0]} style={styles.reason}>
          <Box style={styles.dot} />
          <AppText style={styles.text}>{t(reason)}</AppText>
        </Row>
      ))}
    </Box>
  );
}
