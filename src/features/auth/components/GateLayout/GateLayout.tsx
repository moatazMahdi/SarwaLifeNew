import React from 'react';
import { AuthTopBar, SafeArea } from '../../../../shared/components';
import { styles } from './GateLayout.styles';

type Props = { onBack: () => void; children: React.ReactNode };

export function GateLayout({ onBack, children }: Props) {
  return (
    <SafeArea style={styles.screen} edges={['top', 'bottom']}>
      <AuthTopBar onBack={onBack} />
      {children}
    </SafeArea>
  );
}
