import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  head: {
    height: 60,
    paddingHorizontal: 16,
    paddingTop: 8,
    alignItems: 'flex-start',
    gap: 12,
  },
  titleWrap: { flex: 1, height: 48, justifyContent: 'center' },
  title: { ...typography.pageTitle, color: colors.qGreenInk, textAlign: 'auto' },
});
