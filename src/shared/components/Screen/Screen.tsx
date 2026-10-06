import React from 'react';
import { Box, BoxProps } from '../Box/Box';
import { backgroundStyle, styles } from './Screen.styles';

type Props = BoxProps & { background?: string };

export function Screen({ background, style, ...rest }: Props) {
  return <Box style={[styles.fill, backgroundStyle(background), style]} {...rest} />;
}
