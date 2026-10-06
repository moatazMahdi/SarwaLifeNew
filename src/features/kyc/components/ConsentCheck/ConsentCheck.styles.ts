import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  consent: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  text: { flex: 1, gap: 2 },
  line: { ...typography.bodyText, color: colors.g7, textAlign: 'auto' },
  link: {
    ...typography.linkText,
    color: colors.green,
    textDecorationLine: 'underline',
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.g3,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxOn: { backgroundColor: colors.green, borderColor: colors.green },
});
