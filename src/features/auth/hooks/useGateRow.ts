import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export function useGateRow(primary?: boolean) {
  const press = useRef(new Animated.Value(0)).current;
  const enter = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(enter, {
      toValue: 1,
      duration: 320,
      delay: primary ? 60 : 130,
      useNativeDriver: true,
    }).start();
  }, [enter, primary]);

  const spring = (to: number) =>
    Animated.spring(press, { toValue: to, friction: 9, tension: 230, useNativeDriver: true }).start();

  return {
    enter,
    scale: press.interpolate({ inputRange: [0, 1], outputRange: [1, 0.975] }),
    lift: enter.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }),
    onPressIn: () => spring(1),
    onPressOut: () => spring(0),
  };
}
