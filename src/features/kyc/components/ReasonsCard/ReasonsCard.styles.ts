import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.br,
    padding: 18,
    gap: 12,
  },
  title: { ...typography.cardTitle, color: colors.ink, textAlign: 'auto' },
  reason: { alignItems: 'flex-start', gap: 10 },
  dot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: colors.bad, marginTop: 8 },
  text: {
    ...typography.cardBody,
    fontSize: 13,
    lineHeight: 21,
    color: colors.g5,
    textAlign: 'auto',
    flex: 1,
  },
});
