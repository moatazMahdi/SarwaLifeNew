import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppImage, AppText, Box, Row } from '../../../../shared/components';
import { money } from '../../../../shared/data/products';
import type { Product } from '../../../../shared/data/products';
import { PRODUCT_ART } from '../../../../shared/data/productArt';
import { S, useI18n } from '../../../../shared/i18n';
import { FILL, styles } from './PolicyChip.styles';

type Props = { product: Product; cover?: number; monthly?: number; compact?: boolean };

export function PolicyChip({ product, cover, monthly, compact }: Props) {
  const { t } = useI18n();
  const currency = t(S.common.currency);

  const body = (
    <>
      <Box style={[styles.tile, compact && styles.tileCompact]}>
        <AppImage source={PRODUCT_ART[product.key]} style={styles.art} resizeMode="contain" />
      </Box>
      <Box style={styles.text}>
        {compact ? <AppText style={styles.kicker}>{t(S.checkout.chip.kicker)}</AppText> : null}
        <AppText style={styles.title} numberOfLines={compact ? 2 : 1}>
          {t(product.title)}
        </AppText>
        {compact ? null : (
          <Row style={styles.figures}>
            <Row style={styles.figure}>
              <AppText style={styles.figLabel}>{t(S.checkout.chip.cover)}</AppText>
              <AppText style={styles.figValue}>{`${money(cover ?? 0)} ${currency}`}</AppText>
            </Row>
            <Box style={styles.rule} />
            <Row style={styles.figure}>
              <AppText style={styles.figValueSm}>{`${money(monthly ?? 0)} ${currency}`}</AppText>
              <AppText style={styles.figLabel}>{t(S.common.monthly)}</AppText>
            </Row>
          </Row>
        )}
      </Box>
    </>
  );

  if (compact) return <Row style={[styles.chip, styles.chipCompact]}>{body}</Row>;

  return (
    <LinearGradient {...FILL} style={styles.chip}>
      {body}
    </LinearGradient>
  );
}
