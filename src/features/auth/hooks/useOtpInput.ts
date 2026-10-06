import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import type { AppInputRef } from '../../../shared/components';

export function useOtpInput(error?: boolean) {
  const inputRef = useRef<AppInputRef>(null);
  const caret = useRef(new Animated.Value(1)).current;
  const shake = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(caret, { toValue: 0, duration: 520, useNativeDriver: true }),
        Animated.timing(caret, { toValue: 1, duration: 520, useNativeDriver: true }),
      ]),
    );
    blink.start();
    return () => blink.stop();
  }, [caret]);

  useEffect(() => {
    if (!error) return;
    shake.setValue(0);
    Animated.sequence([
      Animated.timing(shake, { toValue: 1, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -1, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0.6, duration: 55, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 55, useNativeDriver: true }),
    ]).start();
  }, [error, shake]);

  return {
    inputRef,
    caret,
    translateX: shake.interpolate({ inputRange: [-1, 1], outputRange: [-7, 7] }),
    focus: () => inputRef.current?.focus(),
  };
}
