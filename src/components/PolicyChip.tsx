import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients, typography } from '../theme';
import { money } from '../data/products';
import type { Product } from '../data/products';
import { PRODUCT_ART } from '../data/productArt';
import { S, useI18n } from '../i18n';

/**
 * Figma 2071:5591 — the strip that reminds the user, on every step of issuance, which
 * policy they are actually buying. The quote is already decided by the time this flow
 * starts, so the strip is pure read-back: no control, no chevron, nothing to tap.
 *
 * The comp's own figures are placeholders that contradict each other (it labels 2,664 —
 * the annual premium on the final screen — as "التغطية"). The labels are the part that
 * carries meaning, so they are bound to the matching numbers rather than copied literally:
 * التغطية takes the cover, شهرياً takes the monthly premium.
 *
 * `compact` is the second cut the file draws, on the beneficiaries step (2071:5859): the
 * same tile and title over a plain white card, with the figures dropped and a "المنتج"
 * label in their place. That step is about *who gets paid*, so repeating *how much* there
 * would pull the eye away from the one answer the screen exists to give.
 */
export function PolicyChip({
  product,
  cover,
  monthly,
  compact,
}: {
  product: Product;
  cover?: number;
  monthly?: number;
  compact?: boolean;
}) {
  const { t } = useI18n();
  const currency = t(S.common.currency);

  // RTL: the tile is written first so it takes the row's start — physical right, which is
  // where the comp draws it — and the text block runs away from it toward the far edge.
  const body = (
    <>
      <View style={[styles.tile, compact && styles.tileCompact]}>
        {/* The badge artwork the home screen uses, not the 24px line glyph under the same
            key in `iconXml`: those two are different drawings, and this is the one the
            design puts on a tile. */}
        <Image source={PRODUCT_ART[product.key]} style={styles.art} resizeMode="contain" />
      </View>

      <View style={styles.text}>
        {compact ? <Text style={styles.kicker}>{t(S.checkout.chip.kicker)}</Text> : null}

        <Text style={styles.title} numberOfLines={compact ? 2 : 1}>
          {t(product.title)}
        </Text>

        {compact ? null : (
          <View style={styles.figures}>
            <View style={styles.figure}>
              <Text style={styles.figLabel}>{t(S.checkout.chip.cover)}</Text>
              {/* Figure and currency live in one node so the pair resolves as a single
                  run — "300,000" is comma-joined, so it never splits across directions. */}
              <Text style={styles.figValue}>{`${money(cover ?? 0)} ${currency}`}</Text>
            </View>

            <View style={styles.rule} />

            {/* Mirror of the group above: here the amount leads and its unit trails, which
                is how "95 ج.م شهرياً" is spoken. */}
            <View style={styles.figure}>
              <Text style={styles.figValueSm}>{`${money(monthly ?? 0)} ${currency}`}</Text>
              <Text style={styles.figLabel}>{t(S.common.monthly)}</Text>
            </View>
          </View>
        )}
      </View>
    </>
  );

  if (compact) return <View style={[styles.chip, styles.chipCompact]}>{body}</View>;

  return (
    <LinearGradient
      colors={gradients.brandSoft.colors as unknown as [string, string, ...string[]]}
      useAngle
      angle={139}
      style={styles.chip}
    >
      {body}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,105,87,0.1)',
  },
  chipCompact: { backgroundColor: colors.white },
  text: { flex: 1, gap: 10 },
  kicker: { ...typography.chipLabel, color: colors.g5, textAlign: 'auto' },
  // The product name, repeated on every issuance step — set to the weight and size it
  // carries on the home page, where the user chose it.
  title: {
    ...typography.optTitle,
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: -0.3,
    color: '#000000',
    textAlign: 'auto',
  },

  figures: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  figure: { flexDirection: 'row', alignItems: 'baseline', gap: 3 },
  figLabel: { ...typography.cardBody, fontSize: 11.5, color: colors.g5 },
  figValue: { ...typography.optTitle, fontSize: 16, lineHeight: 22.5, color: colors.green },
  figValueSm: { ...typography.optTitle, fontSize: 14, lineHeight: 22.5, color: colors.green },
  rule: { width: 16, height: 3, backgroundColor: colors.green },

  tile: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // On the white card the tile would vanish into its background, so the comp inverts the
  // relationship and tints the tile instead.
  tileCompact: { backgroundColor: 'rgba(0,105,87,0.1)' },
  art: { width: 34, height: 34 },
});
