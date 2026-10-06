import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Box } from '../Box/Box';
import { styles } from './Card.styles';

export function Card({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <Box style={[styles.card, style]}>{children}</Box>;
}
