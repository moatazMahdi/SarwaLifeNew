import React from 'react';
import { Box, Row } from '../../../../shared/components';
import { styles } from './PageDots.styles';

type Props = { count: number; active: number };

export function PageDots({ count, active }: Props) {
  return (
    <Row style={styles.dots}>
      {Array.from({ length: count }, (_, i) => (
        <Box key={i} style={[styles.dot, i + 1 === active && styles.dotActive]} />
      ))}
    </Row>
  );
}
