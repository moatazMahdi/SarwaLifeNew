import React from 'react';
import { AnimatedText } from '../../../../shared/components';
import { useDigitPop } from '../../hooks/useDigitPop';
import { popStyle, styles } from './OtpDigit.styles';

export function OtpDigit({ value }: { value: string }) {
  const { opacity, scale } = useDigitPop(value);
  return <AnimatedText style={[styles.digit, popStyle(opacity, scale)]}>{value}</AnimatedText>;
}
