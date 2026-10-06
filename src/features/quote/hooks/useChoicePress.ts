import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export function useChoicePress(on: boolean) {
  const press = useRef(new Animated.Value(0)).current;
  const grow = useRef(new Animated.Value(on ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(grow, {
      toValue: on ? 1 : 0,
      friction: 9,
      tension: 160,
      useNativeDriver: true,
    }).start();
  }, [on, grow]);

  const spring = (to: number) =>
    Animated.spring(press, { toValue: to, friction: 9, tension: 220, useNativeDriver: true }).start();

  return {
    scale: Animated.add(
      press.interpolate({ inputRange: [0, 1], outputRange: [1, 0.97] }),
      grow.interpolate({ inputRange: [0, 1], outputRange: [0, 0.015], extrapolate: 'clamp' }),
    ),
    onPressIn: () => spring(1),
    onPressOut: () => spring(0),
  };
}
