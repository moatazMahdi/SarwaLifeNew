import React from 'react';
import { Box, Row } from '../../../../shared/components';
import { SIGNUP_STEPS } from '../../constants';
import { SignupStepBead } from '../SignupStepBead/SignupStepBead';
import { styles } from './SignupStepper.styles';

export function SignupStepper({ current }: { current: number }) {
  return (
    <Box style={styles.card}>
      <Row style={styles.track}>
        <Row style={styles.lines} pointerEvents="none">
          {SIGNUP_STEPS.slice(1).map((label, i) => (
            <Box key={label[0]} style={[styles.line, i + 1 < current && styles.lineDone]} />
          ))}
        </Row>
        {SIGNUP_STEPS.map((label, i) => (
          <SignupStepBead key={label[0]} step={i + 1} current={current} label={label} />
        ))}
      </Row>
    </Box>
  );
}
