import React from 'react';
import { AppText, Box, Row } from '../../../../shared/components';
import { styles } from './QuestionBlock.styles';

type Props = { label: string; children: React.ReactNode };

export function QuestionBlock({ label, children }: Props) {
  return (
    <Box style={styles.block}>
      <AppText style={styles.label}>{label}</AppText>
      <Row style={styles.row}>{children}</Row>
    </Box>
  );
}
