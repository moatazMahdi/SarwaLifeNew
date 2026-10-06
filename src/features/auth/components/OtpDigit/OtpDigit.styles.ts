import { Animated, StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const popStyle = (
  opacity: Animated.Value,
  scale: Animated.AnimatedInterpolation<number>,
) => ({ opacity, transform: [{ scale }] });

export const styles = StyleSheet.create({
  digit: { ...typography.authOtpDigit, color: colors.ink },
});
