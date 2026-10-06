import React from 'react';
import { Platform } from 'react-native';
import { AnimatedBox, AnimatedTouchable, AppInput, Box } from '../../../../shared/components';
import { opacityStyle } from '../../../../shared/theme';
import { S, useI18n } from '../../../../shared/i18n';
import { useOtpInput } from '../../hooks/useOtpInput';
import { OtpDigit } from '../OtpDigit/OtpDigit';
import { shakeStyle, styles } from './OtpInput.styles';

type Props = {
  length?: number;
  value: string;
  onChangeText: (v: string) => void;
  autoFocus?: boolean;
  busy?: boolean;
  error?: boolean;
};

export function OtpInput({ length = 6, value, onChangeText, autoFocus = true, busy, error }: Props) {
  const { t } = useI18n();
  const { inputRef, caret, translateX, focus } = useOtpInput(error);
  const digits = Array.from({ length }, (_, i) => value[i] ?? '');
  const activeIndex = Math.min(value.length, length - 1);

  return (
    <AnimatedTouchable
      style={[styles.row, busy && styles.busy, shakeStyle(translateX)]}
      onPress={focus}
      accessibilityRole="none"
    >
      {digits.map((digit, i) => {
        const on = i === activeIndex && value.length < length && !busy && !error;
        return (
          <Box key={i} style={styles.cell}>
            {on ? <Box style={styles.ring} /> : null}
            <Box style={[styles.box, on && styles.boxOn, error && styles.boxBad]}>
              {digit ? (
                <OtpDigit value={digit} />
              ) : on ? (
                <AnimatedBox style={[styles.caret, opacityStyle(caret)]} />
              ) : null}
            </Box>
          </Box>
        );
      })}
      <AppInput
        ref={inputRef}
        value={value}
        onChangeText={(raw) => onChangeText(raw.replace(/[^0-9]/g, '').slice(0, length))}
        keyboardType="number-pad"
        maxLength={length}
        style={styles.hidden}
        autoFocus={autoFocus}
        autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'}
        textContentType="oneTimeCode"
        importantForAutofill="yes"
        caretHidden
        accessibilityLabel={t(S.auth.otp.a11yCode)}
      />
    </AnimatedTouchable>
  );
}
