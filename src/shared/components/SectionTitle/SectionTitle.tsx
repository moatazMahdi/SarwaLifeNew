import React from 'react';
import { AppText } from '../AppText/AppText';
import { Box } from '../Box/Box';
import { Row } from '../Row/Row';
import { styles } from './SectionTitle.styles';

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Row style={styles.row}>
      <Box style={styles.bar} />
      <AppText style={styles.title}>{children}</AppText>
    </Row>
  );
}
