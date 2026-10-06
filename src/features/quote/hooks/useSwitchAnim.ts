import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { KNOB_OFF, KNOB_ON } from '../constants';

export function useSwitchAnim(on: boolean) {
  const anim = useRef(new Animated.Value(on ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: on ? 1 : 0,
      friction: 11,
      tension: 140,
      useNativeDriver: true,
    }).start();
  }, [on, anim]);

  return {
    anim,
    translateX: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [KNOB_OFF, KNOB_ON],
      extrapolate: 'clamp',
    }),
  };
}
