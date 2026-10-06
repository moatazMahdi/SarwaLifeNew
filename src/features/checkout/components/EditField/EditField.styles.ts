import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  field: { gap: 6 },
  label: { ...typography.helperText, fontSize: 13, lineHeight: 17, color: '#8A8FA3', textAlign: 'auto' },
  input: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.qBorder,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    ...typography.inputValue,
    color: colors.qInk,
  },
});
