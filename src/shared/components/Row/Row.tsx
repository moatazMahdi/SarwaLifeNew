import React from 'react';
import { Box, BoxProps } from '../Box/Box';
import { styles } from './Row.styles';

export function Row({ style, ...rest }: BoxProps) {
  return <Box style={[styles.row, style]} {...rest} />;
}
