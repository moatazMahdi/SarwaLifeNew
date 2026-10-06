import React from 'react';
import { AppText, SafeArea, Scroll } from '../../../../shared/components';
import { money, Product } from '../../../../shared/data/products';
import { S, useI18n } from '../../../../shared/i18n';
import { SuccessSeal } from '../SuccessSeal/SuccessSeal';
import { SummaryCard } from '../SummaryCard/SummaryCard';
import { SummaryRow } from '../SummaryRow/SummaryRow';
import { styles } from './IssuedBody.styles';

type Props = { product: Product; policyNumber: string; cover: number; yearly: number };

export function IssuedBody({ product, policyNumber, cover, yearly }: Props) {
  const { t } = useI18n();
  return (
    <Scroll contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
      <SafeArea edges={['top']} style={styles.hero}>
        <SuccessSeal />
        <AppText style={styles.title} allowFontScaling={false}>
          {t(S.checkout.issued.title)}
        </AppText>
        <AppText style={styles.subtitle}>{t(S.checkout.issued.subtitle)}</AppText>
      </SafeArea>
      <SummaryCard tone="plain">
        <SummaryRow label={S.checkout.summary.policyNumber} value={policyNumber} accent />
        <SummaryRow label={S.checkout.summary.product} value={t(product.title)} />
        <SummaryRow
          label={S.checkout.summary.sumInsured}
          value={`${money(cover)} ${t(S.common.currency)}`}
        />
        <SummaryRow
          label={S.checkout.summary.yearlyPremium}
          value={money(yearly)}
          unit={S.common.currency}
          strong
        />
      </SummaryCard>
    </Scroll>
  );
}
