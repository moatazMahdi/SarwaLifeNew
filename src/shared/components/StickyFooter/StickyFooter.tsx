import React from 'react';
import { Box } from '../Box/Box';
import { styles } from './StickyFooter.styles';

export function StickyFooter({ children }: { children: React.ReactNode }) {
  return <Box style={styles.footer}>{children}</Box>;
}
