import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients, typography } from '../../theme';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SignupStepper } from '../../components/SignupStepper';
import { Icon } from '../../components/Icon';
import { AuthTopBar } from '../auth/AuthTopBar';
import { DEMO_PROFILE, useFlow } from '../../state/FlowContext';
import { Phrase, S, useI18n } from '../../i18n';

/** Figma 2070:4463 — "راجع بياناتك", step 2. */
export function KycReviewScreen({ navigation, route }: any) {
  const { t, n } = useI18n();
  const params = route?.params ?? {};
  const { profile } = useFlow();
  const [agreed, setAgreed] = useState(false);

  // The extraction loader fills the profile in; the demo values stand in if this screen
  // is reached directly (deep link, or a reload while developing).
  const p = profile ?? DEMO_PROFILE;
  // Labels are held as phrases rather than finished strings so the row's React key can be
  // the Arabic half — a key that changed with the language would remount every row.
  const rows: [label: Phrase, value: string][] = [
    [S.kyc.review.fullName, p.fullName],
    [S.kyc.review.nationalId, p.nationalId],
    [S.kyc.review.governorate, p.governorate],
    [S.kyc.review.city, p.city],
    // The one value this app computes rather than reads off the card, so it is the one
    // that takes the current language's digits and a translated unit.
    [S.kyc.review.age, `${n(p.age)} ${t(S.checkout.personal.years)}`],
    [S.kyc.review.maritalStatus, p.maritalStatus],
  ];

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <AuthTopBar title={t(S.kyc.signupTitle)} onBack={() => navigation?.goBack()} />

      <View style={styles.stepperWrap}>
        <SignupStepper current={2} />
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{t(S.kyc.review.title)}</Text>
          <Text style={styles.subtitle}>{t(S.kyc.review.subtitle)}</Text>
        </View>

        <View style={styles.card}>
          {rows.map(([label, value], i) => (
            <View key={label[0]}>
              {i > 0 ? <View style={styles.rule} /> : null}
              {/* RTL: the label is written first so it takes the row's start (physical
                  right) and the value group lands at the far end. */}
              <View style={styles.row}>
                <Text style={styles.rowLabel}>{t(label)}</Text>
                <View style={styles.valueGroup}>
                  <Text style={styles.rowValue} numberOfLines={1}>
                    {value}
                  </Text>
                  <LinearGradient
                    colors={gradients.brand.colors as unknown as [string, string, ...string[]]}
                    locations={
                      gradients.brand.locations as unknown as [number, number, ...number[]]
                    }
                    useAngle
                    angle={145}
                    style={styles.badge}
                  >
                    <Icon name="check" size={10} color={colors.white} />
                  </LinearGradient>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {/* RTL: the box is written first so it takes the row's start — physical right,
            where the eye begins the line and where the user expects to tick. */}
        <Pressable
          style={styles.consent}
          onPress={() => setAgreed((v) => !v)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: agreed }}
        >
          <View style={[styles.box, agreed && styles.boxOn]}>
            {agreed ? <Icon name="check" size={14} color={colors.white} /> : null}
          </View>
          <View style={styles.consentText}>
            {/* Assembled from four pieces because two of them are tappable. The connectors
                carry English's articles ("to the" / "and the") so the links stay the bare
                document names in both languages. */}
            <Text style={styles.consentLine}>
              {t(S.kyc.review.consentPrefix)}{' '}
              <Text style={styles.consentLink} onPress={() => navigation?.navigate('Terms')}>
                {t(S.kyc.review.terms)}
              </Text>{' '}
              {t(S.kyc.review.consentAnd)}{' '}
              <Text style={styles.consentLink} onPress={() => navigation?.navigate('Privacy')}>
                {t(S.kyc.review.privacy)}
              </Text>
            </Text>
            <Text style={styles.consentLine}>{t(S.kyc.review.consentUse)}</Text>
            <Text style={styles.consentLine}>{t(S.kyc.review.consentAuthority)}</Text>
          </View>
        </Pressable>

        <PrimaryButton
          label={t(S.common.next)}
          disabled={!agreed}
          onPress={() => navigation?.navigate('LivenessIntro', params)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  stepperWrap: { paddingHorizontal: 20, paddingTop: 12 },

  body: { paddingHorizontal: 28, paddingTop: 24, paddingBottom: 12, gap: 24 },
  titleBlock: { gap: 8 },
  title: { ...typography.authTitle, color: colors.ink, textAlign: 'auto' },
  subtitle: { ...typography.introText, color: colors.g5, textAlign: 'auto' },

  card: {
    backgroundColor: 'rgba(5,74,61,0.05)',
    borderWidth: 1,
    borderColor: colors.greenD,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 4,
  },
  rule: { height: 1, backgroundColor: 'rgba(5,74,61,0.12)' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 10,
  },
  rowLabel: { ...typography.helperText, fontSize: 13, color: colors.qGreyRow, textAlign: 'auto' },
  valueGroup: { flexShrink: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  rowValue: {
    ...typography.optTitle,
    fontSize: 16,
    lineHeight: 24,
    color: colors.green,
    textAlign: 'auto',
    flexShrink: 1,
  },
  badge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: { paddingHorizontal: 28, paddingTop: 16, paddingBottom: 16, gap: 24 },
  consent: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  consentText: { flex: 1, gap: 2 },
  consentLine: { ...typography.bodyText, color: colors.g7, textAlign: 'auto' },
  consentLink: {
    ...typography.linkText,
    color: colors.green,
    textDecorationLine: 'underline',
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.g3,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxOn: { backgroundColor: colors.green, borderColor: colors.green },
});
