import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Box, Icon } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { DISC_FILL, POP_FILL, styles } from './SuccessBadge.styles';

export function SuccessBadge() {
  return (
    <LinearGradient {...POP_FILL} style={styles.pop}>
      <LinearGradient {...DISC_FILL} style={styles.disc}>
        <Box style={styles.gloss} />
        <Icon name="checkBold" size={48} color={colors.white} />
      </LinearGradient>
    </LinearGradient>
  );
}
