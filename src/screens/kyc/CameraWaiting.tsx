import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  AppState,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, typography } from '../../theme';
import { Icon } from '../../components/Icon';
import { S, useI18n } from '../../i18n';

/**
 * What fills the glass on the two in-app cameras while there is no preview to show — and,
 * more importantly, the way out when there never will be one.
 *
 * Both camera screens used to render the same four lines inline: a spinner, and one of two
 * sentences chosen on `hasPermission`. That was fine for the half-second before the stream
 * comes up and wrong for the case that actually traps people. Android shows its permission
 * dialogue twice; after a second refusal `requestPermission()` returns `false` immediately
 * and silently. The screen was then a spinner that would never stop, a line reading "نحتاج
 * إذن الكاميرا" with nothing to press, and a disabled shutter — in the middle of account
 * creation, which cannot be skipped. The user's only move was the back button, and backing
 * out returns them to a step whose button is still dark.
 *
 * So the refusal is treated as its own state rather than as a longer wait: no spinner,
 * because nothing is loading, and a button that goes where the permission actually lives.
 *
 * Lives in one file because the card camera and the selfie camera are the same machine in two
 * windows — a user refused on one of them should not meet a different explanation on the other.
 */
export function CameraWaiting({
  hasPermission,
  requestPermission,
}: {
  hasPermission: boolean;
  requestPermission: () => Promise<boolean>;
}) {
  const { t } = useI18n();
  const [denied, setDenied] = useState(false);
  // Guards against a second prompt racing the first — `requestPermission` resolves on the
  // user's tap, and React may have re-run the effect by then.
  const asking = useRef(false);

  const ask = useCallback(() => {
    if (hasPermission || asking.current) return;
    asking.current = true;
    requestPermission()
      .then((ok) => setDenied(!ok))
      .catch(() => setDenied(true))
      .finally(() => {
        asking.current = false;
      });
  }, [hasPermission, requestPermission]);

  useEffect(ask, [ask]);

  // The round trip through Settings is the whole point of the button below, and the app is
  // backgrounded for all of it — so the moment it comes forward again is the moment to look
  // at the permission afresh. Without this the user grants access, returns, and finds the
  // same refusal panel still sitting there.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'active') {
        setDenied(false);
        ask();
      }
    });
    return () => sub.remove();
  }, [ask]);

  if (denied && !hasPermission) {
    return (
      <View style={[StyleSheet.absoluteFill, styles.box]}>
        <View style={styles.disc}>
          <Icon name="camera" size={30} color={colors.white} />
        </View>
        <Text style={styles.title}>{t(S.kyc.camera.needPermission)}</Text>
        <Text style={styles.hint}>{t(S.kyc.camera.deniedHint)}</Text>
        <Pressable
          onPress={() => Linking.openSettings().catch(() => {})}
          accessibilityRole="button"
          style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
        >
          <Text style={styles.ctaLabel}>{t(S.kyc.camera.openSettings)}</Text>
        </Pressable>
      </View>
    );
  }

  // Either the stream is still coming up, or the OS dialogue is on top of this and the user
  // has not answered it yet. A spinner is honest in both.
  return (
    <View style={[StyleSheet.absoluteFill, styles.box]}>
      <ActivityIndicator color={colors.white} />
      <Text style={styles.title}>
        {hasPermission ? t(S.kyc.camera.starting) : t(S.kyc.camera.needPermission)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignItems: 'center', justifyContent: 'center', gap: 14, paddingHorizontal: 40 },
  disc: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  title: { ...typography.bodyText, color: 'rgba(255,255,255,0.9)', textAlign: 'center' },
  hint: {
    ...typography.cardBody,
    fontSize: 12.5,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  cta: {
    marginTop: 6,
    height: 48,
    paddingHorizontal: 28,
    borderRadius: 16,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaLabel: { ...typography.btnLabelMd, color: colors.white },
  pressed: { opacity: 0.7 },
});
