import React from 'react';
import { AppText, Box, Icon, Row, Touchable } from '../../../../shared/components';
import { CardCounter } from '../CardCounter/CardCounter';
import { SwitchToggle } from '../SwitchToggle/SwitchToggle';
import { styles } from './CarePlusCard.styles';

type Props = {
  label: string;
  on: boolean;
  onToggle: () => void;
  cards: number;
  onCards: (n: number) => void;
  maxCards: number;
};

export function CarePlusCard({ label, on, onToggle, cards, onCards, maxCards }: Props) {
  return (
    <Box style={styles.card}>
      <Touchable
        onPress={onToggle}
        accessibilityRole="switch"
        accessibilityState={{ checked: on }}
        accessibilityLabel={label}
        style={({ pressed }) => [styles.top, pressed && styles.dim]}
      >
        <Icon name="star" size={22} />
        <Row style={styles.topInner}>
          <AppText style={styles.label}>{label}</AppText>
          <SwitchToggle on={on} />
        </Row>
      </Touchable>
      <CardCounter on={on} cards={cards} maxCards={maxCards} onCards={onCards} />
    </Box>
  );
}
