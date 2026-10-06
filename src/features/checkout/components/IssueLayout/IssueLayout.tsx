import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AuthTopBar, Box, SafeArea, Scroll } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { IssueStepper } from '../IssueStepper/IssueStepper';
import { FADE, styles } from './IssueLayout.styles';

type Props = {
  step: number;
  onBack?: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function IssueLayout({ step, onBack, children, footer }: Props) {
  const { t } = useI18n();
  return (
    <SafeArea style={styles.screen} edges={['top']}>
      <AuthTopBar title={t(S.checkout.topBar)} onBack={onBack} />
      <Scroll
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <IssueStepper current={step} />
        {children}
      </Scroll>
      <Box style={styles.footer}>
        <LinearGradient {...FADE} style={styles.fade} pointerEvents="none" />
        <SafeArea edges={['bottom']} style={styles.footerInner}>
          {footer}
        </SafeArea>
      </Box>
    </SafeArea>
  );
}
