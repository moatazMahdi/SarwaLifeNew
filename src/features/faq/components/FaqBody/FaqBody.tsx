import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Scroll } from '../../../../shared/components';
import { bottomInset, styles } from './FaqBody.styles';

export function FaqBody({ children }: { children: React.ReactNode }) {
  const { bottom } = useSafeAreaInsets();

  return (
    <Scroll
      contentContainerStyle={[styles.body, bottomInset(bottom)]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </Scroll>
  );
}
