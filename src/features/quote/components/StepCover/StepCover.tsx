import React from 'react';
import { Box, Scroll } from '../../../../shared/components';
import { CARDS_MAX, OPTIONALS, OptionalKey } from '../../../../shared/data/products';
import { useI18n } from '../../../../shared/i18n';
import { useFooterInset } from '../../hooks/useFooterInset';
import { CarePlusCard } from '../CarePlusCard/CarePlusCard';
import { CoverCard } from '../CoverCard/CoverCard';
import { OptionCard } from '../OptionCard/OptionCard';
import { OptionalsHeader } from '../OptionalsHeader/OptionalsHeader';
import { bottomInset, styles } from './StepCover.styles';

type Props = {
  cover: number;
  onCover: (n: number) => void;
  optionals: OptionalKey[];
  onToggle: (key: OptionalKey) => void;
  cards: number;
  onCards: (n: number) => void;
};

export function StepCover({ cover, onCover, optionals, onToggle, cards, onCards }: Props) {
  const { t } = useI18n();
  const bottom = useFooterInset();

  return (
    <Scroll
      contentContainerStyle={[styles.body, bottomInset(bottom)]}
      showsVerticalScrollIndicator={false}
    >
      <CoverCard cover={cover} onCover={onCover} />
      <OptionalsHeader />
      <Box style={styles.cards}>
        {OPTIONALS.map((o) =>
          o.perCard ? (
            <CarePlusCard
              key={o.key}
              label={t(o.label)}
              on={optionals.includes(o.key)}
              onToggle={() => onToggle(o.key)}
              cards={cards}
              onCards={onCards}
              maxCards={CARDS_MAX}
            />
          ) : (
            <OptionCard
              key={o.key}
              label={t(o.label)}
              on={optionals.includes(o.key)}
              onToggle={() => onToggle(o.key)}
            />
          ),
        )}
      </Box>
    </Scroll>
  );
}
