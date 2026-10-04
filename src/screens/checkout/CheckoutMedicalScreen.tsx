import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '../../theme';
import { PrimaryButton } from '../../components/PrimaryButton';
import { GoldNote, IssueHeading, IssueLayout } from '../../components/IssueLayout';
import { Icon } from '../../components/Icon';
import { getProduct } from '../../data/products';
import { useFlow } from '../../state/FlowContext';
import { Phrase, S, useI18n } from '../../i18n';

/**
 * Figma 2071:5946 — step 3 of "اصدار الوثيقة".
 *
 * Three questions, no more. The previous build asked five (adding regular medication and
 * tobacco use); the comp settled on three, and every extra question on a disclosure screen
 * is another chance for the user to abandon a policy they have already paid attention to.
 */
const QUESTIONS: { key: string; text: Phrase }[] = [
  { key: 'chronic', text: S.checkout.medical.chronic },
  { key: 'critical', text: S.checkout.medical.critical },
  { key: 'surgery', text: S.checkout.medical.surgery },
];

export function CheckoutMedicalScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const flow = useFlow();
  const product = getProduct(route?.params?.product ?? flow.productKey ?? undefined);

  // The comp draws every question answered "لا", but that is a filled-in state, not a
  // default: a disclosure the user never read has to stay visibly unanswered.
  const [answers, setAnswers] = useState<Record<string, boolean | null>>(() =>
    Object.fromEntries(QUESTIONS.map((q) => [q.key, flow.medical[q.key] ?? null])),
  );

  const complete = QUESTIONS.every((q) => answers[q.key] !== null);

  function answer(key: string, value: boolean) {
    setAnswers((a) => ({ ...a, [key]: value }));
    flow.setMedical(key, value);
  }

  return (
    <IssueLayout
      step={3}
      onBack={() => navigation?.goBack()}
      footer={
        <>
          <Text style={styles.attest}>{t(S.checkout.medical.attest)}</Text>
          <PrimaryButton
            label={t(S.common.next)}
            disabled={!complete}
            onPress={() => navigation?.navigate('CheckoutPayment', { product: product.key })}
          />
        </>
      }
    >
      <IssueHeading title={S.checkout.medical.title} subtitle={S.checkout.medical.subtitle} />

      <GoldNote>{S.checkout.medical.note}</GoldNote>

      {QUESTIONS.map((q) => (
        <View key={q.key} style={styles.question}>
          <Text style={styles.questionText}>{t(q.text)}</Text>

          {/* RTL: نعم is written first so it takes the row's start — physical right — which
              is where the comp puts it, and لا trails on the left. */}
          <View style={styles.choices}>
            <Choice
              label={S.checkout.medical.yes}
              on={answers[q.key] === true}
              onPress={() => answer(q.key, true)}
            />
            <Choice
              label={S.checkout.medical.no}
              on={answers[q.key] === false}
              onPress={() => answer(q.key, false)}
            />
          </View>
        </View>
      ))}
    </IssueLayout>
  );
}

function Choice({ label, on, onPress }: { label: Phrase; on: boolean; onPress: () => void }) {
  const { t } = useI18n();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected: on }}
      style={({ pressed }) => [styles.choice, on && styles.choiceOn, pressed && styles.pressed]}
    >
      {/* Label first so the tick lands at the far end of the button, as drawn. */}
      <Text style={[styles.choiceLabel, on && styles.choiceLabelOn]}>{t(label)}</Text>
      {on ? <Icon name="checkCircle" size={20} color={colors.green} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  question: { gap: 12 },
  questionText: {
    ...typography.inputLabel,
    fontSize: 14,
    color: colors.qInk,
    textAlign: 'auto',
    letterSpacing: -0.4,
  },

  choices: { flexDirection: 'row', gap: 8 },
  choice: {
    flex: 1,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.qBorder,
    backgroundColor: colors.white,
  },
  // The comp thickens the border rather than filling the button, so the two options keep
  // the same footprint and the row does not shift when an answer is tapped.
  choiceOn: { borderWidth: 2, borderColor: colors.green },
  choiceLabel: { ...typography.choiceOff, color: colors.qInk, textAlign: 'center' },
  choiceLabelOn: { ...typography.choiceOn, color: colors.green, flex: 1, textAlign: 'auto' },
  pressed: { opacity: 0.75 },

  attest: {
    ...typography.obSubtitle,
    fontSize: 11,
    lineHeight: 17.6,
    color: colors.g4,
    textAlign: 'auto',
  },
});
