import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppText, Box, Icon } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { Phrase, useI18n } from '../../../../shared/i18n';
import { DISC_FILL, styles } from './IssueStep.styles';

type Props = { index: number; current: number; label: Phrase };

export function IssueStep({ index, current, label }: Props) {
  const { t } = useI18n();
  const n = index + 1;
  const done = n < current;
  const active = n === current;

  return (
    <>
      {index > 0 ? <Box style={styles.line} /> : null}
      <Box style={styles.step}>
        {done || active ? (
          <LinearGradient {...DISC_FILL} style={[styles.disc, active && styles.discRing]}>
            {done ? (
              <Icon name="check" size={13} color={colors.white} />
            ) : (
              <AppText style={styles.numOn}>{n}</AppText>
            )}
          </LinearGradient>
        ) : (
          <Box style={[styles.disc, styles.discOff]}>
            <AppText style={styles.num}>{n}</AppText>
          </Box>
        )}
        <AppText style={[styles.label, (done || active) && styles.labelOn]}>{t(label)}</AppText>
      </Box>
    </>
  );
}
