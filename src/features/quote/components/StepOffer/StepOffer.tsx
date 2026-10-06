import React from 'react';
import { InfoNote, Scroll } from '../../../../shared/components';
import { S, useI18n } from '../../../../shared/i18n';
import { QuoteResult } from '../../../../shared/data/products';
import { useFooterInset } from '../../hooks/useFooterInset';
import { BreakdownCard } from '../BreakdownCard/BreakdownCard';
import { OfferHero } from '../OfferHero/OfferHero';
import { bottomInset, styles } from './StepOffer.styles';

type Props = { cover: number; result: QuoteResult };

export function StepOffer({ cover, result }: Props) {
  const { t } = useI18n();
  const bottom = useFooterInset(52);

  return (
    <Scroll
      contentContainerStyle={[styles.body, bottomInset(bottom)]}
      showsVerticalScrollIndicator={false}
    >
      <OfferHero cover={cover} yearly={result.yearly} />
      <BreakdownCard result={result} />
      <InfoNote text={t(S.quote.offer.note)} />
    </Scroll>
  );
}
