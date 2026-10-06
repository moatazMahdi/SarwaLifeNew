import React from 'react';
import { Box, Row } from '../../../../shared/components';
import { styles } from './IdIllustration.styles';

export function IdIllustration() {
  return (
    <Box style={styles.illustration}>
      <Row style={styles.frame}>
        <Box style={styles.photo} />
        <Box style={styles.lines}>
          <Box style={[styles.line, styles.lineA]} />
          <Box style={[styles.line, styles.lineB]} />
          <Box style={[styles.line, styles.lineC]} />
        </Box>
        <Box style={[styles.corner, styles.cTL]} />
        <Box style={[styles.corner, styles.cTR]} />
        <Box style={[styles.corner, styles.cBL]} />
        <Box style={[styles.corner, styles.cBR]} />
      </Row>
    </Box>
  );
}
