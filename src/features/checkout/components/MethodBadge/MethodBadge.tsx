import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Box, Icon } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { Method, METHOD_BADGE } from '../../constants';
import { SOFT_FILL, styles } from './MethodBadge.styles';

export function MethodBadge({ method }: { method: Method }) {
  if (method.brand === 'fill') {
    return (
      <Box style={styles.brand}>
        <Icon name={method.icon} size={METHOD_BADGE} />
      </Box>
    );
  }
  if (method.brand === 'inset') {
    return (
      <Box style={[styles.brand, styles.brandInset]}>
        <Icon name={method.icon} width={28} height={17.5} />
      </Box>
    );
  }
  return (
    <LinearGradient {...SOFT_FILL} style={styles.soft}>
      <Icon name={method.icon} size={22} color={colors.green} />
    </LinearGradient>
  );
}
