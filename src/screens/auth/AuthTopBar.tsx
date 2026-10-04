import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '../../theme';
import { Icon } from '../../components/Icon';
import { S, useI18n } from '../../i18n';

/**
 * Figma 2068:3550 / 2069:3754 / 2069:3856 — the identity flow's page header: a 60px band
 * holding a single 48px round back control at the row's start, which is the physical right
 * under Arabic. Shared by the gate, phone and OTP screens so the three stay pixel-identical.
 * The safe-area top inset is owned by each screen's <SafeAreaView>.
 *
 * The account-creation frames (2070:3949 onwards) draw the same band with a title beside
 * the control — hence the optional `title`, rather than a second near-identical header.
 *
 * `title` is a finished string rather than a `Phrase`: the bar is mounted by several flows
 * that each name the step differently, so the caller writes `t(...)` in its own namespace.
 */
export function AuthTopBar({ title, onBack }: { title?: string; onBack?: () => void }) {
  const { t } = useI18n();

  return (
    <View style={styles.head}>
      {/* The control is written first so it takes the row's start edge and the title
          trails it, under either direction. */}
      <Pressable
        onPress={onBack}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={t(S.common.back)}
        style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      >
        {/* `chevronBack` is pre-mirrored, so it already points physically right — which is
            "back" only while the reading direction runs that way. `directional` flips it
            back under LTR, where the way out is to the left. */}
        <Icon name="chevronBack" size={24} directional />
      </Pressable>

      {/* The band is one line tall by design, so the title is held to one line rather than
          allowed to wrap and push itself out of the 60px. */}
      {title ? (
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  // RTL: the first child lands at the row's start, which is the physical right.
  head: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    // Figma centres the title's line box against the 48px control. Aligning to the top
    // and nudging the text down with padding only lines the two up at one font size.
    alignItems: 'center',
    gap: 12,
  },
  title: {
    ...typography.pageTitle,
    color: colors.qGreenInk,
    textAlign: 'auto',
    // The Arabic line box is taller than the glyphs; without a fixed line height the
    // centring shifts with the font's own ascent.
    lineHeight: 32,
    includeFontPadding: false,
    // `flex: 1`, not `flexShrink: 1`: shrinking is driven by the intrinsic width Android
    // measures for the Arabic run, which comes back far short of the glyphs it then draws —
    // so a title with room to spare was being clipped to an ellipsis. Claiming the leftover
    // width outright takes that measurement out of the decision; the ellipsis stays as the
    // safety net for a genuinely over-long title, which is all it was ever for.
    flex: 1,
  },
  btn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.qBtnBr,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.7 },
});
