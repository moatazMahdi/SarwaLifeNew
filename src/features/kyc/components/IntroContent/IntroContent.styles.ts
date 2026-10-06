import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  body: { padding: spacing.screenMargin, paddingBottom: 30 },
  headline: {
    ...typography.headline,
    fontSize: 22,
    lineHeight: 33,
    color: colors.ink,
    textAlign: 'auto',
    marginTop: 22,
  },
  subtitle: {
    ...typography.introText,
    color: colors.g5,
    textAlign: 'auto',
    marginTop: 8,
  },
});
