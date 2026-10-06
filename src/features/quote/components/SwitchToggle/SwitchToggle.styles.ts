import { Animated, StyleSheet } from 'react-native';
import { colors, gradients } from '../../../../shared/theme';
import { SWITCH } from '../../constants';

export const ON_FILL = {
  colors: [...gradients.brand.colors],
  locations: [...gradients.brand.locations],
  useAngle: true,
  angle: 145,
};

export const knobMotion = (translateX: Animated.AnimatedInterpolation<number>) => ({
  transform: [{ translateX }],
});

export const styles = StyleSheet.create({
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  track: {
    width: SWITCH.width,
    height: SWITCH.height,
    borderRadius: SWITCH.height / 2,
  },
  off: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: SWITCH.height / 2,
    backgroundColor: colors.br,
  },
  on: { flex: 1, borderRadius: SWITCH.height / 2 },
  knob: {
    position: 'absolute',
    top: (SWITCH.height - SWITCH.knob) / 2,
    left: 0,
    width: SWITCH.knob,
    height: SWITCH.knob,
    borderRadius: SWITCH.knob / 2,
    backgroundColor: colors.white,
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.24,
    shadowRadius: 5,
    elevation: 2,
  },
});
