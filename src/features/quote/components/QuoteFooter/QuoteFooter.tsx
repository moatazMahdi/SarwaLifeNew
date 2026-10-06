import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FADE, footInset, styles } from './QuoteFooter.styles';

export function QuoteFooter({ children }: { children: React.ReactNode }) {
  const { bottom } = useSafeAreaInsets();
  return (
    <LinearGradient {...FADE} pointerEvents="box-none" style={[styles.foot, footInset(bottom)]}>
      {children}
    </LinearGradient>
  );
}
