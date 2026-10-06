import { StyleSheet } from 'react-native';
import { colors, radius, shadows, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  intro: {
    alignItems: 'center',
    gap: 10,
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.card,
    backgroundColor: '#EAF3F0',
    ...shadows.card,
  },
  text: {
    ...typography.bodyText,
    fontSize: 13,
    lineHeight: 19.5,
    color: colors.green,
    textAlign: 'auto',
    flex: 1,
  },
});
