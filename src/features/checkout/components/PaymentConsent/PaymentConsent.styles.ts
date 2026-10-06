import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  consent: { alignItems: 'flex-start', gap: 9 },
  text: { ...typography.bodyText, color: colors.g7, textAlign: 'auto', flex: 1 },
  link: { ...typography.linkText, color: colors.green, textDecorationLine: 'underline' },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.g3,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  boxOn: { backgroundColor: colors.green, borderColor: colors.green },
});
