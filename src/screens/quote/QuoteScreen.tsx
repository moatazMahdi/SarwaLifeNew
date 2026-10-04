import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, gradients, typography } from '../../theme';
import { Icon } from '../../components/Icon';
import { PrimaryButton } from '../../components/PrimaryButton';
import {
  COVER_DEFAULT,
  NATIONALITIES,
  OptionalKey,
  ageFromDob,
  calcPremium,
  getProduct,
} from '../../data/products';
import { S, useI18n } from '../../i18n';
import { useFlow } from '../../state/FlowContext';
import { QuoteFooter, QuoteHeader, QuoteStepper } from './QuoteChrome';
import { DobParts, EMPTY_DOB, StepData, dobToString } from './StepData';
import { StepCover } from './StepCover';
import { StepOffer } from './StepOffer';
import { PremiumLoader } from './PremiumLoader';

/**
 * Figma "حساب القسط" (1:601) — the three-step quote flow reached from a product screen.
 * Steps share one header + stepper, so they live in a single route rather than three.
 */
export function QuoteScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const flow = useFlow();
  const product = getProduct(route?.params?.product ?? flow.productKey ?? undefined);

  const [step, setStep] = useState(1);
  // +1 when moving forward, −1 when moving back — drives which side the step slides in from.
  const [dir, setDir] = useState(1);
  const [calculating, setCalculating] = useState(false);

  function goTo(next: number) {
    setDir(next > step ? 1 : -1);
    setStep(next);
  }

  const [dob, setDob] = useState<DobParts>(EMPTY_DOB);
  // The Arabic half of a `NATIONALITIES` entry is the stored value in both languages, so the
  // default is taken from the table rather than retyped — see `data/products`.
  const [nationality, setNationality] = useState(NATIONALITIES[0][0]);
  const [smoker, setSmoker] = useState<boolean | null>(null);
  const [cover, setCover] = useState<number>(flow.quote.cover ?? COVER_DEFAULT);
  const [optionals, setOptionals] = useState<OptionalKey[]>(flow.quote.optionals ?? []);
  const [cards, setCards] = useState(flow.quote.cards ?? 1);

  const dobStr = useMemo(() => dobToString(dob), [dob]);
  const age = useMemo(() => ageFromDob(dobStr), [dobStr]);

  const result = useMemo(
    () =>
      calcPremium(product, {
        dob: dobStr,
        age,
        nationality,
        smoker: !!smoker,
        cover,
        optionals,
        cards,
      }),
    [product, dobStr, age, nationality, smoker, cover, optionals, cards],
  );

  const step1Valid = age >= 18 && age <= 65 && smoker !== null;

  function toggleOptional(key: OptionalKey) {
    setOptionals((cur) => (cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key]));
  }

  function onBack() {
    if (step > 1) goTo(step - 1);
    else navigation?.goBack();
  }

  function onNext() {
    if (step === 1) {
      flow.setProduct(product.key);
      flow.patchQuote({ dob: dobStr, age, nationality, smoker: !!smoker });
      goTo(2);
      return;
    }
    // "احسب القسط" → full-screen loader → straight into step 3.
    flow.patchQuote({ cover, optionals, cards });
    flow.setResult(result);
    setCalculating(true);
  }

  function onIssue() {
    flow.patchQuote({ dob: dobStr, age, nationality, smoker: !!smoker, cover, optionals, cards });
    flow.setResult(result);
    navigation?.navigate('LoginGate', { product: product.key });
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={['top']}>
        <QuoteHeader onBack={onBack} />
        <QuoteStepper current={step} />
      </SafeAreaView>

      <StepTransition step={step} dir={dir}>
        {step === 1 ? (
          <StepData
            dob={dob}
            onDob={setDob}
            age={age}
            nationality={nationality}
            onNationality={setNationality}
            smoker={smoker}
            onSmoker={setSmoker}
          />
        ) : step === 2 ? (
          <StepCover
            cover={cover}
            onCover={setCover}
            optionals={optionals}
            onToggle={toggleOptional}
            cards={cards}
            onCards={setCards}
          />
        ) : (
          <StepOffer cover={cover} result={result} />
        )}
      </StepTransition>

      <QuoteFooter>
        {step === 3 ? (
          <View style={styles.footRow}>
            {/* RTL: "احفظ العرض" first → physically right, matching Figma 2066:3408. */}
            <Pressable
              onPress={() => flow.setResult(result)}
              accessibilityRole="button"
              style={({ pressed }) => [styles.saveBtn, pressed && styles.pressed]}
            >
              <Text style={styles.saveLabel}>{t(S.quote.cta.save)}</Text>
            </Pressable>

            <Pressable
              onPress={onIssue}
              accessibilityRole="button"
              style={({ pressed }) => [styles.issueBtn, pressed && styles.pressed]}
            >
              <LinearGradient
                colors={gradients.brand.colors as unknown as [string, string, ...string[]]}
                locations={gradients.brand.locations as unknown as [number, number, ...number[]]}
                useAngle
                angle={145}
                style={styles.issueFill}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0)']}
                  locations={[0, 0.55]}
                  style={StyleSheet.absoluteFill}
                />
                <View style={styles.issueHighlight} />
                <Text style={styles.issueLabel}>{t(S.quote.cta.issue)}</Text>
              </LinearGradient>
            </Pressable>
          </View>
        ) : (
          <View style={styles.footOne}>
            <PrimaryButton
              label={step === 1 ? t(S.common.next) : t(S.quote.cta.calc)}
              disabled={step === 1 && !step1Valid}
              onPress={onNext}
              // Forward arrow: pre-mirrored for Arabic, flipped back under LTR.
              icon={
                step === 1 ? (
                  <Icon
                    name="arrowLeft"
                    width={13.25}
                    height={11.58}
                    color={colors.white}
                    directional
                  />
                ) : undefined
              }
            />
          </View>
        )}
      </QuoteFooter>

      {calculating ? (
        <PremiumLoader
          onDone={() => {
            setCalculating(false);
            goTo(3);
          }}
        />
      ) : null}
    </View>
  );
}

/**
 * Cross-fades between the three steps and slides the incoming one in from the direction
 * of travel. Under RTL "forward" reads leftwards, so a forward move enters from the left.
 */
function StepTransition({
  step,
  dir,
  children,
}: {
  step: number;
  dir: number;
  children: React.ReactNode;
}) {
  const anim = useRef(new Animated.Value(1)).current;
  const dirRef = useRef(dir);
  dirRef.current = dir;
  const offset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    offset.setValue(-dirRef.current * 26);
    anim.setValue(0);
    Animated.parallel([
      Animated.timing(anim, {
        toValue: 1,
        duration: 240,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(offset, {
        toValue: 0,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [step, anim, offset]);

  return (
    <Animated.View
      style={[styles.stepHost, { opacity: anim, transform: [{ translateX: offset }] }]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  stepHost: { flex: 1 },
  pressed: { opacity: 0.88 },

  // Figma: 346-wide CTA inside a 402-wide frame → 28 on each side.
  footOne: { marginHorizontal: 28 },
  footRow: { flexDirection: 'row', gap: 12, marginHorizontal: 28 },

  // Figma 2066:3412 — 142.33 of the 346 row, white with a 1px brand border.
  saveBtn: {
    flex: 142.33,
    height: 52,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.green,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  saveLabel: { ...typography.btnLabelMd, color: colors.green },

  // Figma 2066:3409 — 191.67 of the 346 row.
  issueBtn: {
    flex: 191.67,
    height: 52,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 6,
  },
  issueFill: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  issueHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  issueLabel: { ...typography.btnLabelMd, color: colors.white },
});
