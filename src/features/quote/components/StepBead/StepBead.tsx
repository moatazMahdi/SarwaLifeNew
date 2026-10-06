import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppText, Box, Icon } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { Phrase, useI18n } from '../../../../shared/i18n';
import { BEAD_FILL, styles } from './StepBead.styles';

type Props = { index: number; current: number; label: Phrase };

export function StepBead({ index, current, label }: Props) {
  const { t } = useI18n();
  const n = index + 1;
  const done = n < current;
  const active = n === current;

  return (
    <>
      {index > 0 ? <Box style={[styles.connector, n <= current && styles.connectorOn]} /> : null}
      <Box style={styles.beadCol}>
        {active ? <Box style={styles.halo} /> : null}
        {active || done ? (
          <LinearGradient {...BEAD_FILL} style={styles.bead}>
            {done ? (
              <Icon name="check" size={18} color={colors.white} />
            ) : (
              <AppText style={[styles.beadNum, styles.beadNumOn]}>{n}</AppText>
            )}
          </LinearGradient>
        ) : (
          <Box style={[styles.bead, styles.beadIdle]}>
            <AppText style={styles.beadNum}>{n}</AppText>
          </Box>
        )}
        <AppText numberOfLines={1} style={[styles.label, (active || done) && styles.labelOn]}>
          {t(label)}
        </AppText>
      </Box>
    </>
  );
}
