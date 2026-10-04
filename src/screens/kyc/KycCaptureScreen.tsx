import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCameraPermission } from 'react-native-vision-camera';
import { colors, typography } from '../../theme';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SignupStepper } from '../../components/SignupStepper';
import { IdSlot } from '../../components/IdSlot';
import { AuthTopBar } from '../auth/AuthTopBar';
import { useFlow } from '../../state/FlowContext';
import { S, useI18n } from '../../i18n';

type Side = 'front' | 'back';

/**
 * Figma 2070:4148 (empty) / 2070:4333 (both sides shot) — step 1 of account creation.
 * One screen holds both sides: the user shoots the face, comes back, shoots the back, and
 * only then does "التالي" light up. Splitting it across two screens, as the old build did,
 * hid from the user how much was left.
 */
export function KycCaptureScreen({ navigation, route }: any) {
  const { t } = useI18n();
  // Memoised because `capture` closes over it and spreads it into the camera's params; a
  // fresh object each render would re-create the two slot handlers on every frame.
  const params = useMemo(() => route?.params ?? {}, [route?.params]);
  const { idFrontUri, idBackUri } = useFlow();
  const { hasPermission, requestPermission } = useCameraPermission();

  // Asked for here, at the first screen that needs a camera, rather than three screens
  // later at the liveness step: the OS prompt is less jarring next to "صوّر بطاقتك" than
  // on top of a camera that would otherwise open black.
  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission, requestPermission]);

  // Opens the app's own camera rather than the phone's. The OS camera draws a bare
  // viewfinder with no guide, which left the user to guess how much of it the card should
  // fill — and made a liar of the intro screen, which tells them to hold the card "داخل
  // الإطار الظاهر على الشاشة". `KycIdCamera` writes the shot straight back into the flow
  // and pops, so this screen just finds the slot filled when it comes forward again.
  const capture = useCallback(
    (side: Side) => {
      navigation?.navigate('KycIdCamera', { ...params, side });
    },
    [navigation, params],
  );

  const ready = !!idFrontUri && !!idBackUri;

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <AuthTopBar title={t(S.kyc.signupTitle)} onBack={() => navigation?.goBack()} />

      <View style={styles.stepperWrap}>
        <SignupStepper current={1} />
      </View>

      <View style={styles.body}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{t(S.kyc.title)}</Text>
          <Text style={styles.subtitle}>{t(S.kyc.capture.subtitle)}</Text>
        </View>

        <View style={styles.slots}>
          <IdSlot
            label={t(S.kyc.capture.front)}
            uri={idFrontUri}
            onPress={() => capture('front')}
          />
          <IdSlot label={t(S.kyc.capture.back)} uri={idBackUri} onPress={() => capture('back')} />
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          label={t(S.common.next)}
          disabled={!ready}
          onPress={() => navigation?.navigate('KycProcessing', params)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  stepperWrap: { paddingHorizontal: 20, paddingTop: 12 },

  body: { flex: 1, paddingHorizontal: 28, paddingTop: 24, gap: 24 },
  titleBlock: { gap: 8 },
  title: { ...typography.authTitle, color: colors.ink, textAlign: 'auto' },
  subtitle: { ...typography.introText, color: colors.g5, textAlign: 'auto' },

  slots: { gap: 12 },

  footer: { paddingHorizontal: 28, paddingTop: 20, paddingBottom: 16 },
});
