import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../../theme';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SignupStepper } from '../../components/SignupStepper';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Card, SectionTitle, StickyFooter } from '../../components/kit';
import { Icon } from '../../components/Icon';
import { S, useI18n } from '../../i18n';

/**
 * The two rule lists are built at module load, before a language is known, so they hold
 * `Phrase` pairs and are written out with `t()` at render.
 */
const DOS = S.kyc.intro.dos;
const DONTS = S.kyc.intro.donts;

export function KycIntroScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const params = route?.params ?? {};

  return (
    <View style={styles.screen}>
      <ScreenHeader title={t(S.kyc.title)} onBack={() => navigation?.goBack()} />

      {/* The same four-bead rail every other account-creation screen carries. This screen
          used to draw its own three-bead version through `ScreenHeader`, so the rail grew a
          fourth step — الأمان — the instant the user tapped "ابدأ التصوير", and its numbers
          were set in ١٢٣ while every other stepper in the app sets them in 123. */}
      <View style={styles.stepperWrap}>
        <SignupStepper current={1} />
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.illustration}>
          <View style={styles.cardFrame}>
            <View style={styles.cardPhoto} />
            {/* Three ragged bars standing in for the printed lines on a card. The widths
                are named rather than inline so the rule against inline styles holds here
                too — they are static, and a new object per render for each of them is
                three allocations a frame for a drawing that never changes. */}
            <View style={styles.cardLines}>
              <View style={[styles.cardLine, styles.cardLineA]} />
              <View style={[styles.cardLine, styles.cardLineB]} />
              <View style={[styles.cardLine, styles.cardLineC]} />
            </View>
            <View style={[styles.corner, styles.cTL]} />
            <View style={[styles.corner, styles.cTR]} />
            <View style={[styles.corner, styles.cBL]} />
            <View style={[styles.corner, styles.cBR]} />
          </View>
        </View>

        <Text style={styles.headline}>{t(S.kyc.intro.headline)}</Text>
        <Text style={styles.subtitle}>{t(S.kyc.intro.subtitle)}</Text>

        <View style={styles.block}>
          <SectionTitle>{t(S.kyc.intro.dosTitle)}</SectionTitle>
          <Card style={styles.listCard}>
            {/* Keyed on the Arabic half: a key that changed with the language would
                remount every rule on a switch. */}
            {DOS.map((d, i) => (
              <View key={d[0]} style={[styles.ruleRow, i === 0 && styles.ruleRowFirst]}>
                <View style={styles.ruleOk}>
                  <Text style={styles.ruleGlyph}>✓</Text>
                </View>
                <Text style={styles.ruleText}>{t(d)}</Text>
              </View>
            ))}
          </Card>
        </View>

        <View style={styles.block}>
          <SectionTitle>{t(S.kyc.intro.dontsTitle)}</SectionTitle>
          <Card style={styles.listCard}>
            {DONTS.map((d, i) => (
              <View key={d[0]} style={[styles.ruleRow, i === 0 && styles.ruleRowFirst]}>
                <View style={styles.ruleNo}>
                  <Text style={styles.ruleGlyph}>✕</Text>
                </View>
                <Text style={styles.ruleText}>{t(d)}</Text>
              </View>
            ))}
          </Card>
        </View>

        {/* Same shape as `GoldNote` on the issuance steps: the rule is drawn as an absolute
            child pinned to `start` rather than as a physical right border — a `borderRight`
            stays on the physical right when the app flips to English, which is the end of
            the line there, not its beginning. The padlock is written before the text for
            the same reason it is on `GoldNote`: it is the note's own marker and belongs
            beside the rule, not stranded at the far edge. */}
        <View style={styles.note}>
          <View style={styles.noteBar} />
          <Icon name="lock" size={18} />
          <Text style={styles.noteText}>{t(S.kyc.intro.note)}</Text>
        </View>
      </ScrollView>

      <StickyFooter>
        <SafeAreaView edges={['bottom']}>
          <PrimaryButton
            label={t(S.kyc.intro.cta)}
            // No `side`: both sides live on one screen, and the camera is what takes one.
            onPress={() => navigation?.navigate('KycCapture', params)}
            // A typed "←" can never mirror, so it went on pointing the Arabic way under
            // LTR. The shared glyph is drawn pre-mirrored and `directional` turns it round.
            icon={
              <Icon
                name="arrowLeft"
                width={13.25}
                height={11.58}
                color={colors.white}
                directional
              />
            }
          />
        </SafeAreaView>
      </StickyFooter>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  // Matches the inset `KycCaptureScreen` gives the same rail, so it does not shift sideways
  // when the user moves between the two.
  stepperWrap: { paddingHorizontal: 20, paddingTop: 12 },
  body: { padding: spacing.screenMargin, paddingBottom: 30 },

  illustration: { alignItems: 'center', paddingVertical: 10 },
  cardFrame: {
    width: 230,
    height: 142,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 18,
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  cardPhoto: {
    width: 54,
    height: 66,
    borderRadius: 8,
    backgroundColor: colors.mint,
  },
  cardLines: { flex: 1, gap: 9 },
  cardLine: { height: 8, borderRadius: 4, backgroundColor: colors.br },
  cardLineA: { width: '85%' },
  cardLineB: { width: '60%' },
  cardLineC: { width: '72%' },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: colors.green,
  },
  cTL: { top: -6, left: -6, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 8 },
  cTR: { top: -6, right: -6, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 8 },
  cBL: { bottom: -6, left: -6, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 8 },
  cBR: { bottom: -6, right: -6, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 8 },

  headline: {
    ...typography.headline,
    fontSize: 22,
    lineHeight: 33,
    color: colors.ink,
    textAlign: 'auto',
    marginTop: 22,
  },
  subtitle: {
    ...typography.introText,
    color: colors.g5,
    textAlign: 'auto',
    marginTop: 8,
  },

  block: { marginTop: 22, gap: 10 },
  listCard: { paddingVertical: 6 },
  ruleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 10 },
  ruleRowFirst: { marginTop: 4 },
  ruleOk: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.okBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  ruleNo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.badBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  ruleGlyph: { fontSize: 11, lineHeight: 15, color: colors.g7 },
  ruleText: {
    ...typography.cardBody,
    fontSize: 12.5,
    lineHeight: 20,
    color: colors.g7,
    flex: 1,
    textAlign: 'auto',
  },

  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#F1F7F5',
    borderRadius: radius.md,
    overflow: 'hidden',
    padding: 14,
    marginTop: 22,
  },
  noteBar: { position: 'absolute', start: 0, top: 0, bottom: 0, width: 3, backgroundColor: colors.green },
  noteText: {
    ...typography.cardBody,
    lineHeight: 19,
    color: colors.g7,
    flex: 1,
    textAlign: 'auto',
  },
});
