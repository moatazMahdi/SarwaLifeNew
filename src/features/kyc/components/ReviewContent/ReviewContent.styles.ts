import { StyleSheet } from 'react-native';
import { colors } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  body: { paddingHorizontal: 28, paddingTop: 24, paddingBottom: 12, gap: 24 },
  card: {
    backgroundColor: 'rgba(5,74,61,0.05)',
    borderWidth: 1,
    borderColor: colors.greenD,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 4,
  },
});
