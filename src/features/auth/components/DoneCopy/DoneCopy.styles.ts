import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, gap: 24 },
  titleBlock: { gap: 8, alignSelf: 'stretch' },
  title: {
    ...typography.authTitle,
    fontSize: 24,
    lineHeight: 36,
    letterSpacing: -0.4,
    color: colors.ink,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.introText,
    fontSize: 14.5,
    lineHeight: 23.2,
    color: '#6B7280',
    textAlign: 'center',
  },
});
