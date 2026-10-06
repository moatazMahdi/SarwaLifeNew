import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { opacityStyle, rotateStyle } from '../../theme';
import { useBrandLoader } from '../../hooks/useBrandLoader';
import { AnimatedBox } from '../AnimatedBox/AnimatedBox';
import { AppImage } from '../AppImage/AppImage';
import { AppText } from '../AppText/AppText';
import { Box } from '../Box/Box';
import { LoaderStep } from '../LoaderStep/LoaderStep';
import { RadialGlow } from '../RadialGlow/RadialGlow';
import { FILL, styles } from './BrandLoader.styles';

type Props = {
  headline: string;
  subtitle: string;
  steps: string[];
  stepMs?: number;
  onDone: () => void;
};

export function BrandLoader({ headline, subtitle, steps, stepMs = 850, onDone }: Props) {
  const { index, fade, rotate } = useBrandLoader(steps.length, stepMs, onDone);

  return (
    <AnimatedBox style={[styles.fill, styles.root, opacityStyle(fade)]}>
      <LinearGradient {...FILL} style={styles.fill} />
      <RadialGlow id="loadA" size={320} opacity={0.2} fade={0.68} midOpacity={0.35} style={styles.glowA} />
      <RadialGlow id="loadB" size={260} opacity={0.14} fade={0.7} midOpacity={0.35} style={styles.glowB} />
      <AppImage
        source={require('../../../assets/hero-watermark.png')}
        style={styles.watermark}
        resizeMode="contain"
      />
      <Box style={styles.body}>
        <Box style={styles.ringWrap}>
          <Box style={styles.ringTrack} />
          <AnimatedBox style={[styles.ring, rotateStyle(rotate)]} />
        </Box>
        <AppText style={styles.headline}>{headline}</AppText>
        <AppText style={styles.subtitle}>{subtitle}</AppText>
        <Box style={styles.list}>
          {steps.map((s, i) => (
            <LoaderStep key={i} label={s} done={i < index} active={i === index} />
          ))}
        </Box>
      </Box>
    </AnimatedBox>
  );
}
