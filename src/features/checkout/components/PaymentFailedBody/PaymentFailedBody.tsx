import React from 'react';
import { AppText, Box, FailureSeal, SafeArea } from '../../../../shared/components';
import { money, Product } from '../../../../shared/data/products';
import { Phrase, S, useI18n } from '../../../../shared/i18n';
import { SummaryCard } from '../SummaryCard/SummaryCard';
import { SummaryRow } from '../SummaryRow/SummaryRow';
import { styles } from './PaymentFailedBody.styles';

type Props = { product: Product; methodLabel: Phrase; amount: number };

export function PaymentFailedBody({ product, methodLabel, amount }: Props) {
  const { t } = useI18n();
  return (
    <Box style={styles.body}>
      <SafeArea edges={['top']} style={styles.hero}>
        <FailureSeal />
        <AppText style={styles.title} allowFontScaling={false}>
          {t(S.checkout.failed.title)}
        </AppText>
        <AppText style={styles.subtitle}>{t(S.checkout.failed.subtitle)}</AppText>
      </SafeArea>
      <SummaryCard tone="plain">
        <SummaryRow label={S.checkout.summary.product} value={t(product.title)} />
        <SummaryRow label={S.checkout.summary.method} value={t(methodLabel)} />
        <SummaryRow
          label={S.checkout.summary.amountDue}
          value={money(amount)}
          unit={S.common.currency}
          strong
        />
      </SummaryCard>
    </Box>
  );
}
