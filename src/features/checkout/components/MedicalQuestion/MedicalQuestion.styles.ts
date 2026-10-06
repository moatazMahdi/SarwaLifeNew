import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  question: { gap: 12 },
  text: {
    ...typography.inputLabel,
    fontSize: 14,
    color: colors.qInk,
    textAlign: 'auto',
    letterSpacing: -0.4,
  },
  choices: { gap: 8 },
});
