import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  legal: { ...typography.footerNote, color: colors.g4, textAlign: 'center' },
  link: {
    ...typography.footerLink,
    color: colors.green,
    textDecorationLine: 'underline',
  },
});
