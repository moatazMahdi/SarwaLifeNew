import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const TOTAL_FILL = {
  colors: ['#F1F8F6', '#E7F2EE'],
  useAngle: true,
  angle: 140.87,
};

export const styles = StyleSheet.create({
  rule: { height: 1, backgroundColor: colors.qRule },
  block: { gap: 16 },
  title: { ...typography.optTitle, color: colors.qInkD, textAlign: 'auto' },
  card: {
    backgroundColor: colors.qCardBg,
    borderWidth: 1,
    borderColor: colors.qCardBr,
    borderRadius: 12,
    padding: 16,
    gap: 18,
  },
  total: {
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  totalLabel: { ...typography.totalText, color: colors.ink },
  totalValue: { ...typography.totalText, color: colors.green },
});
