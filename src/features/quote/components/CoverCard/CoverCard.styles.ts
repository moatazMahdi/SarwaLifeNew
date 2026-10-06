import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  block: { gap: 8 },
  heading: { ...typography.quoteHeading, color: colors.qInk, textAlign: 'auto' },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    gap: 12,
    shadowColor: 'rgba(26,26,26,1)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  valueRow: { alignItems: 'baseline', justifyContent: 'center', gap: 6 },
  value: { ...typography.sliderValue, color: colors.green },
  unit: { ...typography.sliderUnit, color: colors.qAmount },
  bounds: {
    justifyContent: 'space-between',
    gap: 12,
    paddingBottom: 2,
  },
  bound: { ...typography.sliderBound, color: colors.qGreySl },
});
