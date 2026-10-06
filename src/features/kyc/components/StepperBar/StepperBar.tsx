import React from 'react';
import { Box } from '../../../../shared/components';
import { SignupStepper } from '../SignupStepper/SignupStepper';
import { styles } from './StepperBar.styles';

export function StepperBar({ current }: { current: number }) {
  return (
    <Box style={styles.wrap}>
      <SignupStepper current={current} />
    </Box>
  );
}
