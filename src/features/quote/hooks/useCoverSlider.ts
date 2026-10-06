import { useMemo, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, PanResponder } from 'react-native';
import { SLIDER, SLIDER_MIRRORED } from '../constants';

type Args = {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
};

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export function useCoverSlider({ value, min, max, step, onChange }: Args) {
  const [width, setWidth] = useState(0);
  const usable = Math.max(width - SLIDER.thumb, 1);
  const grab = useRef(new Animated.Value(0)).current;

  const geo = useRef({ usable, min, max, step });
  geo.current = { usable, min, max, step };
  const startX = useRef(0);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const pan = useMemo(() => {
    const emit = (x: number) => {
      const g = geo.current;
      const travelled = clamp(x - SLIDER.thumb / 2, 0, g.usable) / g.usable;
      const ratio = SLIDER_MIRRORED ? 1 - travelled : travelled;
      const raw = g.min + ratio * (g.max - g.min);
      onChangeRef.current(clamp(Math.round(raw / g.step) * g.step, g.min, g.max));
    };
    const spring = (to: number) =>
      Animated.spring(grab, {
        toValue: to,
        friction: 8,
        tension: 220,
        useNativeDriver: true,
      }).start();
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: (_e, g) => Math.abs(g.dx) > 2,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => {
        startX.current = e.nativeEvent.locationX;
        spring(1);
        emit(startX.current);
      },
      onPanResponderMove: (_e, g) => emit(startX.current + g.dx),
      onPanResponderRelease: () => spring(0),
      onPanResponderTerminate: () => spring(0),
    });
  }, [grab]);

  const ratio = clamp((value - min) / (max - min), 0, 1);
  const thumbLeft = usable * (SLIDER_MIRRORED ? 1 - ratio : ratio);

  return {
    pan,
    thumbLeft,
    fillEdge: thumbLeft + SLIDER.thumb / 2,
    scale: grab.interpolate({ inputRange: [0, 1], outputRange: [1, 1.18] }),
    haloOpacity: grab.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
    onLayout: (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width),
  };
}
