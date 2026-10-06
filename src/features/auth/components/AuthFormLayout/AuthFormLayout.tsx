import React from 'react';
import { AuthTopBar, KeyboardAvoid, SafeArea, Scroll } from '../../../../shared/components';
import { styles } from './AuthFormLayout.styles';

type Props = { title?: string; onBack: () => void; children: React.ReactNode };

export function AuthFormLayout({ title, onBack, children }: Props) {
  return (
    <SafeArea style={styles.screen} edges={['top', 'bottom']}>
      <AuthTopBar title={title} onBack={onBack} />
      <KeyboardAvoid style={styles.fill}>
        <Scroll
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {children}
        </Scroll>
      </KeyboardAvoid>
    </SafeArea>
  );
}
