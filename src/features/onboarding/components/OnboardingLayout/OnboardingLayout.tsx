import React from 'react';
import { Box, SafeArea, Screen } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { styles } from './OnboardingLayout.styles';

type Props = { header: React.ReactNode; children: React.ReactNode };

export function OnboardingLayout({ header, children }: Props) {
  return (
    <Screen background={colors.white}>
      <SafeArea edges={['top']} style={styles.safe}>
        {header}
        <Box style={styles.content}>{children}</Box>
      </SafeArea>
      <SafeArea edges={['bottom']} />
    </Screen>
  );
}
