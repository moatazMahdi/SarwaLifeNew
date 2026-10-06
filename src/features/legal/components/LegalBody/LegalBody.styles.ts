import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  body: { padding: spacing.screenMargin, paddingBottom: 40 },
  updated: { ...typography.badgeLabel, color: colors.g4, textAlign: 'auto' },
  intro: {
    ...typography.introText,
    color: colors.g5,
    textAlign: 'auto',
    marginTop: 8,
  },
});
