import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

export const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.screenMargin,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: colors.br2,
  },
});
