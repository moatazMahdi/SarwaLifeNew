import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  method: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,105,87,0.1)',
    backgroundColor: colors.white,
  },
  on: { borderWidth: 2, borderColor: colors.green, margin: -1 },
  text: { flex: 1, gap: 8 },
  label: { ...typography.optTitle, fontSize: 16, lineHeight: 17.25, color: '#000000', textAlign: 'auto' },
  desc: { ...typography.helperText, fontSize: 14, lineHeight: 17.25, color: colors.g5, textAlign: 'auto' },
  radio: {
    width: 29,
    height: 29,
    borderRadius: 14.5,
    borderWidth: 1.5,
    borderColor: colors.g3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { borderColor: colors.green, borderWidth: 2 },
  radioDot: { width: 15, height: 15, borderRadius: 7.5, backgroundColor: colors.green },
});
