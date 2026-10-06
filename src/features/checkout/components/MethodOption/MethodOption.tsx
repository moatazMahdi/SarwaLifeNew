import React from 'react';
import { AppText, Box, Touchable } from '../../../../shared/components';
import { useI18n } from '../../../../shared/i18n';
import { Method } from '../../constants';
import { MethodBadge } from '../MethodBadge/MethodBadge';
import { styles } from './MethodOption.styles';

type Props = { method: Method; on: boolean; onPress: () => void };

export function MethodOption({ method, on, onPress }: Props) {
  const { t } = useI18n();
  return (
    <Touchable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected: on }}
      style={[styles.method, on && styles.on]}
    >
      <MethodBadge method={method} />
      <Box style={styles.text}>
        <AppText style={styles.label}>{t(method.label)}</AppText>
        <AppText style={styles.desc}>{t(method.desc)}</AppText>
      </Box>
      <Box style={[styles.radio, on && styles.radioOn]}>
        {on ? <Box style={styles.radioDot} /> : null}
      </Box>
    </Touchable>
  );
}
