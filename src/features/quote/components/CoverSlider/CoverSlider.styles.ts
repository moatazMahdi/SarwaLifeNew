import { Animated, StyleSheet } from 'react-native';
import { colors } from '../../../../shared/theme';
import { SLIDER, SLIDER_MIRRORED } from '../../constants';

type Anim = Animated.AnimatedInterpolation<number>;

export const fillSpan = (edge: number) =>
  SLIDER_MIRRORED ? { right: 0, left: edge } : { left: 0, width: edge };

export const haloMotion = (thumbLeft: number, opacity: Anim, scale: Anim) => ({
  left: thumbLeft - (SLIDER.halo - SLIDER.thumb) / 2,
  opacity,
  transform: [{ scale }],
});

export const thumbMotion = (thumbLeft: number, scale: Anim) => ({
  left: thumbLeft,
  transform: [{ scale }],
});

export const styles = StyleSheet.create({
  touch: { height: SLIDER.touch, justifyContent: 'center' },
  track: {
    height: SLIDER.track,
    borderRadius: SLIDER.track / 2,
    backgroundColor: 'rgba(226,226,226,0.24)',
  },
  fill: {
    position: 'absolute',
    height: SLIDER.track,
    borderRadius: SLIDER.track / 2,
    backgroundColor: colors.green,
  },
  halo: {
    position: 'absolute',
    width: SLIDER.halo,
    height: SLIDER.halo,
    borderRadius: SLIDER.halo / 2,
    backgroundColor: 'rgba(0,105,87,0.12)',
  },
  thumb: {
    position: 'absolute',
    width: SLIDER.thumb,
    height: SLIDER.thumb,
    borderRadius: SLIDER.thumb / 2,
    borderWidth: 3,
    borderColor: colors.green,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 3,
  },
});
