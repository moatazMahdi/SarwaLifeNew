import React, { useEffect, useRef } from 'react';
import {
  Animated,
  I18nManager,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { colors, typography } from '../theme';
import { S, useI18n } from '../i18n';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  length?: number;
  value: string;
  onChangeText: (v: string) => void;
  autoFocus?: boolean;
  /** Dims the boxes while the entered code is being checked. */
  busy?: boolean;
  /**
   * Reddens the cells and shakes the row once. Kept as a boolean rather than the message
   * itself — the wording belongs under the control, next to the resend link the user is
   * about to need, not squeezed between the boxes.
   */
  error?: boolean;
};

/**
 * Figma 2069:3882 — six 50.7×68.85 cells. The focused cell grows a 2.22px brand border
 * plus a 4.44px tinted ring and shows a blinking caret.
 *
 * The real input is a single hidden <TextInput>; that is what makes platform OTP
 * auto-fill work (`autoComplete="sms-otp"` on Android, `textContentType="oneTimeCode"`
 * on iOS) — per-box inputs would only ever receive the first digit.
 */
const BOX_W = 50.7;
const BOX_H = 68.85;
const RING = 4.44;
/** Figma lays the cells out inside a 62px slot and lets them bleed 3.42px either side. */
const BLEED = (BOX_H - 62) / 2;

export function OtpInput({
  length = 6,
  value,
  onChangeText,
  autoFocus = true,
  busy,
  error,
}: Props) {
  const { t } = useI18n();
  const inputRef = useRef<TextInput>(null);
  const caret = useRef(new Animated.Value(1)).current;
  const shake = useRef(new Animated.Value(0)).current;

  const digits = Array.from({ length }, (_, i) => value[i] ?? '');
  const activeIndex = Math.min(value.length, length - 1);

  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(caret, { toValue: 0, duration: 520, useNativeDriver: true }),
        Animated.timing(caret, { toValue: 1, duration: 520, useNativeDriver: true }),
      ]),
    );
    blink.start();
    return () => blink.stop();
  }, [caret]);

  /**
   * A rejected code shakes once. The red border says the code is wrong; the movement says
   * the app *heard* the attempt — without it, a user who retypes the same six digits gets a
   * screen that looks completely unchanged and cannot tell whether anything happened.
   *
   * Symmetric and self-cancelling, so it leaves no offset behind to undo.
   */
  useEffect(() => {
    if (!error) return;
    shake.setValue(0);
    Animated.sequence([
      Animated.timing(shake, { toValue: 1, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -1, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0.6, duration: 55, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 55, useNativeDriver: true }),
    ]).start();
  }, [error, shake]);

  const translateX = shake.interpolate({ inputRange: [-1, 1], outputRange: [-7, 7] });

  return (
    <AnimatedPressable
      style={[styles.row, busy && styles.busy, { transform: [{ translateX }] }]}
      onPress={() => inputRef.current?.focus()}
      accessibilityRole="none"
    >
      {/* A code is always read left-to-right, in either language, so cell 0 has to sit at the
          physical left whatever the layout direction is — hence the reversal under RTL and
          the plain row under LTR, rather than a fixed `row-reverse`. */}
      {digits.map((digit, i) => {
        // The focus ring is suppressed while the row is in error: green "you are here" and
        // red "this is wrong" on the same cell cancel each other out.
        const on = i === activeIndex && value.length < length && !busy && !error;
        return (
          <View key={i} style={styles.cell}>
            {on ? <View style={styles.ring} /> : null}
            <View style={[styles.box, on && styles.boxOn, error && styles.boxBad]}>
              {digit ? (
                <Digit value={digit} />
              ) : on ? (
                <Animated.View style={[styles.caret, { opacity: caret }]} />
              ) : null}
            </View>
          </View>
        );
      })}

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(raw) => onChangeText(raw.replace(/[^0-9]/g, '').slice(0, length))}
        keyboardType="number-pad"
        maxLength={length}
        style={styles.hidden}
        autoFocus={autoFocus}
        // ——— platform OTP auto-fill ———
        autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'}
        textContentType="oneTimeCode"
        importantForAutofill="yes"
        caretHidden
        accessibilityLabel={t(S.auth.otp.a11yCode)}
      />
    </AnimatedPressable>
  );
}

/** Each digit pops in as it lands — including the whole burst of an auto-filled code. */
function Digit({ value }: { value: string }) {
  const pop = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    pop.setValue(0);
    Animated.spring(pop, { toValue: 1, friction: 6, tension: 220, useNativeDriver: true }).start();
  }, [value, pop]);
  const scale = pop.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] });
  return (
    <Animated.Text style={[styles.digit, { opacity: pop, transform: [{ scale }] }]}>
      {value}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    // Keeps the laid-out height at Figma's 62px while the cells still draw at 68.85.
    marginVertical: -BLEED,
  },
  busy: { opacity: 0.6 },
  cell: { width: BOX_W, height: BOX_H, alignItems: 'center', justifyContent: 'center' },
  // Figma: `box-shadow: 0 0 0 4.442px rgba(0,105,87,0.1)` — drawn as a plate behind the box.
  ring: {
    position: 'absolute',
    top: -RING,
    bottom: -RING,
    left: -RING,
    right: -RING,
    borderRadius: 15.55 + RING,
    backgroundColor: 'rgba(0,105,87,0.1)',
  },
  box: {
    width: BOX_W,
    height: BOX_H,
    borderRadius: 15.55,
    borderWidth: 1.11,
    borderColor: '#CDCDCD',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxOn: { borderWidth: 2.22, borderColor: colors.green },
  boxBad: { borderWidth: 2.22, borderColor: colors.bad, backgroundColor: colors.badBg },
  caret: { width: 2.22, height: 28.87, borderRadius: 1.11, backgroundColor: colors.green },
  digit: { ...typography.authOtpDigit, color: colors.ink },
  hidden: { position: 'absolute', width: 1, height: 1, opacity: 0 },
});
