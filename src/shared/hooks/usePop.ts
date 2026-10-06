import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export function usePop(on: boolean) {
  const pop = useRef(new Animated.Value(on ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(pop, {
      toValue: on ? 1 : 0,
      friction: 6,
      tension: 180,
      useNativeDriver: true,
    }).start();
  }, [on, pop]);

  return pop.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] });
}
