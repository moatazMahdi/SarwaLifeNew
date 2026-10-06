import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppText, Box, Icon } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { Phrase, useI18n } from '../../../../shared/i18n';
import { BEAD_FILL, styles } from './SignupStepBead.styles';

type Props = { step: number; current: number; label: Phrase };

export function SignupStepBead({ step, current, label }: Props) {
  const { t } = useI18n();
  const done = step < current;
  const active = step === current;

  return (
    <Box style={styles.col}>
      {done || active ? (
        <LinearGradient {...BEAD_FILL} style={[styles.bead, active && styles.beadRing]}>
          {done ? (
            <Icon name="check" size={16} color={colors.white} />
          ) : (
            <AppText style={styles.numOn}>{step}</AppText>
          )}
        </LinearGradient>
      ) : (
        <Box style={[styles.bead, styles.beadOff]}>
          <AppText style={styles.numOff}>{step}</AppText>
        </Box>
      )}
      <AppText style={[styles.label, (done || active) && styles.labelOn]}>{t(label)}</AppText>
    </Box>
  );
}
