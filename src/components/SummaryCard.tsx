import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients, typography } from '../theme';
import { Icon } from './Icon';
import { Phrase, useI18n } from '../i18n';

/**
 * Figma 2071:5500 / 2071:6284 — the read-back card used on the issuance steps. Rows are
 * label-on-the-start, value-on-the-end, hairline-separated.
 *
 * Two tones, both drawn in the file: `brand` for the confirmation step, where every row is
 * a fact the user has just had verified and carries a tick, and `plain` for the payment and
 * issued summaries, which are quieter because they sit under a heading of their own.
 *
 * The tone also decides the value colour — green on the brand card, black on the plain one,
 * where green is reserved for the single figure that matters. That travels down a context
 * rather than a prop so a caller cannot write a row that disagrees with its own card.
 */

const ToneContext = React.createContext<'brand' | 'plain'>('brand');

export function SummaryCard({
  tone = 'brand',
  children,
  footer,
}: {
  tone?: 'brand' | 'plain';
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  // Rows arrive as a list; the hairlines are woven in here so no caller has to remember to
  // leave one out after the last row.
  const rows = React.Children.toArray(children).filter(Boolean);
  return (
    <ToneContext.Provider value={tone}>
      {/* The comp pads the card evenly at 24 and only tightens the bottom when something
          follows the rows — the edit pill on step 1 — whose own height makes up the rest. */}
      <View
        style={[
          styles.card,
          tone === 'plain' && styles.cardPlain,
          footer ? styles.cardFooted : null,
        ]}
      >
        <View style={styles.rows}>
          {rows.map((row, i) => (
            <React.Fragment key={i}>
              {i > 0 ? <View style={styles.rule} /> : null}
              {row}
            </React.Fragment>
          ))}
        </View>
        {footer}
      </View>
    </ToneContext.Provider>
  );
}

export function SummaryRow({
  label,
  value,
  unit,
  verified,
  strong,
  accent,
}: {
  label: Phrase;
  /** Already-formatted data — a name, a reference, a figure — so it is not translatable. */
  value: string;
  /**
   * Trails the value at the row's own text size. The premium rows set their figure at 32px
   * but keep "ج.م" at 16, so the unit cannot be folded into `value` as one string.
   */
  unit?: Phrase;
  /** Draws the brand tick that marks a field as read off the verified ID card. */
  verified?: boolean;
  /** The premium line, which the comp sets two steps larger than the rows above it. */
  strong?: boolean;
  /**
   * Forces the brand tint on a plain card. Used for the policy number, which is the one
   * black-card row the design singles out because it is what the user will be asked to
   * quote back to a call centre.
   */
  accent?: boolean;
}) {
  const { t } = useI18n();
  const green = React.useContext(ToneContext) === 'brand' || accent;
  return (
    <View style={styles.row}>
      {/* RTL: the label is written first so it takes the row's start — physical right — and
          the value settles against the far edge. */}
      <Text style={[styles.label, strong && styles.labelStrong]}>{t(label)}</Text>

      <View style={[styles.valueGroup, strong && styles.valueGroupStrong]}>
        {/* The figure and its unit are two sibling texts, not one text with the unit nested
            inside it. Nested, "ج.م" was dropping to a line of its own — and pinning the
            parent to `numberOfLines={1}` to stop that made it worse, because Android
            measures a Text containing differently-sized spans with the outer span's metrics
            and ellipsised a three-digit premium down to "32…". As siblings in a row that
            does not wrap, the pair physically cannot split, and nothing has to be clamped. */}
        <Text
          style={[styles.value, green && styles.valueAccent, strong && styles.valueStrong]}
          numberOfLines={strong ? 1 : 2}
        >
          {value}
        </Text>
        {unit ? (
          <Text style={[styles.unit, strong && styles.unitStrong]}>{t(unit)}</Text>
        ) : null}
        {verified ? (
          <LinearGradient
            colors={gradients.brand.colors as unknown as [string, string, ...string[]]}
            locations={gradients.brand.locations as unknown as [number, number, ...number[]]}
            useAngle
            angle={145}
            style={styles.tick}
          >
            <Icon name="check" size={9} color={colors.white} />
          </LinearGradient>
        ) : null}
      </View>
    </View>
  );
}

/**
 * The confirmation step's read-back (Figma 2071:5500): six short facts in two columns,
 * each one a caption sitting directly above its value.
 *
 * Not `SummaryRow`. Those rows push the label and the value to opposite edges of the card,
 * which works for three or four figures the user is checking one at a time, but turns six
 * identity fields into a column of grey on the right and a column of black on the left with
 * a canyon between them — the eye has to cross the whole card to pair a label with what it
 * labels. Stacked, each pair reads as one unit, and two of them fit side by side.
 *
 * The fields are laid out as plain wrapping flex children at half width rather than as two
 * explicit columns, so a seventh field needs no new scaffolding and an odd count leaves the
 * last cell at half width instead of stretching it to fill the row.
 */
export function SummaryGrid({ children }: { children: React.ReactNode }) {
  return <View style={styles.grid}>{children}</View>;
}

export function SummaryField({ label, value }: { label: Phrase; value: string }) {
  const { t } = useI18n();
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{t(label)}</Text>
      <Text style={styles.fieldValue} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

/** A row whose value runs to several lines and so sits under its own label. */
export function SummaryBlock({ label, value }: { label: Phrase; value: string }) {
  const { t } = useI18n();
  return (
    <View style={styles.block}>
      <Text style={styles.label}>{t(label)}</Text>
      <View style={styles.blockBody}>
        <Text style={styles.blockValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // The comp fills with its darkest brand green at 5% and borders with the same hue at
    // 12% — not `colors.greenD`, which is a neighbouring shade and reads visibly bluer.
    backgroundColor: 'rgba(5,74,61,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(5,74,61,0.12)',
    borderRadius: 16,
    padding: 24,
    gap: 20,
  },
  cardFooted: { paddingBottom: 12 },
  cardPlain: {
    backgroundColor: colors.white,
    borderColor: colors.br,
  },

  rows: { gap: 12 },
  rule: { height: 1, backgroundColor: 'rgba(5,74,61,0.12)' },

  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  label: { ...typography.helperText, fontSize: 13, lineHeight: 17, color: '#4A4E63', textAlign: 'auto' },
  // The premium row is the one the eye should land on, so the comp grows its label too —
  // not just the figure — rather than letting a 13px caption dangle off a 32px number.
  labelStrong: { fontSize: 17, lineHeight: 24, flexShrink: 1 },

  // 6, not 8: the unit is part of the quantity, so it sits closer to the figure than the
  // verification tick — which is a separate mark about the row — sits to either of them.
  valueGroup: { flexShrink: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  valueGroupStrong: { flexShrink: 0 },
  value: {
    ...typography.optSubtitle,
    fontSize: 16,
    lineHeight: 21,
    color: '#000000',
    textAlign: 'auto',
    flexShrink: 1,
  },
  valueAccent: { color: colors.green },
  valueStrong: {
    ...typography.premiumAmount,
    fontSize: 25,
    lineHeight: 36,
    letterSpacing: -0.6,
    color: colors.green,
    // Beats the 1 on `value`: the strong row must keep its figure whole and let the label
    // give way instead, which is the reverse of how the plain rows share the width.
    flexShrink: 0,
  },
  // Never gives way: if a row runs out of width it is the label that shrinks, because an
  // amount without its currency is not a smaller fact, it is a wrong one.
  unit: {
    ...typography.optSubtitle,
    fontSize: 16,
    lineHeight: 21,
    color: colors.green,
    flexShrink: 0,
  },
  unitStrong: { fontSize: 14 },

  tick: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  grid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 18, columnGap: 12 },
  // Half the card minus half the column gap — two per line, and the pair stays aligned
  // whatever the values turn out to be.
  field: { width: '47%', gap: 4 },
  fieldLabel: {
    ...typography.helperText,
    fontSize: 13,
    lineHeight: 17,
    color: '#8A8FA3',
    textAlign: 'auto',
  },
  fieldValue: {
    ...typography.optSubtitle,
    fontSize: 15.5,
    lineHeight: 23,
    color: '#000000',
    textAlign: 'auto',
  },

  block: { gap: 12 },
  blockBody: {
    backgroundColor: 'rgba(0,105,87,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.qRule,
    padding: 12,
  },
  blockValue: {
    ...typography.optSubtitle,
    fontSize: 16,
    lineHeight: 25,
    color: '#000000',
    textAlign: 'auto',
  },
});
