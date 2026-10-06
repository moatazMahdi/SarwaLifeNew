import { StyleSheet } from 'react-native';
import { colors, gradients, typography } from '../../../../shared/theme';

export const TICK_FILL = {
  colors: [...gradients.brand.colors],
  locations: [...gradients.brand.locations],
  useAngle: true,
  angle: 145,
};

export const styles = StyleSheet.create({
  row: { alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  label: { ...typography.helperText, fontSize: 13, lineHeight: 17, color: '#4A4E63', textAlign: 'auto' },
  labelStrong: { fontSize: 17, lineHeight: 24, flexShrink: 1 },
  valueGroup: { flexShrink: 1, alignItems: 'center', gap: 6 },
  valueGroupStrong: { flexShrink: 0 },
  value: {
    ...typography.optSubtitle,
    fontSize: 16,
    lineHeight: 21,
    color: '#000000',
    textAlign: 'auto',
    flexShrink: 1,
  },
  valueAccent: { color: colors.green },
  valueStrong: {
    ...typography.premiumAmount,
    fontSize: 25,
    lineHeight: 36,
    letterSpacing: -0.6,
    color: colors.green,
    flexShrink: 0,
  },
  unit: {
    ...typography.optSubtitle,
    fontSize: 16,
    lineHeight: 21,
    color: colors.green,
    flexShrink: 0,
  },
  unitStrong: { fontSize: 14 },
  tick: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
