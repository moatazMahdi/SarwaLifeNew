import { StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';

export const styles = StyleSheet.create({
  note: {
    backgroundColor: colors.warnBg2,
    borderRadius: 13,
    overflow: 'hidden',
  },
  bar: {
    position: 'absolute',
    start: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: colors.gold,
  },
  row: {
    alignItems: 'center',
    gap: 9,
    paddingEnd: 31,
    paddingStart: 11,
    paddingVertical: 11.81,
  },
  text: { ...typography.bodyText, color: colors.goldTx, textAlign: 'auto', flex: 1 },
});
