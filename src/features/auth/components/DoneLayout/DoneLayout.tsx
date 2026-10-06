import React from 'react';
import { useWindowDimensions } from 'react-native';
import { AppImage, SafeArea, Screen } from '../../../../shared/components';
import { LOGO } from '../../constants';
import { styles, watermarkSize } from './DoneLayout.styles';

export function DoneLayout({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions();
  return (
    <Screen style={styles.screen}>
      <AppImage source={LOGO} style={[styles.watermark, watermarkSize(width)]} resizeMode="cover" />
      <SafeArea style={styles.fill} edges={['top', 'bottom']}>
        {children}
      </SafeArea>
    </Screen>
  );
}
