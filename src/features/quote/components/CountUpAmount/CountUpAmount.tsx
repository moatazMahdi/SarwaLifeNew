import React from 'react';
import { AnimatedText } from '../../../../shared/components';
import { money } from '../../../../shared/data/products';
import { scaleStyle } from '../../../../shared/theme';
import { useCountUp } from '../../hooks/useCountUp';
import { styles } from './CountUpAmount.styles';

export function CountUpAmount({ value }: { value: number }) {
  const { shown, scale } = useCountUp(value);
  return <AnimatedText style={[styles.amount, scaleStyle(scale)]}>{money(shown)}</AnimatedText>;
}
