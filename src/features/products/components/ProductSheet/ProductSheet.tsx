import React from 'react';
import { Box, Scroll } from '../../../../shared/components';
import { styles } from './ProductSheet.styles';

type Props = {
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function ProductSheet({ children, footer }: Props) {
  return (
    <Box style={styles.sheet}>
      <Scroll contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {children}
      </Scroll>
      {footer}
    </Box>
  );
}
