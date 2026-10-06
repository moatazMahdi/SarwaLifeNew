import { StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';

export const styles = StyleSheet.create({
  row: {
    alignItems: 'flex-start',
    gap: 6,
  },
  text: {
    ...typography.cardBody,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.bad,
    textAlign: 'auto',
    flex: 1,
  },
});
