import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent } from 'react-native';

export function useFaqItem(open: boolean, text: string) {
  const [measured, setMeasured] = useState<number | null>(null);

  useEffect(() => setMeasured(null), [text]);

  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: open ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [open, anim]);

  return {
    needsMeasure: measured === null,
    onMeasure: (e: LayoutChangeEvent) => setMeasured(e.nativeEvent.layout.height),
    height: anim.interpolate({ inputRange: [0, 1], outputRange: [0, measured ?? 0] }),
    spin: anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }),
  };
}
