import React from 'react';
import { AnimatedBox, Box } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { useCoverSlider } from '../../hooks/useCoverSlider';
import { fillSpan, haloMotion, styles, thumbMotion } from './CoverSlider.styles';

type Props = {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
};

export function CoverSlider({ value, min, max, step, onChange }: Props) {
  const { t } = useI18n();
  const { pan, thumbLeft, fillEdge, scale, haloOpacity, onLayout } = useCoverSlider({
    value,
    min,
    max,
    step,
    onChange,
  });

  return (
    <Box
      onLayout={onLayout}
      {...pan.panHandlers}
      style={styles.touch}
      accessibilityRole="adjustable"
      accessibilityLabel={t(S.quote.cover.sliderA11y)}
      accessibilityValue={{ min, max, now: value }}
    >
      <Box style={styles.track} pointerEvents="none" />
      <Box style={[styles.fill, fillSpan(fillEdge)]} pointerEvents="none" />
      <AnimatedBox
        pointerEvents="none"
        style={[styles.halo, haloMotion(thumbLeft, haloOpacity, scale)]}
      />
      <AnimatedBox pointerEvents="none" style={[styles.thumb, thumbMotion(thumbLeft, scale)]} />
    </Box>
  );
}
