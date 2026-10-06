import { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

export function useCountUp(value: number) {
  const [shown, setShown] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    pop.setValue(0);
    setShown(0);

    let lastEmitted = -1;
    const id = progress.addListener(({ value: t }) => {
      const next = Math.round(t * value);
      if (next !== lastEmitted) {
        lastEmitted = next;
        setShown(next);
      }
    });

    const run = Animated.timing(progress, {
      toValue: 1,
      duration: 900,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    });
    run.start(({ finished }) => {
      if (!finished) return;
      setShown(value);
      Animated.sequence([
        Animated.spring(pop, { toValue: 1, friction: 4.5, tension: 240, useNativeDriver: true }),
        Animated.spring(pop, { toValue: 0, friction: 6, tension: 190, useNativeDriver: true }),
      ]).start();
    });

    return () => {
      progress.removeListener(id);
      run.stop();
    };
  }, [value, progress, pop]);

  return { shown, scale: pop.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] }) };
}
