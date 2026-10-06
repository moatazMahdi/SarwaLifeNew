import React from 'react';
import { Box, LangToggle } from '../../../../shared/components';
import { styles } from './SplashHeader.styles';

export function SplashHeader() {
  return (
    <Box style={styles.topRow}>
      <LangToggle tone="onDark" />
    </Box>
  );
}
