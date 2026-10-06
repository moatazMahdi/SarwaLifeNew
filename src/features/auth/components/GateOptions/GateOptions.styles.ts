import { StyleSheet } from 'react-native';
import { colors } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 44,
  },
  stack: { gap: 24 },
  rows: { gap: 20 },
});
