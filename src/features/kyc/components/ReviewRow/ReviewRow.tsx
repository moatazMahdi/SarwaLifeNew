import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppText, Box, Icon, Row } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { BADGE_FILL, styles } from './ReviewRow.styles';

type Props = { label: string; value: string; first: boolean };

export function ReviewRow({ label, value, first }: Props) {
  return (
    <Box>
      {first ? null : <Box style={styles.rule} />}
      <Row style={styles.row}>
        <AppText style={styles.label}>{label}</AppText>
        <Row style={styles.valueGroup}>
          <AppText style={styles.value} numberOfLines={1}>
            {value}
          </AppText>
          <LinearGradient {...BADGE_FILL} style={styles.badge}>
            <Icon name="check" size={10} color={colors.white} />
          </LinearGradient>
        </Row>
      </Row>
    </Box>
  );
}
