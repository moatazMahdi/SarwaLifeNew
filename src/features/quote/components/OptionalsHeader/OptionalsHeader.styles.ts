import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  rule: { height: 1, backgroundColor: colors.qRule },
  header: { gap: 6 },
  title: {
    ...typography.optTitle,
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: -0.3,
    color: colors.g7,
    textAlign: 'auto',
  },
  subtitle: { ...typography.optSubtitle, color: colors.qGreyT, textAlign: 'auto' },
});
