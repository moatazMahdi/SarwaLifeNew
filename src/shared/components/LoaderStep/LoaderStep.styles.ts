import { StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';

export const styles = StyleSheet.create({
  row: { alignItems: 'center', gap: 12 },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotActive: { borderColor: colors.goldL },
  dotDone: { backgroundColor: colors.white, borderColor: colors.white },
  label: { ...typography.bodyText, color: 'rgba(255,255,255,0.5)', flex: 1, textAlign: 'auto' },
  labelOn: { color: colors.white },
});
