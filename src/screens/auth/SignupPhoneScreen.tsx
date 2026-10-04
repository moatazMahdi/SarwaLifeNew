import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '../../theme';
import { PrimaryButton } from '../../components/PrimaryButton';
import { PhoneField, usePhoneEntry } from '../../components/PhoneField';
import { S, useI18n } from '../../i18n';
import { AuthTopBar } from './AuthTopBar';

/** Figma 2070:3901 — "إنشاء حساب- لنبدأ", the first step after "لا، أنا عميل جديد". */
export function SignupPhoneScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const phone = usePhoneEntry();
  // Live from the first digit, so a rejected number gets a sentence instead of a dead
  // button. See the note on the login screen.
  const canContinue = phone.value.length > 0;

  function onContinue() {
    if (!phone.validate()) return;
    Keyboard.dismiss();
    navigation?.navigate('SignupOtp', { phone: phone.value, product: route?.params?.product });
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <AuthTopBar title={t(S.auth.signupPhone.header)} onBack={() => navigation?.goBack()} />

      {/* Same keyboard handling as the login screen — the CTA must stay reachable. */}
      <KeyboardAvoidingView
        style={styles.fill}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Profile Details — Figma 2070:3915. No logo here; the title carries the step. */}
          <View style={styles.intro}>
            <Text style={styles.title}>{t(S.auth.signupPhone.title)}</Text>
            <Text style={styles.subtitle}>{t(S.auth.signupPhone.subtitle)}</Text>
          </View>

          {/* General Section — Figma 2070:3920 */}
          <View style={styles.section}>
            <PhoneField
              value={phone.value}
              onChange={phone.onChange}
              onBlurField={phone.onBlurField}
              error={phone.error}
              onSubmit={onContinue}
            />
            <PrimaryButton
              label={t(S.common.continue)}
              disabled={!canContinue}
              onPress={onContinue}
            />

            {/* One paragraph rather than Figma's row of separate runs: Arabic has to be
                free to wrap, and a flex row would break the line in the wrong places. The
                joiner is its own phrase because English needs an article after it. */}
            <Text style={styles.legal}>
              {t(S.auth.signupPhone.legalPrefix)}{' '}
              <Text style={styles.legalLink} onPress={() => navigation?.navigate('Terms')}>
                {t(S.auth.signupPhone.terms)}
              </Text>{' '}
              {t(S.auth.signupPhone.legalAnd)}{' '}
              <Text style={styles.legalLink} onPress={() => navigation?.navigate('Privacy')}>
                {t(S.auth.signupPhone.privacy)}
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  fill: { flex: 1 },
  scroll: { flexGrow: 1 },

  /* Profile Details — px20, pt24 pb12, gap 8 */
  intro: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 12, gap: 8 },
  title: { ...typography.authTitle, color: colors.ink, textAlign: 'auto' },
  subtitle: { ...typography.introText, color: colors.g5, textAlign: 'auto' },

  /* General Section — flex 1, px20 py12, gap 44 */
  section: { flex: 1, paddingHorizontal: 20, paddingVertical: 12, gap: 44 },

  legal: { ...typography.footerNote, color: colors.g4, textAlign: 'center' },
  legalLink: {
    ...typography.footerLink,
    color: colors.green,
    textDecorationLine: 'underline',
  },
});
