import React from 'react';
import { AppText, Icon, Touchable } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { Phrase, useI18n } from '../../../../shared/i18n';
import { styles } from './MedicalChoice.styles';

type Props = { label: Phrase; on: boolean; onPress: () => void };

export function MedicalChoice({ label, on, onPress }: Props) {
  const { t } = useI18n();
  return (
    <Touchable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected: on }}
      style={({ pressed }) => [styles.choice, on && styles.on, pressed && styles.pressed]}
    >
      <AppText style={[styles.label, on && styles.labelOn]}>{t(label)}</AppText>
      {on ? <Icon name="checkCircle" size={20} color={colors.green} /> : null}
    </Touchable>
  );
}
