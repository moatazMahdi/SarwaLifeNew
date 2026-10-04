import React, { useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, gradients, typography } from '../../theme';
import { PrimaryButton } from '../../components/PrimaryButton';
import { OtpInput } from '../../components/OtpInput';
import { Icon } from '../../components/Icon';
import { DEMO_PROFILE, useFlow } from '../../state/FlowContext';
import { S, useI18n } from '../../i18n';
import { AuthTopBar } from './AuthTopBar';
import { maskPhone } from '../../components/PhoneField';
import { FieldError } from '../../components/FieldError';
import { useOtpEntry } from './useOtpEntry';

/** Figma 2069:3845 — "3 otp". */
export function LoginOtpScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const nsn: string = route?.params?.phone ?? '';
  const flow = useFlow();

  const masked = maskPhone(nsn);

  const onVerified = useCallback(() => {
    const phone = nsn ? `0${nsn}` : '';
    flow.setProfile({ ...DEMO_PROFILE, phone });
    flow.login(phone);
    const product = route?.params?.product ?? flow.productKey ?? undefined;
    if (product && flow.result) {
      navigation?.reset({
        index: 1,
        routes: [{ name: 'Home' }, { name: 'CheckoutPersonal', params: { product } }],
      });
      return;
    }
    navigation?.reset({ index: 0, routes: [{ name: 'Home' }] });
  }, [flow, navigation, nsn, route]);

  const otp = useOtpEntry(onVerified);

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <AuthTopBar onBack={() => navigation?.goBack()} />

      <KeyboardAvoidingView
        style={styles.fill}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* The confirm button has to stay reachable with the number pad up — see the note
            in LoginPhoneScreen. */}
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Profile Details — Figma 2069:3859 */}
          <View style={styles.intro}>
            <LinearGradient
              colors={gradients.brandSoft.colors as unknown as [string, string, ...string[]]}
              useAngle
              angle={140}
              style={styles.tile}
            >
              <Icon name="message" size={32} />
            </LinearGradient>

            <View style={styles.titleBlock}>
              <Text style={styles.title}>{t(S.auth.otp.title)}</Text>
              {/* `maskPhone` puts an LRM at the head of the number, which is what keeps
                  "0102 •••• 40" from having its groups reordered inside the Arabic line. */}
              <Text style={styles.subtitle}>
                {t(S.auth.otp.sentTo)} <Text style={styles.subtitleStrong}>{masked}</Text>
              </Text>
            </View>
          </View>

          {/* General Section — Figma 2069:3864 */}
          <View style={styles.section}>
            {/* The message is grouped with the boxes, not left floating in the section's
                44px gap, so the complaint stays attached to what it is complaining about. */}
            <View style={styles.codeBlock}>
              <OtpInput
                value={otp.code}
                onChangeText={otp.onChangeText}
                busy={otp.verifying}
                error={Boolean(otp.error)}
              />
              <FieldError message={otp.error} />
            </View>

            {/* RTL: the question is rendered first so it sits physically right of the timer. */}
            <View style={styles.resendRow}>
              <Text style={styles.resendMuted}>{t(S.auth.otp.noCode)}</Text>
              {otp.canResend ? (
                <Pressable onPress={otp.onResend} hitSlop={8}>
                  <Text style={[styles.resend, styles.resendLink]}>
                    {` ${t(S.auth.otp.resend)}`}
                  </Text>
                </Pressable>
              ) : (
                <Text style={styles.resend}>{` ${t(S.auth.otp.resendIn)} ${otp.countdown}`}</Text>
              )}
            </View>

            <PrimaryButton
              label={t(S.common.confirm)}
              loading={otp.verifying}
              disabled={!otp.complete}
              onPress={otp.verify}
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

  /* Profile Details — px20, pt12 pb20, gap 24, centred */
  intro: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 24,
    alignItems: 'center',
  },
  tile: {
    width: 60,
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,105,87,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  titleBlock: { gap: 8, alignSelf: 'stretch' },
  title: { ...typography.authTitle, color: colors.ink, textAlign: 'center' },
  subtitle: { ...typography.introText, color: colors.g5, textAlign: 'center' },
  subtitleStrong: { ...typography.bodyText, fontSize: 14.5, color: '#000000' },

  /* General Section — flex 1, px20 py12, gap 44 */
  section: { flex: 1, paddingHorizontal: 20, paddingVertical: 12, gap: 44 },
  codeBlock: { gap: 14 },

  resendRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  resendMuted: { ...typography.authResendMuted, color: colors.g5 },
  resend: { ...typography.authResend, color: colors.gold },
  resendLink: { textDecorationLine: 'underline' },
});
