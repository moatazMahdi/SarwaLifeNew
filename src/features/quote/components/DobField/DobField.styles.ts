import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  block: { gap: 8 },
  label: { ...typography.inputLabel, color: colors.qInk, textAlign: 'auto' },
  field: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.qBorder,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 12,
  },
  fieldBad: { borderColor: colors.bad },
  input: {
    ...typography.inputValue,
    flex: 1,
    color: colors.qInk,
    paddingVertical: 0,
  },
});
