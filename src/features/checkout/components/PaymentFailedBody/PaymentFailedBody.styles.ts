import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  body: { flex: 1, justifyContent: 'center', paddingHorizontal: 14, gap: 24 },
  hero: { alignItems: 'center', gap: 24 },
  title: {
    ...typography.authTitle,
    fontSize: 21,
    lineHeight: 32,
    color: colors.ink,
    textAlign: 'center',
    paddingHorizontal: 8,
    marginBottom: -12,
  },
  subtitle: {
    ...typography.introText,
    fontSize: 14.5,
    lineHeight: 23.2,
    color: colors.g5,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
