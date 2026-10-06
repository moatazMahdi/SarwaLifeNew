import React from 'react';
import { AppText, Box, Row } from '../../../../shared/components';
import { styles } from './RuleRow.styles';

type Props = { text: string; ok: boolean; first: boolean };

export function RuleRow({ text, ok, first }: Props) {
  return (
    <Row style={[styles.row, first && styles.rowFirst]}>
      <Box style={ok ? styles.ok : styles.no}>
        <AppText style={styles.glyph}>{ok ? '✓' : '✕'}</AppText>
      </Box>
      <AppText style={styles.text}>{text}</AppText>
    </Row>
  );
}
