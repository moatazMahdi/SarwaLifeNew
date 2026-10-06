import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  row: { alignItems: 'center', gap: 8 },
  label: { ...typography.rowLabel, color: colors.qGreyRow, textAlign: 'auto', flex: 1 },
  amount: { ...typography.rowAmount, color: colors.qInkD },
  amountOn: { color: colors.green },
});
