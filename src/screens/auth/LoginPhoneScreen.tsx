import React from 'react';
import {
  Image,
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

// The number helpers moved to the shared field so the account-creation screen draws the
// identical control. Re-exported because the OTP screens mask the number with `LRM`.
export { LRM, groupPhone, toNsn } from '../../components/PhoneField';

/** Figma 2069:3743 — "تسجيل الدخول". */
export function LoginPhoneScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const phone = usePhoneEntry();

  /**
   * The button is live as soon as there is anything to check, rather than unlocking only on
   * a valid number. A greyed-out button is the one state that cannot explain itself: a user
   * who typed a Gulf mobile, or stopped a digit short, was left pressing nothing and being
   * told nothing. Letting the press through costs one tap and buys an actual sentence.
   */
  const canContinue = phone.value.length > 0;

  function onContinue() {
    if (!phone.validate()) return;
    Keyboard.dismiss();
    navigation?.navigate('LoginOtp', { phone: phone.value, product: route?.params?.product });
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <AuthTopBar onBack={() => navigation?.goBack()} />

      {/*
        The CTA must never hide behind the keyboard. Android already shrinks the window
        (`adjustResize` in AndroidManifest.xml) so the scroller below keeps the button in
        reach; iOS needs the explicit padding behaviour.
      */}
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
          {/* Profile Details — Figma 2069:3757 */}
          <View style={styles.intro}>
            {/*
              Figma clips a square 86px mark to a 73px window, trimming the logo's empty
              right margin. The art is 400×400 with ~17% transparent padding each side, so
              nothing of the mark itself is lost.
            */}
            <View style={styles.logoClip}>
              <Image source={require('../../assets/logo.png')} style={styles.logo} />
            </View>

            <View style={styles.titleBlock}>
              <Text style={styles.title}>{t(S.auth.loginPhone.title)}</Text>
              <Text style={styles.subtitle}>{t(S.auth.loginPhone.subtitle)}</Text>
            </View>
          </View>

          {/* General Section — Figma 2069:3770 */}
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

  /* Profile Details — px20 py12, gap 24, group pinned to the physical right */
  intro: { paddingHorizontal: 20, paddingVertical: 12, gap: 24, alignItems: 'flex-start' },
  logoClip: { width: 73, height: 86, overflow: 'hidden' },
  logo: { position: 'absolute', left: 0, top: 0, width: 86, height: 86 },

  titleBlock: { gap: 8, alignSelf: 'stretch' },
  title: { ...typography.authTitle, color: colors.ink, textAlign: 'auto' },
  subtitle: { ...typography.introText, color: colors.g5, textAlign: 'auto' },

  /* General Section — flex 1, px20 py12, gap 44 */
  section: { flex: 1, paddingHorizontal: 20, paddingVertical: 12, gap: 44 },
});
