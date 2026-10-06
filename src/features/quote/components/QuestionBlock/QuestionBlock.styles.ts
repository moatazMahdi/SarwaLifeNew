import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  block: { gap: 8 },
  label: { ...typography.inputLabel, color: colors.qInk, textAlign: 'auto' },
  row: { gap: 8 },
});
