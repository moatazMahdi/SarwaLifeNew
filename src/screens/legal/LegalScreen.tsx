import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { ScreenHeader } from '../../components/ScreenHeader';
import type { LegalSection } from '../../i18n/ns/legal';
import { S, useI18n } from '../../i18n';

/**
 * The reading order of each document. It lives here, next to the `.map()` that draws it,
 * rather than in the copy file — `legal.terms.s3` is where a lawyer looks for clause 3, and
 * the number it is drawn with comes from this array's index, so the two can never disagree.
 */
const TERMS: readonly LegalSection[] = [
  S.legal.terms.s1,
  S.legal.terms.s2,
  S.legal.terms.s3,
  S.legal.terms.s4,
  S.legal.terms.s5,
  S.legal.terms.s6,
];

const PRIVACY: readonly LegalSection[] = [
  S.legal.privacy.s1,
  S.legal.privacy.s2,
  S.legal.privacy.s3,
  S.legal.privacy.s4,
  S.legal.privacy.s5,
  S.legal.privacy.s6,
];

export function LegalScreen({ navigation, route }: any) {
  const { t, n } = useI18n();
  const kind = route?.params?.kind === 'privacy' ? 'privacy' : 'terms';
  const doc = kind === 'privacy' ? S.legal.privacy : S.legal.terms;
  const sections = kind === 'privacy' ? PRIVACY : TERMS;

  return (
    <View style={styles.screen}>
      <ScreenHeader title={t(doc.title)} onBack={() => navigation?.goBack()} />

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={styles.updated}>{t(S.legal.updated)}</Text>
        <Text style={styles.intro}>{t(doc.intro)}</Text>

        {sections.map((s, i) => (
          // Keyed on the Arabic half, never on the translated one: a key that moves with the
          // language would tear the whole list down and rebuild it on a switch.
          <View key={s.title[0]} style={styles.section}>
            {/* The clause number is drawn, not stored — `n()` gives ١ under Arabic and 1
                under English, which a numeral baked into the string could never do. */}
            <Text style={styles.sectionTitle}>{`${n(i + 1)}. ${t(s.title)}`}</Text>
            {s.body.map((clause) => (
              <View key={clause[0]} style={styles.pRow}>
                <View style={styles.pDot} />
                <Text style={styles.pText}>{t(clause)}</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.note}>
          <Text style={styles.noteText}>{t(S.legal.note)}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  body: { padding: spacing.screenMargin, paddingBottom: 40 },
  updated: { ...typography.badgeLabel, color: colors.g4, textAlign: 'auto' },
  intro: {
    ...typography.introText,
    color: colors.g5,
    textAlign: 'auto',
    marginTop: 8,
  },
  section: { marginTop: 24 },
  sectionTitle: { ...typography.cardTitle, fontSize: 15, color: colors.ink, textAlign: 'auto' },
  pRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 9, marginTop: 10 },
  pDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.green,
    marginTop: 8,
  },
  pText: {
    ...typography.cardBody,
    fontSize: 12.5,
    lineHeight: 21,
    color: colors.g7,
    flex: 1,
    textAlign: 'auto',
  },
  note: {
    backgroundColor: '#F1F7F5',
    borderRadius: radius.md,
    // `start` rather than `right`: the accent bar belongs on the reading edge, so it has to
    // move to the left of the card under English. App.tsx turns off RTL left/right swapping,
    // so a physical `right` here would stay on the right in both languages.
    borderStartWidth: 3,
    borderStartColor: colors.green,
    padding: 14,
    marginTop: 28,
  },
  noteText: { ...typography.cardBody, lineHeight: 19, color: colors.g7, textAlign: 'auto' },
});
