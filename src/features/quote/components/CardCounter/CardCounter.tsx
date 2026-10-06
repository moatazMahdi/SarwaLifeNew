import React from 'react';
import { AppText, Button, Row } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { styles } from './CardCounter.styles';

type Props = { on: boolean; cards: number; maxCards: number; onCards: (n: number) => void };

export function CardCounter({ on, cards, maxCards, onCards }: Props) {
  const { t, n } = useI18n();

  return (
    <Row style={styles.bottom}>
      <AppText style={styles.caption}>{t(S.quote.cover.cards.label)}</AppText>
      <Row style={styles.counter}>
        <Button
          variant="counter"
          label="−"
          accessibilityLabel={t(S.quote.cover.cards.less)}
          disabled={!on || cards <= 1}
          onPress={() => onCards(Math.max(1, cards - 1))}
        />
        <AppText style={[styles.value, !on && styles.valueOff]}>{n(cards)}</AppText>
        <Button
          variant="counter"
          label="+"
          accessibilityLabel={t(S.quote.cover.cards.more)}
          disabled={!on || cards >= maxCards}
          onPress={() => onCards(Math.min(maxCards, cards + 1))}
        />
      </Row>
    </Row>
  );
}
