import React from 'react';
import { Text, TextProps } from 'react-native';
import { TypographyVariant, variantStyle } from './AppText.styles';

export type AppTextProps = TextProps & {
  ref?: React.Ref<Text>;
  variant?: TypographyVariant;
  color?: string;
};

export function AppText({ variant, color, style, ...rest }: AppTextProps) {
  return <Text style={[variantStyle(variant, color), style]} {...rest} />;
}
