import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export function useDigitPop(value: string) {
  const pop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    pop.setValue(0);
    Animated.spring(pop, { toValue: 1, friction: 6, tension: 220, useNativeDriver: true }).start();
  }, [value, pop]);

  return { opacity: pop, scale: pop.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) };
}
