import React from 'react';
import { I18nManager } from 'react-native';
import { AppInput, AppText, Box } from '../../../../shared/components';
import { colors } from '../../../../shared/theme';
import { styles } from './EditField.styles';

type Props = { label: string; value: string; numeric?: boolean; onChange: (v: string) => void };

export function EditField({ label, value, numeric, onChange }: Props) {
  return (
    <Box style={styles.field}>
      <AppText style={styles.label}>{label}</AppText>
      <AppInput
        value={value}
        onChangeText={onChange}
        keyboardType={numeric ? 'number-pad' : 'default'}
        placeholderTextColor={colors.qGrey}
        style={styles.input}
        textAlign={I18nManager.isRTL ? 'right' : 'left'}
      />
    </Box>
  );
}
