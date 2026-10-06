import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export const styles = StyleSheet.create({
  head: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.br2,
    paddingBottom: 18,
  },
  row: {
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: spacing.screenMargin,
    paddingTop: 10,
  },
  title: {
    ...typography.headerTitle,
    color: colors.ink,
    flex: 1,
    textAlign: 'auto',
  },
  trailing: {
    minWidth: 0,
  },
});
