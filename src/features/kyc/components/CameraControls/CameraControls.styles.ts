import { StyleSheet } from 'react-native';
import { colors } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  confirmRow: { alignItems: 'center', gap: 12 },
  shutter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.gold,
    borderWidth: 2,
    borderColor: colors.goldL,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
