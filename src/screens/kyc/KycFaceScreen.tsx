import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  AppState,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, Ellipse, Mask, Rect } from 'react-native-svg';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  usePhotoOutput,
} from 'react-native-vision-camera';
import { colors, typography } from '../../theme';
import { Icon } from '../../components/Icon';
import { CameraWaiting } from './CameraWaiting';
import { useFlow } from '../../state/FlowContext';
import { S, useI18n } from '../../i18n';

/**
 * Figma 2070:5005 — "تصوير الوجهة". The comp looks like a blurred camera, but it is not:
 * the field is `#000814` with the camera laid over it at 40% opacity, and a sharp oval
 * window showing it at full strength. That is lucky, because a real blur cannot be done
 * here — on Android the preview lives on its own surface and `@react-native-community/blur`
 * has nothing to sample, so it would come out a flat grey slab. A scrim with a punched-out
 * oval reproduces the comp exactly and actually works.
 */

// Ratios off the 375×812 comp, so the framing holds on a tall Xiaomi as well as an iPhone.
const OVAL_W = 263 / 375;
const OVAL_H = 374 / 812;
const OVAL_CY = 363 / 812; // centre sits 43px above the middle
const SCRIM = 'rgba(0,8,20,0.6)'; // leaves exactly the comp's 40% of the camera showing

/**
 * True only while the app itself is in front. A screen can stay mounted and focused while
 * the user takes a call or pulls down the notification shade, and a camera left streaming
 * through that both drains the battery and, on some Android builds, loses the device to
 * whatever app comes forward.
 */
function useIsForeground() {
  const [fg, setFg] = useState(AppState.currentState === 'active');
  useEffect(() => {
    const sub = AppState.addEventListener('change', (s) => setFg(s === 'active'));
    return () => sub.remove();
  }, []);
  return fg;
}

export function KycFaceScreen({ navigation, route }: any) {
  const { t } = useI18n();
  // Memoised because `onConfirm` closes over it; a fresh object each render would make
  // the callback — and so the confirm button — re-create on every frame.
  const params = useMemo(() => route?.params ?? {}, [route?.params]);
  const { width, height } = useWindowDimensions();
  const { setSelfie } = useFlow();

  const device = useCameraDevice('front');
  const { hasPermission, requestPermission } = useCameraPermission();
  // VisionCamera 5 routes capture through an output attached to the session rather than
  // a method on the view's ref, so the output is created here and handed to <Camera>.
  const photoOutput = usePhotoOutput({ qualityPrioritization: 'balanced' });
  // Held by identity: `useCamera` reconfigures the session whenever this array changes,
  // so a fresh literal in the JSX would tear the preview down on every render.
  const outputs = useMemo(() => [photoOutput], [photoOutput]);

  const [shot, setShot] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // React Navigation keeps a screen mounted underneath whatever is pushed on top of it, so
  // unmounting is not what releases the camera — this is.
  const isFocused = useIsFocused();
  const isForeground = useIsForeground();

  const onShutter = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    try {
      const photo = await photoOutput.capturePhoto({ flashMode: 'off' }, {});
      // The frame lives in native memory until it is written out, and `dispose()` is what
      // releases it — skipping it leaks a full-resolution bitmap per shot.
      const path = await photo.saveToTemporaryFileAsync();
      photo.dispose();
      setShot(`file://${path}`);
    } catch {
      // A failed frame just leaves the shutter armed; the user can tap again.
    } finally {
      setBusy(false);
    }
  }, [busy, photoOutput]);

  const onConfirm = useCallback(() => {
    if (!shot) return;
    setSelfie(shot);
    navigation?.replace('KycVerifying', params);
  }, [shot, setSelfie, navigation, params]);

  const ovalW = width * OVAL_W;
  const ovalH = height * OVAL_H;
  const ovalCy = height * OVAL_CY;

  return (
    <View style={styles.screen}>
      {/* Live until the shutter fires, then frozen on the frame so the user judges the
          same picture that gets submitted. */}
      {shot ? (
        <Image source={{ uri: shot }} style={StyleSheet.absoluteFill} resizeMode="cover" />
      ) : device && hasPermission ? (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isFocused && isForeground}
          outputs={outputs}
        />
      ) : (
        // Owns the permission request as well as the wait, so a refusal shows a way into
        // Settings instead of a spinner that never finishes.
        <CameraWaiting hasPermission={hasPermission} requestPermission={requestPermission} />
      )}

      {/* The scrim and its window, in one SVG: a full-bleed rect masked by an ellipse, so
          the oval is a true hole rather than four rectangles faked around it. */}
      <Svg style={StyleSheet.absoluteFill} width={width} height={height} pointerEvents="none">
        <Defs>
          <Mask id="window">
            <Rect x={0} y={0} width={width} height={height} fill="#fff" />
            <Ellipse cx={width / 2} cy={ovalCy} rx={ovalW / 2} ry={ovalH / 2} fill="#000" />
          </Mask>
        </Defs>
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={SCRIM}
          mask="url(#window)"
        />
      </Svg>

      {/* The comp darkens the bottom strip a second time, under the caption and shutter. */}
      <View style={[styles.bottomScrim, { height: height * (230 / 812) }]} pointerEvents="none" />

      <SafeAreaView style={styles.fill} edges={['top', 'bottom']}>
        <View style={styles.head}>
          {/* RTL: the control is written first so it takes the row's start — physical
              right, where the comp puts it — and the title trails it. */}
          <Pressable
            onPress={() => navigation?.goBack()}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={t(S.common.back)}
            style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
          >
            {/* Pre-mirrored for Arabic; `directional` points it left again under LTR. */}
            <Icon name="chevronBack" size={24} color={colors.white} directional />
          </Pressable>
          <Text style={styles.headTitle}>{t(S.kyc.face.headTitle)}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.caption}>{shot ? t(S.kyc.face.check) : t(S.kyc.face.hint)}</Text>

          {shot ? (
            <View style={styles.confirmRow}>
              {/* RTL: "تأكيد" is written first so the primary action lands on the right. */}
              <Pressable
                onPress={onConfirm}
                accessibilityRole="button"
                style={({ pressed }) => [styles.confirm, pressed && styles.pressed]}
              >
                <Text style={styles.confirmLabel}>{t(S.common.confirm)}</Text>
              </Pressable>
              <Pressable
                onPress={() => setShot(null)}
                accessibilityRole="button"
                style={({ pressed }) => [styles.retake, pressed && styles.pressed]}
              >
                <Text style={styles.retakeLabel}>{t(S.kyc.camera.retake)}</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={onShutter}
              disabled={busy || !device || !hasPermission}
              accessibilityRole="button"
              accessibilityLabel={t(S.kyc.camera.shutter)}
              style={({ pressed }) => [styles.shutterRing, pressed && styles.pressed]}
            >
              <View style={styles.shutter}>
                {busy ? <ActivityIndicator color={colors.white} /> : null}
              </View>
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#000814' },
  fill: { flex: 1 },


  bottomScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },

  // Figma puts the header 18px below the 44px status bar; the safe-area inset covers the bar.
  head: { paddingHorizontal: 16, paddingTop: 18, flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headTitle: {
    ...typography.pageTitle,
    fontSize: 18,
    lineHeight: 32,
    letterSpacing: -0.54,
    color: colors.white,
    textAlign: 'auto',
  },
  pressed: { opacity: 0.7 },

  footer: { marginTop: 'auto', alignItems: 'center', paddingBottom: 24, gap: 36 },
  caption: {
    ...typography.authTitle,
    fontSize: 18,
    lineHeight: 26,
    color: colors.white,
    textAlign: 'center',
    paddingHorizontal: 26,
  },

  // 64px disc inside a ring that the comp draws 10.16% outside it.
  shutterRing: {
    width: 77,
    height: 77,
    borderRadius: 39,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.gold,
    borderWidth: 2,
    borderColor: colors.goldL,
    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  confirm: {
    height: 52,
    paddingHorizontal: 44,
    borderRadius: 17,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmLabel: { ...typography.btnLabelMd, color: colors.white },
  retake: {
    height: 52,
    paddingHorizontal: 22,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  retakeLabel: { ...typography.btnLabelMd, color: colors.white },
});
