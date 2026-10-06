import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme';
import { Phrase, S, useI18n } from '../../i18n';
import { usePhoneField } from '../../hooks/usePhoneField';
import { groupPhone, PHONE_PLACEHOLDER } from '../../utils/phone';
import { AppInput } from '../AppInput/AppInput';
import { AppText } from '../AppText/AppText';
import { Box } from '../Box/Box';
import { FieldError } from '../FieldError/FieldError';
import { Row } from '../Row/Row';
import { Touchable } from '../Touchable/Touchable';
import { FLAG, styles } from './PhoneField.styles';

type Props = {
  value: string;
  onChange: (nsn: string) => void;
  onSubmit?: () => void;
  label?: Phrase;
  error?: string | null;
  onBlurField?: () => void;
};

export function PhoneField({
  value,
  onChange,
  onSubmit,
  label = S.auth.phoneField.label,
  error,
  onBlurField,
}: Props) {
  const { t } = useI18n();
  const field = usePhoneField(onChange, onBlurField);
  const labelText = t(label);

  return (
    <Box style={styles.block}>
      <AppText style={styles.label}>{labelText}</AppText>
      <Touchable
        onPress={field.focusInput}
        style={[styles.field, error && styles.fieldBad, field.focused && styles.fieldOn]}
      >
        <Row style={styles.country}>
          <LinearGradient {...FLAG} style={styles.flag} />
          <AppText style={styles.countryCode}>+20</AppText>
        </Row>
        <AppInput
          ref={field.inputRef}
          style={styles.input}
          value={groupPhone(value)}
          onChangeText={field.onChangeText}
          onFocus={field.onFocus}
          onBlur={field.onBlur}
          placeholder={PHONE_PLACEHOLDER}
          placeholderTextColor={colors.g4}
          keyboardType="number-pad"
          autoComplete="tel"
          textContentType="telephoneNumber"
          returnKeyType="done"
          onSubmitEditing={onSubmit}
          textAlign="left"
          accessibilityLabel={labelText}
        />
      </Touchable>
      <FieldError message={error} />
    </Box>
  );
}
