import React from 'react';
import { Screen } from '../../../../shared/components';
import { styles } from './CameraLayout.styles';

export function CameraLayout({ children }: { children: React.ReactNode }) {
  return <Screen style={styles.screen}>{children}</Screen>;
}
