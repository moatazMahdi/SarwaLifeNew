import { StyleSheet } from 'react-native';
import { colors, gradients, typography } from '../../../../shared/theme';

export const BADGE_FILL = {
  colors: [...gradients.brand.colors],
  locations: [...gradients.brand.locations],
  useAngle: true,
  angle: 145,
};

export const styles = StyleSheet.create({
  rule: { height: 1, backgroundColor: 'rgba(5,74,61,0.12)' },
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 10,
  },
  label: { ...typography.helperText, fontSize: 13, color: colors.qGreyRow, textAlign: 'auto' },
  valueGroup: { flexShrink: 1, alignItems: 'center', gap: 8 },
  value: {
    ...typography.optTitle,
    fontSize: 16,
    lineHeight: 24,
    color: colors.green,
    textAlign: 'auto',
    flexShrink: 1,
  },
  badge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
