import React, { useEffect, useRef } from 'react';
import { Animated, I18nManager, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients, typography } from '../../theme';
import { Icon } from '../../components/Icon';
import { S, useI18n } from '../../i18n';

/* ───────────────────────── switch (Figma `sw`, 44×26) ───────────────────────── */

const SW_W = 44;
const SW_H = 26;
const KNOB = 20;
/**
 * Inset of the knob from the track edge. Figma draws `left: 2` for the ON state, but the
 * 20px knob inside a 26px track already sits 3px off the top and bottom — 3 keeps the
 * ring of track around the knob perfectly even.
 */
const KNOB_PAD = 3;
const KNOB_NEAR = KNOB_PAD; // physical left end of the track
const KNOB_FAR = SW_W - KNOB - KNOB_PAD; // physical right end

/**
 * A switch turns *forward* in the reading direction: the knob rests at the start edge when
 * off and travels to the end edge when on. Under RTL that start edge is the physical right,
 * under LTR the physical left — so the two ends swap with the layout, they are not fixed.
 *
 * Read off `I18nManager` rather than the language context because the track is positioned
 * with physical `left` (`swapLeftAndRightInRTL(false)`), and what "physical" means is
 * decided by the live layout direction — which, straight after a language change, is still
 * the old one until the app comes back up.
 */
const KNOB_OFF = I18nManager.isRTL ? KNOB_FAR : KNOB_NEAR;
const KNOB_ON = I18nManager.isRTL ? KNOB_NEAR : KNOB_FAR;

/**
 * Purely presentational — the whole card is the press target, so the switch itself must
 * not become a responder (otherwise a tap on it would be handled twice).
 */
function SwitchVisual({ on }: { on: boolean }) {
  const anim = useRef(new Animated.Value(on ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: on ? 1 : 0,
      friction: 11,
      tension: 140,
      useNativeDriver: true,
    }).start();
  }, [on, anim]);

  // `anim` overshoots past 0/1 on the spring, so the travel is clamped to the track.
  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [KNOB_OFF, KNOB_ON],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.swTrack} pointerEvents="none">
      <View style={styles.swOff} />
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: anim }]}>
        <LinearGradient
          colors={gradients.brand.colors as unknown as [string, string, ...string[]]}
          locations={gradients.brand.locations as unknown as [number, number, ...number[]]}
          useAngle
          angle={145}
          style={styles.swOn}
        />
      </Animated.View>
      <Animated.View style={[styles.swKnob, { transform: [{ translateX }] }]} />
    </View>
  );
}

/* ───────────────────── optional-coverage cards (Figma 2065:2900) ───────────────────── */

export function OptionCard({
  label,
  on,
  onToggle,
}: {
  label: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="switch"
      accessibilityState={{ checked: on }}
      accessibilityLabel={label}
      style={({ pressed }) => [styles.optCard, pressed && styles.dim]}
    >
      {/* RTL: the switch is rendered last so it lands physically left of the label. */}
      <Text style={styles.optLabel}>{label}</Text>
      <SwitchVisual on={on} />
    </Pressable>
  );
}

export function CarePlusCard({
  label,
  on,
  onToggle,
  cards,
  onCards,
  maxCards,
}: {
  label: string;
  on: boolean;
  onToggle: () => void;
  cards: number;
  onCards: (n: number) => void;
  maxCards: number;
}) {
  const { t, n } = useI18n();
  return (
    <View style={styles.careCard}>
      <Pressable
        onPress={onToggle}
        accessibilityRole="switch"
        accessibilityState={{ checked: on }}
        accessibilityLabel={label}
        style={({ pressed }) => [styles.careTop, pressed && styles.dim]}
      >
        {/* RTL: star first → physically rightmost, matching Figma. */}
        <Icon name="star" size={22} />
        <View style={styles.careTopInner}>
          <Text style={styles.optLabel}>{label}</Text>
          <SwitchVisual on={on} />
        </View>
      </Pressable>

      <View style={styles.careBottom}>
        <Text style={styles.careCount}>{t(S.quote.cover.cards.label)}</Text>
        <View style={styles.counter}>
          {/* RTL: minus first → physically right; plus last → physically left. The −/+
              glyphs are arithmetic, not direction, so they are never mirrored. */}
          <CounterButton
            glyph="−"
            label={t(S.quote.cover.cards.less)}
            disabled={!on || cards <= 1}
            onPress={() => onCards(Math.max(1, cards - 1))}
          />
          <Text style={[styles.counterValue, !on && styles.counterValueOff]}>{n(cards)}</Text>
          <CounterButton
            glyph="+"
            label={t(S.quote.cover.cards.more)}
            disabled={!on || cards >= maxCards}
            onPress={() => onCards(Math.min(maxCards, cards + 1))}
          />
        </View>
      </View>
    </View>
  );
}

function CounterButton({
  glyph,
  label,
  disabled,
  onPress,
}: {
  glyph: string;
  label: string;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      hitSlop={6}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [
        styles.counterBtn,
        disabled && styles.counterBtnOff,
        pressed && !disabled && styles.dim,
      ]}
    >
      <Text style={styles.counterGlyph}>{glyph}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dim: { opacity: 0.75 },

  swTrack: {
    width: SW_W,
    height: SW_H,
    borderRadius: SW_H / 2,
  },
  swOff: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: SW_H / 2,
    backgroundColor: colors.br,
  },
  swOn: { flex: 1, borderRadius: SW_H / 2 },
  // Absolutely positioned on purpose: in flow, Yoga would align the knob to the RTL
  // cross-axis start (the physical *right*) and the positive `translateX` would then
  // push it clean out of the track. `swapLeftAndRightInRTL(false)` keeps `left` physical.
  swKnob: {
    position: 'absolute',
    top: (SW_H - KNOB) / 2,
    left: 0,
    width: KNOB,
    height: KNOB,
    borderRadius: KNOB / 2,
    backgroundColor: colors.white,
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.24,
    shadowRadius: 5,
    elevation: 2,
  },

  optCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  optLabel: {
    ...typography.optLabel,
    color: colors.ink,
    textAlign: 'auto',
    flex: 1,
  },

  careCard: {
    backgroundColor: colors.goldBg,
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 16,
  },
  careTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  careTopInner: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 4 },
  careBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 16 },
  careCount: { ...typography.countLabel, color: colors.goldTx, textAlign: 'auto' },

  counter: {
    width: 112,
    height: 34,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: colors.goldBr,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // Logical insets, matching Figma's `left: 3` / `left: 80` in a 112-wide box. The two
    // buttons already mirror with the row, so physical `paddingLeft`/`Right` would stay
    // put while the glyphs they belong to swapped past them — the 3 ends up on `−` and
    // the 6 on `+` under LTR. Keyed to start/end, each inset travels with its own button.
    paddingEnd: 3,
    paddingStart: 6,
  },
  counterBtn: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: colors.goldBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBtnOff: { opacity: 0.4 },
  counterGlyph: { ...typography.countGlyph, color: colors.goldTx },
  counterValue: { ...typography.countValue, color: colors.ink },
  counterValueOff: { color: colors.g4 },
});
