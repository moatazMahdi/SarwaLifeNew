import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  bottom: { alignItems: 'center', justifyContent: 'flex-end', gap: 16 },
  caption: { ...typography.countLabel, color: colors.goldTx, textAlign: 'auto' },
  counter: {
    width: 112,
    height: 34,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: colors.goldBr,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingEnd: 3,
    paddingStart: 6,
  },
  value: { ...typography.countValue, color: colors.ink },
  valueOff: { color: colors.g4 },
});
