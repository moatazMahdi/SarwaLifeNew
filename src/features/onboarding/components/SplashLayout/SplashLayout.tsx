import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppImage, Box, SafeArea } from '../../../../shared/components';
import { LOGO } from '../../constants';
import { FILL, styles } from './SplashLayout.styles';

export function SplashLayout({ children }: { children: React.ReactNode }) {
  return (
    <LinearGradient {...FILL} style={styles.screen}>
      <AppImage source={LOGO} style={styles.watermark} resizeMode="contain" />
      <Box style={styles.ringOuter} pointerEvents="none" />
      <Box style={styles.ringMid} pointerEvents="none" />
      <Box style={styles.ringInner} pointerEvents="none" />
      <SafeArea style={styles.content} edges={['top', 'bottom']}>
        {children}
      </SafeArea>
    </LinearGradient>
  );
}
