import React from 'react';
import { AppText, Touchable } from '../../../../shared/components';
import { SwitchToggle } from '../SwitchToggle/SwitchToggle';
import { styles } from './OptionCard.styles';

type Props = { label: string; on: boolean; onToggle: () => void };

export function OptionCard({ label, on, onToggle }: Props) {
  return (
    <Touchable
      onPress={onToggle}
      accessibilityRole="switch"
      accessibilityState={{ checked: on }}
      accessibilityLabel={label}
      style={({ pressed }) => [styles.card, pressed && styles.dim]}
    >
      <AppText style={styles.label}>{label}</AppText>
      <SwitchToggle on={on} />
    </Touchable>
  );
}
