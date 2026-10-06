import { StyleSheet } from 'react-native';
import { colors, radius, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  note: {
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#F1F7F5',
    borderRadius: radius.md,
    overflow: 'hidden',
    padding: 14,
    marginTop: 22,
  },
  bar: { position: 'absolute', start: 0, top: 0, bottom: 0, width: 3, backgroundColor: colors.green },
  text: {
    ...typography.cardBody,
    lineHeight: 19,
    color: colors.g7,
    flex: 1,
    textAlign: 'auto',
  },
});
