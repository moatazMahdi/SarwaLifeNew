import { StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';

export const styles = StyleSheet.create({
  head: {
    height: 60,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 12,
  },
  title: {
    ...typography.pageTitle,
    color: colors.qGreenInk,
    textAlign: 'auto',
    lineHeight: 32,
    includeFontPadding: false,
    flex: 1,
  },
});
