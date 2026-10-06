import React from 'react';
import { colors } from '../../theme';
import { Box } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import { styles } from './FailureSeal.styles';

export function FailureSeal() {
  return (
    <Box style={styles.ring}>
      <Box style={styles.disc}>
        <Icon name="alertBold" size={48} color={colors.white} />
      </Box>
    </Box>
  );
}
