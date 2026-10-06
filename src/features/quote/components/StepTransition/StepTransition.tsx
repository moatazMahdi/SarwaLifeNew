import React from 'react';
import { AnimatedBox } from '../../../../shared/components';
import { useStepTransition } from '../../hooks/useStepTransition';
import { motion, styles } from './StepTransition.styles';

type Props = { step: number; dir: number; children: React.ReactNode };

export function StepTransition({ step, dir, children }: Props) {
  const { opacity, offset } = useStepTransition(step, dir);
  return <AnimatedBox style={[styles.host, motion(opacity, offset)]}>{children}</AnimatedBox>;
}
