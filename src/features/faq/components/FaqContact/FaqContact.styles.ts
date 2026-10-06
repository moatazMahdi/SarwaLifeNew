import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  tail: {
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.br2,
    backgroundColor: colors.white,
    gap: 15,
  },
  title: {
    ...typography.cardTitle,
    fontSize: 14,
    lineHeight: 21,
    color: colors.ink,
    textAlign: 'center',
  },
});
