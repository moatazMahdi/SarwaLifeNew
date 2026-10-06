import { StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';

export const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    gap: 9,
  },
  bar: {
    width: 4,
    height: 18,
    borderRadius: 2,
    backgroundColor: colors.green,
  },
  title: {
    ...typography.sectionTitle,
    color: colors.ink,
    textAlign: 'auto',
  },
});
