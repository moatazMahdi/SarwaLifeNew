import { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

export function useBrandLoader(stepCount: number, stepMs: number, onDone: () => void) {
  const [index, setIndex] = useState(0);
  const spin = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1300,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [spin, fade]);

  useEffect(() => {
    if (index >= stepCount) {
      const t = setTimeout(() => {
        Animated.timing(fade, {
          toValue: 0,
          duration: 260,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }).start(() => doneRef.current());
      }, 360);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), stepMs);
    return () => clearTimeout(t);
  }, [index, stepCount, stepMs, fade]);

  return {
    index,
    fade,
    rotate: spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }),
  };
}
