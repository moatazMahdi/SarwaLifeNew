import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { colors, typography } from '../theme';
import { AuthTopBar } from '../screens/auth/AuthTopBar';
import { IssueStepper } from './IssueStepper';
import { Icon } from './Icon';
import { Phrase, S, useI18n } from '../i18n';

/**
 * The frame every "اصدار الوثيقة" step is drawn inside (Figma 2071:5466 / 5689 / 5946 /
 * 6097). All four comps repeat the same band, rail, 20/12 body and floating footer, so
 * they are owned here rather than copied four times — the four steps physically cannot
 * drift apart now.
 */
export function IssueLayout({
  step,
  onBack,
  children,
  footer,
}: {
  /** 1-based, matching the numbers drawn on the rail. */
  step: number;
  onBack?: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const { t } = useI18n();
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <AuthTopBar title={t(S.checkout.topBar)} onBack={onBack} />

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <IssueStepper current={step} />
        {children}
      </ScrollView>

      <View style={styles.footer}>
        {/* The comp floats the footer over the body behind a backdrop blur, which RN has no
            equivalent for on Android. A fade into the page colour gives the same reading —
            content runs out rather than being chopped — at no cost. */}
        <LinearGradient
          colors={['rgba(245,247,250,0)', colors.bg]}
          style={styles.fade}
          pointerEvents="none"
        />
        <SafeAreaView edges={['bottom']} style={styles.footerInner}>
          {footer}
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
}

/** The 25px headline + grey standfirst that opens the body of every step. */
export function IssueHeading({ title, subtitle }: { title: Phrase; subtitle?: Phrase }) {
  const { t } = useI18n();
  return (
    <View style={styles.heading}>
      <Text style={styles.headingTitle}>{t(title)}</Text>
      {subtitle ? <Text style={styles.headingSub}>{t(subtitle)}</Text> : null}
    </View>
  );
}

/**
 * The cream advisory strip (Figma 2071:5872 / 2071:6003) — used where the screen has to
 * tell the user something they cannot act on, so it is deliberately not a card: no border,
 * no tap target, just a gold rule down the reading edge.
 */
export function GoldNote({ children }: { children: Phrase }) {
  const { t } = useI18n();
  return (
    <View style={styles.note}>
      {/* The comp pins the rule to `right`, which under RTL is the row's start. Written as
          `start` so it stays on the reading edge if the app is flipped to English. */}
      <View style={styles.noteBar} />
      {/* Glyph first so it sits on the reading edge, right beside the gold rule — physical
          right in Arabic, physical left in English. Written after the text it landed on the
          far side, which read as a stray mark rather than as the note's own marker. */}
      <Icon name="infoCircle" size={19} />
      <Text style={styles.noteText}>{t(children)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  body: { paddingHorizontal: 20, paddingVertical: 12, gap: 20, paddingBottom: 28 },

  footer: { backgroundColor: colors.bg },
  fade: { position: 'absolute', start: 0, end: 0, top: -20, height: 20 },
  footerInner: { paddingHorizontal: 22, paddingTop: 8, paddingBottom: 12, gap: 14 },

  heading: { gap: 8 },
  headingTitle: {
    ...typography.authTitle,
    color: colors.ink,
    textAlign: 'auto',
  },
  headingSub: { ...typography.introText, color: colors.g5, textAlign: 'auto' },

  note: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: colors.warnBg2,
    borderRadius: 13,
    overflow: 'hidden',
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  noteBar: { position: 'absolute', start: 0, top: 0, bottom: 0, width: 3, backgroundColor: colors.gold },
  noteText: {
    ...typography.bodyText,
    lineHeight: 19.38,
    color: colors.goldTx,
    textAlign: 'auto',
    flex: 1,
  },
});
