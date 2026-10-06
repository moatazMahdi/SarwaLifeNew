import { Animated, StyleSheet } from 'react-native';

export const motion = (opacity: Animated.Value, offset: Animated.Value) => ({
  opacity,
  transform: [{ translateX: offset }],
});

export const styles = StyleSheet.create({
  host: { flex: 1 },
});
