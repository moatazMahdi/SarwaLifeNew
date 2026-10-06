import React from 'react';
import { AppImage, Box } from '../../../../shared/components';
import { Slide } from '../../constants';
import { OnboardingChip } from '../OnboardingChip/OnboardingChip';
import { artSize, styles } from './OnboardingArt.styles';

export function OnboardingArt({ slide }: { slide: Slide }) {
  return (
    <Box style={[styles.artWrap, artSize(slide)]}>
      <AppImage source={slide.art} style={styles.art} resizeMode="contain" />
      {slide.chips.map((chip) => (
        <OnboardingChip key={chip.text[0]} chip={chip} />
      ))}
    </Box>
  );
}
