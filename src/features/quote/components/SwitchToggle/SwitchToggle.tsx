import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedBox, Box } from '../../../../shared/components';
import { opacityStyle } from '../../../../shared/theme';
import { useSwitchAnim } from '../../hooks/useSwitchAnim';
import { ON_FILL, knobMotion, styles } from './SwitchToggle.styles';

export function SwitchToggle({ on }: { on: boolean }) {
  const { anim, translateX } = useSwitchAnim(on);

  return (
    <Box style={styles.track} pointerEvents="none">
      <Box style={styles.off} />
      <AnimatedBox style={[styles.fill, opacityStyle(anim)]}>
        <LinearGradient {...ON_FILL} style={styles.on} />
      </AnimatedBox>
      <AnimatedBox style={[styles.knob, knobMotion(translateX)]} />
    </Box>
  );
}
