import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, typography } from '../theme';
import { FieldError } from './FieldError';
import { Phrase, S, useI18n } from '../i18n';

/**
 * Egyptian mobiles are written locally as 11 digits including the trunk zero — 01025565540.
 * The field keeps that form, because it is the one people have memorised and read back off
 * a SIM card; stripping the zero to the 10-digit international NSN made the control fight
 * whatever the user typed.
 */
export const NSN_LEN = 11;

/**
 * LEFT-TO-RIGHT MARK. Digits are bidi-neutral, so a grouped number inside an RTL field
 * falls back to the paragraph direction and the groups render right-to-left — "10 002 772 33"
 * comes out as "33 772 002 10". One zero-width strong-LTR character at the head is enough to
 * make the first-strong heuristic resolve the run LTR on both platforms.
 */
export const LRM = '\u200E';

/**
 * Digits only, capped at the local length. Nothing is rewritten as the user types — the
 * leading zero stays, so what appears in the field is exactly what was entered, and the
 * 12th keystroke is simply ignored.
 */
export function toNsn(raw: string) {
  return raw.replace(/[^0-9]/g, '').slice(0, NSN_LEN);
}

/** "01025565540" reads as "0102 556 5540" — the grouping the number is spoken in. */
export function groupPhone(nsn: string) {
  const g = [nsn.slice(0, 4), nsn.slice(4, 7), nsn.slice(7, 11)];
  const grouped = g.filter(Boolean).join(' ');
  // The mark is stripped again by the digits-only filter in `onChangeText`, and it never
  // sits last, so backspace always meets a digit.
  return grouped ? LRM + grouped : '';
}

/** Egyptian mobiles are 11 digits opening with 010, 011, 012 or 015. */
export const isCompleteNsn = (nsn: string) =>
  nsn.length === NSN_LEN && /^01[0125]/.test(nsn);

/**
 * "0102 •••• 40" — the opening group, four dots, the last pair. Lives here next to the
 * grouping it mirrors, and is shared by both OTP screens so the login and account-creation
 * headers cannot drift apart.
 */
export function maskPhone(nsn: string) {
  const n = nsn || '01000000000';
  return `${LRM}${n.slice(0, 4)} •••• ${n.slice(-2)}`;
}

/**
 * The one message the field ever shows.
 *
 * It does not say *why* the number was rejected. A user who typed a Saudi or a UAE mobile
 * does not need to be told his country is unsupported in the middle of a form — that reads
 * as a door being closed; what he needs is to be told the field is wrong so he fixes it. The
 * same line therefore covers a short number, a bad prefix and a foreign one alike.
 *
 * A `Phrase`, not a finished string: this is evaluated at module load, long before a
 * language is known, so the choice has to be deferred to render.
 */
export const PHONE_ERROR: Phrase = S.auth.phoneField.error;

/**
 * The number, its error, and the rules tying the two together — held here rather than in
 * each screen so the login and the account-creation forms cannot drift into validating
 * differently, which is exactly the kind of difference nobody notices until a user hits it.
 *
 * The shape of the interaction: the error appears when the user *leaves* an incomplete
 * field or presses the button, and clears on the next keystroke. Nothing is ever rejected
 * mid-typing — a number is not wrong until the person has finished writing it.
 */
export function usePhoneEntry() {
  const { t } = useI18n();
  const [value, setValue] = useState('');
  // The rejection is held as a `Phrase` and written only at render, so the message is in
  // whatever language is on screen rather than the one that happened to be loaded when the
  // user tripped the rule.
  const [error, setError] = useState<Phrase | null>(null);

  const onChange = (next: string) => {
    setValue(next);
    setError(null);
  };

  /** Returns whether the number passed, so a caller can gate navigation on one call. */
  const validate = () => {
    const ok = isCompleteNsn(value);
    setError(ok ? null : PHONE_ERROR);
    return ok;
  };

  // An empty field is not yet an error — it is a form the user has not started.
  const onBlurField = () => {
    if (value.length > 0) validate();
  };

  return { value, error: error ? t(error) : null, onChange, onBlurField, validate };
}

type Props = {
  value: string;
  onChange: (nsn: string) => void;
  onSubmit?: () => void;
  /** A `Phrase`, because the default below is evaluated before a language is known. */
  label?: Phrase;
  /** Shown under the field and reddens its border. Controlled by the screen, not the field,
   *  because only the screen knows whether the user has finished typing. */
  error?: string | null;
  onBlurField?: () => void;
};

/**
 * Figma 2069:3772 (login) and 2070:3922 (account creation) draw the same control, so both
 * screens mount this one — "same field" is then a fact rather than a resemblance that has
 * to be maintained by hand.
 */
export function PhoneField({
  value,
  onChange,
  onSubmit,
  // The default is the phrase, not its Arabic half: a default parameter is evaluated when
  // the component renders but written where no language is in scope, so it is resolved
  // below with the rest of the copy.
  label = S.auth.phoneField.label,
  error,
  onBlurField,
}: Props) {
  const { t } = useI18n();
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const labelText = t(label);

  return (
    <View style={styles.block}>
      <Text style={styles.label}>{labelText}</Text>
      {/* Focus wins over error: once the user is back in the field fixing it, a red ring is
          no longer telling him anything he does not already know. */}
      <Pressable
        onPress={() => inputRef.current?.focus()}
        style={[styles.field, error && styles.fieldBad, focused && styles.fieldOn]}
      >
        {/* RTL: the country chip is rendered first so it lands physically right. */}
        <View style={styles.country}>
          {/* RTL: the flag is rendered first so it sits right of "+20". */}
          <LinearGradient
            colors={['#C8102E', '#C8102E', '#FFFFFF', '#FFFFFF', '#000000', '#000000']}
            locations={[0, 0.33, 0.33, 0.66, 0.66, 1]}
            style={styles.flag}
          />
          <Text style={styles.countryCode}>+20</Text>
        </View>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={groupPhone(value)}
          onChangeText={(raw) => onChange(toNsn(raw))}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlurField?.();
          }}
          placeholder={`${LRM}0100 000 0000`}
          placeholderTextColor={colors.g4}
          keyboardType="number-pad"
          autoComplete="tel"
          textContentType="telephoneNumber"
          returnKeyType="done"
          // Fired unconditionally — the screen's handler validates, and a "done" key that
          // silently does nothing is the same dead end the disabled button was.
          onSubmitEditing={onSubmit}
          // The `textAlign` *prop* on TextInput is not RTL-swapped, unlike the style.
          textAlign="left"
          accessibilityLabel={labelText}
        />
      </Pressable>
      <FieldError message={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: { gap: 8 },
  label: { ...typography.inputLabel, fontSize: 14, color: colors.qInk, textAlign: 'auto' },

  field: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.qBorder,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fieldOn: { borderColor: colors.green },
  fieldBad: { borderColor: colors.bad, backgroundColor: colors.badBg },
  country: {
    width: 75,
    height: 38.5,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.br,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  flag: { width: 20, height: 15, borderRadius: 2 },
  countryCode: { ...typography.authCode, color: colors.ink },
  input: {
    flex: 1,
    ...typography.authPhone,
    color: colors.ink,
    padding: 0,
  },
});
