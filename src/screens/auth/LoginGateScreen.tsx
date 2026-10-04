import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, gradients, typography } from '../../theme';
import { Icon } from '../../components/Icon';
import { money } from '../../data/products';
import { useFlow } from '../../state/FlowContext';
import { S, useI18n } from '../../i18n';
import { AuthTopBar } from './AuthTopBar';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** Figma 2068:3539 — "قبل إصدار وثيقتك". */
export function LoginGateScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const flow = useFlow();
  const product = route?.params?.product ?? flow.productKey ?? undefined;
  const yearly = flow.result?.yearly ?? 0;

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <AuthTopBar onBack={() => navigation?.goBack()} />

      {/* Profile Details — Figma 2068:3554 */}
      <View style={styles.intro}>
        {yearly > 0 ? (
          <LinearGradient
            colors={gradients.brandSoft.colors as unknown as [string, string, ...string[]]}
            useAngle
            angle={144.49}
            style={styles.premium}
          >
            {/* RTL: the tile is rendered first so it lands at the panel's physical right. */}
            <View style={styles.premiumTile}>
              <Icon name="money" size={22} />
            </View>
            <Text style={styles.premiumLabel}>{t(S.auth.gate.premiumLabel)}</Text>
            {/* Figma pins this group to 101px with the two runs pushed apart. */}
            <View style={styles.premiumAmountRow}>
              {/*
                One <Text>: the bidi run resolves RTL off "ج.م", which places the figure on
                the physical right and the currency to its left — exactly as Figma renders
                it. Splitting it into two views would freeze the wrong order.
              */}
              <Text style={styles.premiumValue}>
                {money(yearly)}
                <Text style={styles.premiumUnit}> {t(S.common.currency)}</Text>
              </Text>
              <Text style={styles.premiumCycle}>{t(S.common.yearly)}</Text>
            </View>
          </LinearGradient>
        ) : null}

        <View style={styles.titleBlock}>
          <Text style={styles.title}>{t(S.auth.gate.title)}</Text>
          <Text style={styles.subtitle}>{t(S.auth.gate.subtitle)}</Text>
        </View>
      </View>

      {/* General Section — Figma 2068:3572 */}
      <View style={styles.section}>
        <View style={styles.stack}>
          <View style={styles.rows}>
            <GateRow
              primary
              label={t(S.auth.gate.existing)}
              icon={<Icon name="personCheck" size={24} />}
              onPress={() => navigation?.navigate('LoginPhone', { product })}
            />
            <GateRow
              label={t(S.auth.gate.newCustomer)}
              icon={<Icon name="personPlus" size={24} />}
              onPress={() => navigation?.navigate('SignupPhone', { product })}
            />
          </View>

          {/* ملاحظة — Figma 2068:3725 */}
          <View style={styles.note}>
            <View style={styles.noteBar} />
            <View style={styles.noteRow}>
              {/* RTL: the icon is rendered first so it sits physically right of the copy. */}
              <Icon name="infoCircle" size={19} />
              <Text style={styles.noteText}>{t(S.auth.gate.note)}</Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => navigation?.goBack()}
          accessibilityRole="link"
          style={({ pressed }) => pressed && styles.pressedLink}
        >
          <Text style={styles.browse}>{t(S.auth.gate.browse)}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

/**
 * One of the two answers. Figma 2068:3691 (green) / 2068:3709 (white): a 46px icon tile at
 * the physical right, the label filling the middle, and a chevron closing the row on the
 * left. The card lifts on mount and compresses on press.
 */
function GateRow({
  label,
  icon,
  primary,
  onPress,
}: {
  label: string;
  icon: React.ReactNode;
  primary?: boolean;
  onPress: () => void;
}) {
  const press = useRef(new Animated.Value(0)).current;
  const enter = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(enter, {
      toValue: 1,
      duration: 320,
      delay: primary ? 60 : 130,
      useNativeDriver: true,
    }).start();
  }, [enter, primary]);

  const spring = (to: number) =>
    Animated.spring(press, { toValue: to, friction: 9, tension: 230, useNativeDriver: true }).start();

  const scale = press.interpolate({ inputRange: [0, 1], outputRange: [1, 0.975] });
  const lift = enter.interpolate({ inputRange: [0, 1], outputRange: [14, 0] });

  const body = (
    <>
      {/* RTL: the tile is rendered first so it lands at the row's physical right. */}
      {primary ? (
        <View style={[styles.rowTile, styles.rowTileOn]}>{icon}</View>
      ) : (
        <LinearGradient
          colors={gradients.brandSoft.colors as unknown as [string, string, ...string[]]}
          useAngle
          angle={140}
          style={[styles.rowTile, styles.rowTileOff]}
        >
          {icon}
        </LinearGradient>
      )}
      <View style={styles.rowMid}>
        {/* RTL: label first → physically right of the chevron, which closes the row. */}
        <Text style={[styles.rowLabel, primary && styles.rowLabelOn]}>{label}</Text>
        {/* The chevron points the way the reading runs, so the path is drawn pre-mirrored
            for Arabic — `directional` turns it back round under LTR. */}
        <Icon
          name="chevronEnd"
          width={7.25}
          height={12.75}
          color={primary ? 'rgba(255,255,255,0.8)' : '#595959'}
          directional
        />
      </View>
    </>
  );

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => spring(1)}
      onPressOut={() => spring(0)}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[
        primary ? styles.rowShadow : null,
        { opacity: enter, transform: [{ scale }, { translateY: lift }] },
      ]}
    >
      {primary ? (
        <LinearGradient
          colors={['#0C7A65', '#00705C', '#054A3D']}
          locations={[0, 0.42, 1]}
          useAngle
          angle={149.04}
          style={styles.row}
        >
          {body}
        </LinearGradient>
      ) : (
        <View style={[styles.row, styles.rowPlain]}>{body}</View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },

  /* Profile Details — 402×182, px20 py12, gap 24 */
  intro: { paddingHorizontal: 20, paddingVertical: 12, gap: 24 },

  premium: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,105,87,0.1)',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  premiumTile: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(0,105,87,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumLabel: { ...typography.rowLabel, color: colors.g5, textAlign: 'auto', flex: 1 },
  // Figma pins this group to 101px and pushes the amount and the cycle to its two ends.
  // That is a width measured against Arabic: "١٬٦٣٥ ج.م" + "سنوياً" sits inside it, but
  // "1,635 EGP" + "per year" does not, and `space-between` has no negative space to give —
  // the two runs ran together as "1,635 EGPper year". `minWidth` keeps the comp's spread
  // whenever the content is narrower, and the `gap` is the floor the row can never close
  // past, so the longer language simply grows the group instead of welding it shut.
  premiumAmountRow: {
    minWidth: 101,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 6,
  },
  premiumValue: { ...typography.authAmount, color: colors.green },
  premiumUnit: { fontSize: 12, lineHeight: 22.5 },
  premiumCycle: { ...typography.chipLabel, color: colors.g5 },

  titleBlock: { gap: 8 },
  title: { ...typography.authTitle, color: colors.ink, textAlign: 'auto' },
  subtitle: { ...typography.introText, color: colors.g5, textAlign: 'auto' },

  /* General Section — white plate, flex 1, px20 py12, gap 44 */
  section: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 44,
  },
  stack: { gap: 24 },
  rows: { gap: 20 },

  row: {
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  rowPlain: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  rowShadow: {
    borderRadius: 16,
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 6,
  },
  rowMid: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 4 },
  // No `numberOfLines`: Android mis-measures RTL text inside a flex row and ellipsises
  // labels that fit (see src/screens/quote/StepData.tsx for the full write-up).
  rowLabel: { ...typography.authOption, color: colors.ink, textAlign: 'auto', flex: 1 },
  rowLabelOn: { color: colors.white },
  rowTile: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTileOn: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  rowTileOff: {
    borderWidth: 1,
    borderColor: 'rgba(0,105,87,0.1)',
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },

  note: { backgroundColor: colors.warnBg2, borderRadius: 13, overflow: 'hidden' },
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

  browse: {
    ...typography.authLink,
    color: '#054A3D',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  pressedLink: { opacity: 0.6 },
});
