import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

type Props = {
  id: string;
  size: number;
  opacity: number;
  fade: number;
  midOpacity?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function RadialGlow({
  id,
  size,
  opacity,
  fade,
  midOpacity = 0,
  color = '#FFFFFF',
  style,
}: Props) {
  const r = size / 2;
  return (
    <Svg width={size} height={size} style={style} pointerEvents="none">
      <Defs>
        <RadialGradient id={id} cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={color} stopOpacity={opacity} />
          <Stop offset={String(fade)} stopColor={color} stopOpacity={opacity * midOpacity} />
          <Stop offset="1" stopColor={color} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Circle cx={r} cy={r} r={r} fill={`url(#${id})`} />
    </Svg>
  );
}
