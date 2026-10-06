import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  row: { alignItems: 'flex-start', gap: 9, marginTop: 10 },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.green,
    marginTop: 8,
  },
  text: {
    ...typography.cardBody,
    fontSize: 12.5,
    lineHeight: 21,
    color: colors.g7,
    flex: 1,
    textAlign: 'auto',
  },
});
