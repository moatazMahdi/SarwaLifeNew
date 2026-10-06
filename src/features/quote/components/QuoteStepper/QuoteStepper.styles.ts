import { StyleSheet } from 'react-native';
import { colors } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 20, paddingVertical: 12 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 17,
    padding: 16,
    shadowColor: 'rgba(26,26,26,1)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
  },
  inner: { height: 50 },
  beadRow: { alignItems: 'center', paddingHorizontal: 20 },
});
