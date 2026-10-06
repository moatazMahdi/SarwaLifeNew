import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { DISC_FILL, RING_FILL, styles } from './SuccessSeal.styles';

export function SuccessSeal() {
  return (
    <LinearGradient {...RING_FILL} style={styles.ring}>
      <LinearGradient {...DISC_FILL} style={styles.disc}>
        <Icon name="checkBold" size={48} color={colors.white} />
      </LinearGradient>
    </LinearGradient>
  );
}
