import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  bottom: { width: '100%', gap: 56 },
  textBlock: { alignItems: 'center', gap: 20, paddingHorizontal: 20 },
  dotsAndTitle: { width: '100%', alignItems: 'center', gap: 10 },
  headline: {
    ...typography.obHeadline,
    color: colors.green,
    textAlign: 'center',
    width: '100%',
  },
  subtitle: {
    ...typography.obSubtitle,
    color: '#444745',
    textAlign: 'center',
    width: '100%',
  },
  buttonWrap: {
    paddingHorizontal: 38,
    paddingBottom: 12,
  },
});
