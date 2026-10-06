import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  note: {
    alignItems: 'center',
    gap: 9,
    backgroundColor: colors.warnBg2,
    borderRadius: 13,
    overflow: 'hidden',
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  bar: { position: 'absolute', start: 0, top: 0, bottom: 0, width: 3, backgroundColor: colors.gold },
  text: {
    ...typography.bodyText,
    lineHeight: 19.38,
    color: colors.goldTx,
    textAlign: 'auto',
    flex: 1,
  },
});
