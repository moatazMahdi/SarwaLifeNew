import React from 'react';
import { money, Product } from '../../../../shared/data/products';
import { S, useI18n } from '../../../../shared/i18n';
import { SummaryBlock } from '../SummaryBlock/SummaryBlock';
import { SummaryCard } from '../SummaryCard/SummaryCard';
import { SummaryRow } from '../SummaryRow/SummaryRow';

type Props = { product: Product; cover: number; covers: string; yearly: number };

export function PaymentSummary({ product, cover, covers, yearly }: Props) {
  const { t } = useI18n();
  return (
    <SummaryCard tone="plain">
      <SummaryRow label={S.checkout.summary.product} value={t(product.title)} />
      <SummaryRow
        label={S.checkout.summary.sumInsured}
        value={`${money(cover)} ${t(S.common.currency)}`}
      />
      <SummaryBlock label={S.checkout.summary.covers} value={covers} />
      <SummaryRow
        label={S.checkout.summary.yearlyPremium}
        value={money(yearly)}
        unit={S.common.currency}
        strong
      />
    </SummaryCard>
  );
}
