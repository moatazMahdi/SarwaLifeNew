import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  block: { gap: 12 },
  label: { ...typography.helperText, fontSize: 13, lineHeight: 17, color: '#4A4E63', textAlign: 'auto' },
  body: {
    backgroundColor: 'rgba(0,105,87,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.qRule,
    padding: 12,
  },
  value: {
    ...typography.optSubtitle,
    fontSize: 16,
    lineHeight: 25,
    color: '#000000',
    textAlign: 'auto',
  },
});
