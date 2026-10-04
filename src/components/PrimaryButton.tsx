import React, { useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  GestureResponderEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients, radius, spacing, typography } from '../theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  label: string;
  onPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
};

export function PrimaryButton({ label, onPress, disabled, loading, icon }: Props) {
  const isDisabled = disabled || loading;
  const press = useRef(new Animated.Value(0)).current;

  const spring = (to: number) =>
    Animated.spring(press, {
      toValue: to,
      friction: 9,
      tension: 230,
      useNativeDriver: true,
    }).start();

  const scale = press.interpolate({ inputRange: [0, 1], outputRange: [1, 0.965] });

  return (
    <AnimatedPressable
      onPress={isDisabled ? undefined : onPress}
      onPressIn={isDisabled ? undefined : () => spring(1)}
      onPressOut={isDisabled ? undefined : () => spring(0)}
      style={[
        styles.wrapper,
        isDisabled && styles.disabled,
        !isDisabled && { transform: [{ scale }] },
      ]}
    >
      <LinearGradient
        colors={gradients.brand.colors as unknown as [string, string, ...string[]]}
        locations={gradients.brand.locations as unknown as [number, number, ...number[]]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={styles.gradient}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0)']}
          locations={[0, 0.55]}
          style={styles.gloss}
        />
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <>
              <Text style={styles.label}>{label}</Text>
              {icon}
            </>
          )}
        </View>
      </LinearGradient>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: spacing.buttonHeight,
    borderRadius: radius.button,
    overflow: 'hidden',
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  disabled: {
    opacity: 0.42,
    shadowOpacity: 0,
    elevation: 0,
  },
  gradient: {
    flex: 1,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: spacing.buttonHeight,
    borderRadius: radius.button,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    ...typography.buttonLabel,
    color: colors.white,
  },
});
