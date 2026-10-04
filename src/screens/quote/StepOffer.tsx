import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { colors, typography } from '../../theme';
import { Icon } from '../../components/Icon';
import { money, QuoteResult } from '../../data/products';
import { S, useI18n } from '../../i18n';
import { useFooterInset } from './QuoteChrome';

type Props = { cover: number; result: QuoteResult };

/** Figma 2065:3216 — "العرض". */
export function StepOffer({ cover, result }: Props) {
  const { t } = useI18n();
  const bottom = useFooterInset(52);
  const egp = t(S.common.currency);

  return (
    <ScrollView
      contentContainerStyle={[styles.body, { paddingBottom: bottom }]}
      showsVerticalScrollIndicator={false}
    >
      {/* قسطك المقدّر — Figma 2066:3343 */}
      <View style={styles.hero}>
        <LinearGradient
          colors={['#0C7A65', '#00705C', '#054A3D']}
          locations={[0, 0.42, 1]}
          useAngle
          angle={151.42}
          style={StyleSheet.absoluteFill}
        />
        <Glow id="offA" size={280} tint="255,255,255" opacity={0.2} fade={0.68} style={styles.glowA} />
        <Glow id="offB" size={220} tint="228,205,142" opacity={0.26} fade={0.7} style={styles.glowB} />
        <Image
          source={require('../../assets/hero-watermark.png')}
          style={styles.watermark}
          resizeMode="cover"
        />
        <View style={styles.heroHighlight} />

        <View style={styles.heroBody}>
          <View style={styles.heroTop}>
            <Text style={styles.heroCaption}>{t(S.quote.offer.caption)}</Text>
            {/* RTL: amount first → physically right, "ج.م" second → physically left. */}
            <View style={styles.amountRow}>
              <CountUp value={result.yearly} />
              <Text style={styles.amountUnit}>{egp}</Text>
            </View>
          </View>

          {/* RTL: the shield is rendered first so it sits at the chip's right end. */}
          <View style={styles.chip}>
            <Icon name="shieldSm" size={15} />
            <Text style={styles.chipText}>
              {`${t(S.quote.offer.chip)} ${money(cover)} ${egp}`}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.rule} />

      {/* تفاصيل احتساب القسط */}
      <View style={styles.detailBlock}>
        <Text style={styles.detailTitle}>{t(S.quote.offer.breakdownTitle)}</Text>

        <View style={styles.detailCard}>
          <BreakRow label={t(S.quote.offer.core)} amount={`${money(result.core)} ${egp}`} />
          {result.lines.map((l) => (
            <BreakRow
              key={l.key}
              label={t(l.label)}
              amount={`+${money(l.amount)} ${egp}`}
              accent
            />
          ))}

          <LinearGradient
            colors={['#F1F8F6', '#E7F2EE']}
            useAngle
            angle={140.87}
            style={styles.totalRow}
          >
            <Text style={styles.totalLabel}>{t(S.quote.offer.total)}</Text>
            <Text style={styles.totalValue}>{`${money(result.yearly)} ${egp}`}</Text>
          </LinearGradient>
        </View>
      </View>

      {/* ملاحظة — Figma 2066:3399 */}
      <View style={styles.note}>
        <View style={styles.noteBar} />
        <View style={styles.noteRow}>
          {/* RTL: the icon is rendered first so it sits physically right of the copy. */}
          <Icon name="infoCircle" size={19} />
          <Text style={styles.noteText}>{t(S.quote.offer.note)}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

/**
 * Rolls the estimated premium up from zero, then pops once and settles — the number is
 * the whole point of this screen, so it earns the beat of attention.
 */
function CountUp({ value }: { value: number }) {
  const [shown, setShown] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progress.setValue(0);
    pop.setValue(0);
    setShown(0);

    // `useNativeDriver` is off by necessity — the value has to come back to JS to be
    // formatted — so the listener is deduped to avoid a setState on every single frame.
    let lastEmitted = -1;
    const id = progress.addListener(({ value: t }) => {
      const next = Math.round(t * value);
      if (next !== lastEmitted) {
        lastEmitted = next;
        setShown(next);
      }
    });

    const run = Animated.timing(progress, {
      toValue: 1,
      duration: 900,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    });
    run.start(({ finished }) => {
      if (!finished) return;
      setShown(value);
      Animated.sequence([
        Animated.spring(pop, { toValue: 1, friction: 4.5, tension: 240, useNativeDriver: true }),
        Animated.spring(pop, { toValue: 0, friction: 6, tension: 190, useNativeDriver: true }),
      ]).start();
    });

    return () => {
      progress.removeListener(id);
      run.stop();
    };
  }, [value, progress, pop]);

  const scale = pop.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] });

  return (
    <Animated.Text style={[styles.amount, { transform: [{ scale }] }]}>
      {money(shown)}
    </Animated.Text>
  );
}

function BreakRow({
  label,
  amount,
  accent,
}: {
  label: string;
  amount: string;
  accent?: boolean;
}) {
  return (
    <View style={styles.breakRow}>
      {/* RTL: label first → physically right, amount second → physically left. */}
      <Text style={styles.breakLabel}>{label}</Text>
      <Text style={[styles.breakAmount, accent && styles.breakAmountOn]}>{amount}</Text>
    </View>
  );
}

function Glow({
  id,
  size,
  tint,
  opacity,
  fade,
  style,
}: {
  id: string;
  size: number;
  tint: string;
  opacity: number;
  fade: number;
  style: object;
}) {
  const r = size / 2;
  return (
    <Svg width={size} height={size} style={style} pointerEvents="none">
      <Defs>
        <RadialGradient id={id} cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={`rgb(${tint})`} stopOpacity={opacity} />
          <Stop offset={String(fade)} stopColor={`rgb(${tint})`} stopOpacity={opacity * 0.3} />
          <Stop offset="1" stopColor={`rgb(${tint})`} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Circle cx={r} cy={r} r={r} fill={`url(#${id})`} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 20, paddingTop: 12, gap: 18 },

  hero: {
    height: 163,
    borderRadius: 26,
    overflow: 'hidden',
    justifyContent: 'center',
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 22 },
    shadowOpacity: 0.45,
    shadowRadius: 22,
    elevation: 8,
  },
  glowA: { position: 'absolute', left: -90, top: -170.25 },
  glowB: { position: 'absolute', left: 186, top: 130 },
  watermark: {
    position: 'absolute',
    right: -14,
    top: -20.25,
    width: 120,
    height: 120,
    opacity: 0.17,
  },
  // Figma: `inset 0 1px 0 rgba(255,255,255,0.18)`
  heroHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },

  heroBody: { alignItems: 'center', gap: 16 },
  heroTop: { alignItems: 'center', gap: 8 },
  heroCaption: {
    ...typography.premiumCaption,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
  },
  amountRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  amount: { ...typography.premiumAmount, color: colors.white },
  amountUnit: { ...typography.premiumUnit, color: colors.white },

  chip: {
    height: 31.25,
    borderRadius: 14,
    backgroundColor: 'rgba(6,90,74,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chipText: { ...typography.chipLabel, color: colors.white },

  rule: { height: 1, backgroundColor: colors.qRule },

  detailBlock: { gap: 16 },
  detailTitle: { ...typography.optTitle, color: colors.qInkD, textAlign: 'auto' },
  detailCard: {
    backgroundColor: colors.qCardBg,
    borderWidth: 1,
    borderColor: colors.qCardBr,
    borderRadius: 12,
    padding: 16,
    gap: 18,
  },
  breakRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  breakLabel: { ...typography.rowLabel, color: colors.qGreyRow, textAlign: 'auto', flex: 1 },
  breakAmount: { ...typography.rowAmount, color: colors.qInkD },
  breakAmountOn: { color: colors.green },

  totalRow: {
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  totalLabel: { ...typography.totalText, color: colors.ink },
  totalValue: { ...typography.totalText, color: colors.green },

  note: {
    backgroundColor: colors.warnBg2,
    borderRadius: 13,
    overflow: 'hidden',
  },
  // The comp pins the rule to `right`, which under RTL is the row's start — the same edge
  // the icon takes. Written as `start` so the rule stays on the reading edge under LTR
  // instead of stranding itself opposite the glyph it belongs to.
  noteBar: {
    position: 'absolute',
    start: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: colors.gold,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    // Logical, not physical: the tight inset belongs beside the rule and icon, the wide
    // one opposite them. Same numbers as the comp under RTL, mirrored under LTR.
    paddingEnd: 31,
    paddingStart: 11,
    paddingVertical: 11.81,
  },
  noteText: { ...typography.bodyText, color: colors.goldTx, textAlign: 'auto', flex: 1 },
});
