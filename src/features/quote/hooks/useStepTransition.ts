import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export function useStepTransition(step: number, dir: number) {
  const opacity = useRef(new Animated.Value(1)).current;
  const dirRef = useRef(dir);
  dirRef.current = dir;
  const offset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    offset.setValue(-dirRef.current * 26);
    opacity.setValue(0);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 240,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(offset, {
        toValue: 0,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [step, opacity, offset]);

  return { opacity, offset };
}
