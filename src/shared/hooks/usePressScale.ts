import { useRef } from 'react';
import { Animated } from 'react-native';

type Spring = { pressed: number; friction: number; tension: number };

export function usePressScale({ pressed, friction, tension }: Spring) {
  const press = useRef(new Animated.Value(0)).current;

  const spring = (to: number) =>
    Animated.spring(press, { toValue: to, friction, tension, useNativeDriver: true }).start();

  return {
    scale: press.interpolate({ inputRange: [0, 1], outputRange: [1, pressed] }),
    onPressIn: () => spring(1),
    onPressOut: () => spring(0),
  };
}
