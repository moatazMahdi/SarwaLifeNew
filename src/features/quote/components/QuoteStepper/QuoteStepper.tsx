import React from 'react';
import { Box, Row } from '../../../../shared/components';
import { QUOTE_STEPS } from '../../constants';
import { StepBead } from '../StepBead/StepBead';
import { styles } from './QuoteStepper.styles';

export function QuoteStepper({ current }: { current: number }) {
  return (
    <Box style={styles.wrap}>
      <Box style={styles.card}>
        <Box style={styles.inner}>
          <Row style={styles.beadRow}>
            {QUOTE_STEPS.map((label, i) => (
              <StepBead key={label[0]} index={i} current={current} label={label} />
            ))}
          </Row>
        </Box>
      </Box>
    </Box>
  );
}
