import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppText, Box } from '../../../../shared/components';
import { money, QuoteResult } from '../../../../shared/data/products';
import { S, useI18n } from '../../../../shared/i18n';
import { BreakRow } from '../BreakRow/BreakRow';
import { TOTAL_FILL, styles } from './BreakdownCard.styles';

export function BreakdownCard({ result }: { result: QuoteResult }) {
  const { t } = useI18n();
  const egp = t(S.common.currency);

  return (
    <>
      <Box style={styles.rule} />
      <Box style={styles.block}>
        <AppText style={styles.title}>{t(S.quote.offer.breakdownTitle)}</AppText>
        <Box style={styles.card}>
          <BreakRow label={t(S.quote.offer.core)} amount={`${money(result.core)} ${egp}`} />
          {result.lines.map((l) => (
            <BreakRow key={l.key} label={t(l.label)} amount={`+${money(l.amount)} ${egp}`} accent />
          ))}
          <LinearGradient {...TOTAL_FILL} style={styles.total}>
            <AppText style={styles.totalLabel}>{t(S.quote.offer.total)}</AppText>
            <AppText style={styles.totalValue}>{`${money(result.yearly)} ${egp}`}</AppText>
          </LinearGradient>
        </Box>
      </Box>
    </>
  );
}
