import { Animated } from 'react-native';

type Animatable<T extends string | number> = Animated.AnimatedInterpolation<T> | Animated.Value | T;

export const scaleStyle = (scale: Animatable<number>) => ({ transform: [{ scale }] });

export const rotateStyle = (rotate: Animatable<string>) => ({ transform: [{ rotate }] });

export const opacityStyle = (opacity: Animatable<number>) => ({ opacity });
