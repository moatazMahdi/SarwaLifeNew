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
import Svg, { Defs, Mask, Path, Rect } from 'react-native-svg';
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
 * The national-ID camera.
 *
 * Both sides of the card used to be shot through `launchCamera`, which hands the job to
 * whatever camera app the phone ships with. That app draws a full-frame viewfinder and no
 * guide, so the user was left to guess how much of the frame the card should fill — and the
 * intro screen two steps earlier has always told them to "امسك البطاقة بثبات داخل الإطار
 * الظاهر على الشاشة", an instruction about a frame that did not exist. Half the entries in
 * the "couldn't read your card" screen's list of causes — a corner outside the frame, a
 * tilted shot — are the ones a guide prevents rather than diagnoses.
 *
 * So the shot is taken in-app, and it is the liveness screen's treatment turned on its side:
 * the same dark scrim over the live preview with a window punched clean through it, the
 * window shaped like the thing being photographed. The card's outline is drawn in gold —
 * the app's one warm accent, and the colour of the shutter the user is about to press.
 *
 * The scrim is not a blur, and cannot be: on Android the camera preview lives on its own
 * surface, so `@react-native-community/blur` has nothing to sample and renders a flat grey
 * slab. A scrim reads as the same thing and actually works.
 */

/** ID-1, the bank-card and national-ID format: 85.6 × 53.98 mm. */
const CARD_RATIO = 85.6 / 53.98;
/** Side margin around the window. Wide enough that the card never touches the scrim. */
const CARD_INSET = 26;
/** The window never grows past this, or on a tablet the card sits absurdly large. */
const CARD_MAX_W = 460;
/**
 * The window's centre, as a fraction of screen height. Above the middle, because the caption
 * and the shutter own the bottom third and a centred window would sit behind them.
 */
const WINDOW_CY = 0.42;
const CARD_RADIUS = 18;
/** Same value as the liveness scrim, so the two cameras are lit identically. */
const SCRIM = 'rgba(0,8,20,0.6)';

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

/**
 * The four corner brackets, as one path.
 *
 * A plain rectangle outline says "a box is here"; brackets say "put the corners here", which
 * is the actual instruction — a card that fills the window but sits rotated is still a
 * rejected photo. They are drawn just inside the window so they read as part of its edge
 * rather than as a second frame around it.
 */
function cornerPath(x: number, y: number, w: number, h: number, r: number, len: number) {
  const x2 = x + w;
  const y2 = y + h;
  return [
    // top-left
    `M${x} ${y + r + len} L${x} ${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} L${x + r + len} ${y}`,
    // top-right
    `M${x2 - r - len} ${y} L${x2 - r} ${y} A${r} ${r} 0 0 1 ${x2} ${y + r} L${x2} ${y + r + len}`,
    // bottom-right
    `M${x2} ${y2 - r - len} L${x2} ${y2 - r} A${r} ${r} 0 0 1 ${x2 - r} ${y2} L${x2 - r - len} ${y2}`,
    // bottom-left
    `M${x + r + len} ${y2} L${x + r} ${y2} A${r} ${r} 0 0 1 ${x} ${y2 - r} L${x} ${y2 - r - len}`,
  ].join(' ');
}

export function KycIdCameraScreen({ navigation, route }: any) {
  const { t } = useI18n();
  const params = useMemo(() => route?.params ?? {}, [route?.params]);
  const side: 'front' | 'back' = params.side === 'back' ? 'back' : 'front';
  const { width, height } = useWindowDimensions();
  const { setIdImage } = useFlow();

  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  // VisionCamera 5 routes capture through an output attached to the session rather than a
  // method on the view's ref, so the output is created here and handed to <Camera>.
  // `quality` over `balanced`: this frame is going to an OCR pass, and a soft JPEG is the
  // difference between a read card and a trip to the failure screen.
  const photoOutput = usePhotoOutput({ qualityPrioritization: 'quality' });
  // Held by identity: `useCamera` reconfigures the session whenever this array changes, so
  // a fresh literal in the JSX would tear the preview down on every render.
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

  // Committed only on confirm, and the screen pops rather than pushing: the capture screen
  // with its two slots is where the user came from and where the new preview belongs.
  const onConfirm = useCallback(() => {
    if (!shot) return;
    setIdImage(side, shot);
    navigation?.goBack();
  }, [shot, side, setIdImage, navigation]);

  const cardW = Math.min(width - CARD_INSET * 2, CARD_MAX_W);
  const cardH = cardW / CARD_RATIO;
  const cardX = (width - cardW) / 2;
  const cardY = height * WINDOW_CY - cardH / 2;

  return (
    <View style={styles.screen}>
      {/* Live until the shutter fires, then frozen on the frame so the user judges the same
          picture that gets submitted. */}
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

      {/* The scrim, its window and the window's outline, in one SVG: a full-bleed rect
          masked by the card rect, so the window is a true hole rather than four rectangles
          faked around it. */}
      <Svg style={StyleSheet.absoluteFill} width={width} height={height} pointerEvents="none">
        <Defs>
          <Mask id="card">
            <Rect x={0} y={0} width={width} height={height} fill="#fff" />
            <Rect
              x={cardX}
              y={cardY}
              width={cardW}
              height={cardH}
              rx={CARD_RADIUS}
              ry={CARD_RADIUS}
              fill="#000"
            />
          </Mask>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill={SCRIM} mask="url(#card)" />
        {/* A hairline all the way round — enough to read the shape in a dark room, faint
            enough not to compete with the brackets. */}
        <Rect
          x={cardX}
          y={cardY}
          width={cardW}
          height={cardH}
          rx={CARD_RADIUS}
          ry={CARD_RADIUS}
          fill="none"
          stroke="rgba(201,162,75,0.45)"
          strokeWidth={1.5}
        />
        <Path
          d={cornerPath(cardX, cardY, cardW, cardH, CARD_RADIUS, cardW * 0.11)}
          fill="none"
          stroke={colors.gold}
          strokeWidth={4}
          strokeLinecap="round"
        />
      </Svg>

      {/* The comp darkens the bottom strip a second time, under the caption and shutter. */}
      <View style={[styles.bottomScrim, { height: height * (230 / 812) }]} pointerEvents="none" />

      <SafeAreaView style={styles.fill} edges={['top', 'bottom']}>
        <View style={styles.head}>
          {/* RTL: the control is written first so it takes the row's start — physical right,
              where the rest of the app puts it — and the title trails it. */}
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
          <Text style={styles.headTitle}>
            {t(side === 'back' ? S.kyc.idCamera.backTitle : S.kyc.idCamera.frontTitle)}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.caption}>
            {shot ? t(S.kyc.idCamera.check) : t(S.kyc.idCamera.hint)}
          </Text>

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

  head: {
    paddingHorizontal: 16,
    paddingTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
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
