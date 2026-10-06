import React from 'react';
import { Box } from '../Box/Box';
import { SafeArea } from '../SafeArea/SafeArea';
import { styles } from './ActionFooter.styles';

export function ActionFooter({ children }: { children: React.ReactNode }) {
  return (
    <Box style={styles.footer}>
      <SafeArea edges={['bottom']} style={styles.inner}>
        {children}
      </SafeArea>
    </Box>
  );
}
