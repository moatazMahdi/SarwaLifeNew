import React from 'react';
import { ActivityIndicator, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, scaleStyle } from '../../theme';
import { usePressScale } from '../../hooks/usePressScale';
import { AnimatedTouchable } from '../AnimatedTouchable/AnimatedTouchable';
import { AppText } from '../AppText/AppText';
import { Box } from '../Box/Box';
import { Row } from '../Row/Row';
import { Touchable } from '../Touchable/Touchable';
import {
  BRAND_FILL,
  ButtonVariant,
  GLOSS,
  GRADIENT_FILL,
  HERO_FILL,
  styles,
  variantSpec,
} from './Button.styles';

export type { ButtonVariant };

type Props = {
  variant?: ButtonVariant;
  label?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  icon?: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  size?: number;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  variant = 'primary',
  label,
  startIcon,
  endIcon,
  icon,
  onPress,
  disabled,
  loading,
  size = 44,
  accessibilityLabel,
  style,
}: Props) {
  const press = usePressScale({ pressed: 0.965, friction: 9, tension: 230 });
  const spec = variantSpec(variant, size);

  if (variant === 'primary') {
    const off = disabled || loading;
    return (
      <AnimatedTouchable
        onPress={off ? undefined : onPress}
        onPressIn={off ? undefined : press.onPressIn}
        onPressOut={off ? undefined : press.onPressOut}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={[styles.primary, off && styles.primaryDisabled, !off && scaleStyle(press.scale), style]}
      >
        <LinearGradient {...BRAND_FILL} style={styles.primaryFill}>
          <LinearGradient {...GLOSS} style={styles.primaryGloss} />
          <Row style={styles.primaryContent}>
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <>
                {startIcon}
                <AppText style={spec.label}>{label}</AppText>
                {endIcon}
              </>
            )}
          </Row>
        </LinearGradient>
      </AnimatedTouchable>
    );
  }

  const labelNode = label !== undefined ? <AppText style={spec.label}>{label}</AppText> : null;

  let content: React.ReactNode = icon ?? (
    <>
      {startIcon}
      {labelNode}
      {endIcon}
    </>
  );

  if (variant === 'hero') {
    content = (
      <LinearGradient {...HERO_FILL} style={styles.heroFill}>
        <LinearGradient {...GLOSS} style={styles.fill} pointerEvents="none" />
        <Box style={styles.heroHighlight} pointerEvents="none" />
        <Row style={styles.heroContent}>
          {startIcon}
          {labelNode}
          {endIcon ? <Box style={styles.heroIcon}>{endIcon}</Box> : null}
        </Row>
      </LinearGradient>
    );
  } else if (variant === 'brand') {
    content = (
      <LinearGradient {...GRADIENT_FILL} style={styles.brandFill}>
        <LinearGradient {...GLOSS} style={styles.fill} />
        <Box style={styles.heroHighlight} />
        {labelNode}
      </LinearGradient>
    );
  } else if (variant === 'goldGlow') {
    content = (
      <>
        <LinearGradient {...GLOSS} style={styles.fill} />
        {startIcon}
        {labelNode}
        {endIcon}
      </>
    );
  } else if (variant === 'gradient') {
    content = (
      <LinearGradient {...GRADIENT_FILL} style={styles.gradientFill}>
        {startIcon}
        {labelNode}
        {endIcon}
      </LinearGradient>
    );
  }

  return (
    <Touchable
      onPress={onPress}
      disabled={disabled}
      hitSlop={spec.hitSlop}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        spec.box,
        disabled && spec.disabled,
        style,
        pressed && !disabled && spec.pressed,
      ]}
    >
      {content}
    </Touchable>
  );
}
