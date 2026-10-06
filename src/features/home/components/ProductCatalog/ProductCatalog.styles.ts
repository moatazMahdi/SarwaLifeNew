import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 96,
  },
  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.ink,
    textAlign: 'auto',
    marginBottom: 13,
  },
  cards: {
    gap: 11,
  },
});
