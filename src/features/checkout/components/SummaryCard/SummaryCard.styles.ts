import { StyleSheet } from 'react-native';
import { colors } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(5,74,61,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(5,74,61,0.12)',
    borderRadius: 16,
    padding: 24,
    gap: 20,
  },
  cardFooted: { paddingBottom: 12 },
  cardPlain: {
    backgroundColor: colors.white,
    borderColor: colors.br,
  },
  rows: { gap: 12 },
  rule: { height: 1, backgroundColor: 'rgba(5,74,61,0.12)' },
});
