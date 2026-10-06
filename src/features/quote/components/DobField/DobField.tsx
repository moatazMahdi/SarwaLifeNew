import React from 'react';
import { I18nManager } from 'react-native';
import { AppInput, AppText, Box, FieldError, Icon, Row } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { S, useI18n } from '../../../../shared/i18n';
import { useDobField } from '../../hooks/useDobField';
import { DobParts, withSlashes } from '../../utils/dob';
import { styles } from './DobField.styles';

type Props = { dob: DobParts; onDob: (next: DobParts) => void; age: number };

export function DobField({ dob, onDob, age }: Props) {
  const { t } = useI18n();
  const { digits, onType, error } = useDobField(dob, onDob, age);

  return (
    <Box style={styles.block}>
      <AppText style={styles.label}>{t(S.quote.data.dob)}</AppText>
      <Row style={[styles.field, !!error && styles.fieldBad]}>
        <AppInput
          value={withSlashes(digits)}
          onChangeText={onType}
          placeholder={t(S.quote.data.dobHint)}
          placeholderTextColor={colors.qGrey}
          keyboardType="number-pad"
          maxLength={10}
          accessibilityLabel={t(S.quote.data.dob)}
          style={styles.input}
          textAlign={I18nManager.isRTL ? 'right' : 'left'}
        />
        <Icon name="calendar" size={20} color={colors.qGrey} />
      </Row>
      <FieldError message={error} />
    </Box>
  );
}
