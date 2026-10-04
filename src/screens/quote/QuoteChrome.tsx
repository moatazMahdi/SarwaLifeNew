import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, gradients, typography } from '../../theme';
import { Icon } from '../../components/Icon';
import { Phrase, S, useI18n } from '../../i18n';

/**
 * Figma "حساب القسط" (1:601) — shared header, stepper and sticky footer.
 *
 * The captions are `Phrase` pairs, not finished strings: this table is built once at module
 * load, before a language is known, so the choice is deferred to the render that reads it.
 */
export const QUOTE_STEPS: Phrase[] = [
  S.quote.chrome.steps.data,
  S.quote.chrome.steps.cover,
  S.quote.chrome.steps.offer,
];

/* ───────────────────────── header ───────────────────────── */

export function QuoteHeader({ onBack }: { onBack: () => void }) {
  const { t } = useI18n();
  return (
    <View style={styles.head}>
      <Pressable
        onPress={onBack}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={t(S.common.back)}
        style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
      >
        {/* Pre-mirrored for Arabic; `directional` points it left again under LTR. */}
        <Icon name="chevronBack" size={24} directional />
      </Pressable>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>{t(S.quote.chrome.title)}</Text>
      </View>
    </View>
  );
}

/* ───────────────────────── stepper ───────────────────────── */

/** `current` is 1-based. Steps before it render as completed (check), after it as pending. */
export function QuoteStepper({ current }: { current: number }) {
  const { t } = useI18n();
  return (
    <View style={styles.stepWrap}>
      <View style={styles.stepCard}>
        <View style={styles.stepInner}>
          <View style={styles.beadRow}>
            {/* RTL: the first child lands rightmost, so step 1 is rendered first. */}
            {QUOTE_STEPS.map((label, i) => {
              const n = i + 1;
              const done = n < current;
              const active = n === current;
              return (
                // Keyed on the Arabic half: a key that moved with the language would
                // remount every bead on a switch.
                <React.Fragment key={label[0]}>
                  {i > 0 ? (
                    <View style={[styles.connector, n <= current && styles.connectorOn]} />
                  ) : null}
                  <View style={styles.beadCol}>
                    {active ? <View style={styles.halo} /> : null}
                    {active || done ? (
                      <LinearGradient
                        colors={gradients.brand.colors as unknown as [string, string, ...string[]]}
                        locations={
                          gradients.brand.locations as unknown as [number, number, ...number[]]
                        }
                        useAngle
                        angle={145}
                        style={styles.bead}
                      >
                        {done ? (
                          <Icon name="check" size={18} color={colors.white} />
                        ) : (
                          <Text style={[styles.beadNum, styles.beadNumOn]}>{n}</Text>
                        )}
                      </LinearGradient>
                    ) : (
                      <View style={[styles.bead, styles.beadIdle]}>
                        <Text style={styles.beadNum}>{n}</Text>
                      </View>
                    )}
                    <Text
                      numberOfLines={1}
                      style={[styles.beadLabel, (active || done) && styles.beadLabelOn]}
                    >
                      {t(label)}
                    </Text>
                  </View>
                </React.Fragment>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}

/* ───────────────────────── sticky footer ───────────────────────── */

/**
 * Figma draws the footer as a `backdrop-blur(8.5px)` plate over a transparent-to-white
 * gradient. RN has no backdrop filter, so the same effect is produced by fading the flat
 * page background in — identical result on an opaque `colors.bg` canvas, and it still
 * hides content scrolling underneath.
 */
export const FOOTER_FADE = 20;

export function QuoteFooter({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={['rgba(245,247,250,0)', 'rgba(245,247,250,0.88)', 'rgba(245,247,250,1)']}
      locations={[0, 0.42, 1]}
      pointerEvents="box-none"
      style={[styles.foot, { paddingBottom: Math.max(insets.bottom, 16) }]}
    >
      {children}
    </LinearGradient>
  );
}

/** Bottom padding a step's ScrollView needs so nothing hides behind <QuoteFooter>. */
export function useFooterInset(buttonHeight = 56) {
  const insets = useSafeAreaInsets();
  return FOOTER_FADE + buttonHeight + Math.max(insets.bottom, 16) + 12;
}

const styles = StyleSheet.create({
  /* header — Figma 2065:2601 (402×60, paddingHorizontal 16, top 8, gap 12) */
  head: {
    height: 60,
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  backBtn: {
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
  titleWrap: { flex: 1, height: 48, justifyContent: 'center' },
  title: { ...typography.pageTitle, color: colors.qGreenInk, textAlign: 'auto' },

  /* stepper — Figma 2065:2463 (402×106) */
  stepWrap: { paddingHorizontal: 20, paddingVertical: 12 },
  stepCard: {
    backgroundColor: colors.white,
    borderRadius: 17,
    padding: 16,
    shadowColor: 'rgba(26,26,26,1)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  stepInner: { height: 50 },
  // The captions are 92px wide, centred under 30px beads, so each one overhangs its bead
  // by 31px on both sides. Without this inset the first and last beads sit 36px from the
  // screen edge and their captions run off the white card and over the page — invisible
  // with Arabic's short labels, obvious the moment "Your details" is set under one. The
  // row is pulled in by the overhang so the outermost caption lands inside the card in
  // either language; the connectors are flex, so they give up the width.
  beadRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  connector: {
    flex: 1,
    height: 2,
    borderRadius: 1.25,
    backgroundColor: colors.br,
    marginHorizontal: 4,
  },
  connectorOn: { backgroundColor: colors.green },
  beadCol: { width: 30, alignItems: 'center' },
  bead: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  beadIdle: {
    borderWidth: 1,
    borderColor: colors.br,
    backgroundColor: colors.white,
  },
  // Figma: `box-shadow: 0 0 0 4px rgba(0,105,87,0.13)` — drawn as a ring behind the bead.
  halo: {
    position: 'absolute',
    top: -4,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,105,87,0.13)',
  },
  beadNum: { ...typography.stepNum, color: colors.g4 },
  beadNumOn: { color: colors.white },
  // Wider than the 30px bead column so the caption stays optically centred under it.
  beadLabel: {
    position: 'absolute',
    top: 34,
    left: -31,
    right: -31,
    ...typography.stepCaption,
    color: colors.g4,
    textAlign: 'center',
  },
  beadLabelOn: { color: colors.green },

  /* footer — Figma 2065:2517 / 2065:3301 */
  foot: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: FOOTER_FADE,
  },
});
