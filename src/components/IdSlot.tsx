import React from 'react';
import { I18nManager, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { colors, typography } from '../theme';
import { Icon } from './Icon';
import { S, useI18n } from '../i18n';

const H = 150;
const R = 18;

type Props = {
  /** Already written in the current language by the caller. */
  label: string;
  /** Set once the side has been photographed; the slot then previews the shot. */
  uri?: string;
  onPress: () => void;
};

/**
 * Figma 2070:4158 / 2070:4343 — one side of the national ID. Empty it is a dashed drop
 * zone; filled it keeps the dashed outline, turns it green, and sits a tick on the corner.
 */
export function IdSlot({ label, uri, onPress }: Props) {
  const { t } = useI18n();
  const filled = !!uri;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label} — ${filled ? t(S.kyc.slot.retake) : t(S.kyc.slot.hint)}`}
      style={({ pressed }) => [styles.slot, pressed && styles.pressed]}
    >
      <DashedOutline color={filled ? colors.green : colors.g3} />

      {filled ? (
        <>
          <Image source={{ uri }} style={styles.shot} resizeMode="contain" />
          {/* Physical left in the comp. `left` stays physical because App.tsx turns
              `swapLeftAndRightInRTL` off, so it is flipped here for an LTR layout only. */}
          <View style={[styles.tick, I18nManager.isRTL ? styles.tickStart : styles.tickEnd]}>
            <Icon name="check" size={15} color={colors.white} />
          </View>
        </>
      ) : (
        <View style={styles.empty}>
          <Icon name="camera" size={38} color={colors.g4} />
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.hint}>{t(S.kyc.slot.hint)}</Text>
        </View>
      )}
    </Pressable>
  );
}

/**
 * Drawn with SVG rather than `borderStyle: 'dashed'`: Android silently falls back to a
 * solid border as soon as the box has a corner radius, which is exactly this box.
 */
function DashedOutline({ color }: { color: string }) {
  return (
    <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
      <Rect
        x={1}
        y={1}
        width="98%"
        height={H - 2}
        rx={R - 1}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray="7 6"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  slot: {
    height: H,
    borderRadius: R,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pressed: { opacity: 0.75 },

  empty: { alignItems: 'center' },
  // Figma: icon top 22, label top 71.5, hint top 106 inside a 150px box.
  label: { ...typography.optTitle, color: colors.ink, marginTop: 11.5, textAlign: 'center' },
  hint: { ...typography.bodyText, fontSize: 12, color: colors.g4, marginTop: 14, textAlign: 'center' },

  shot: { width: '62%', height: '72%', borderRadius: 10 },
  tick: {
    position: 'absolute',
    top: 12,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tickStart: { left: 12 },
  tickEnd: { right: 12 },
});
