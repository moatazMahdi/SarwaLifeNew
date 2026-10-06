import { StyleSheet } from 'react-native';
import { colors, radius, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  note: {
    backgroundColor: '#F1F7F5',
    borderRadius: radius.md,
    borderStartWidth: 3,
    borderStartColor: colors.green,
    padding: 14,
    marginTop: 28,
  },
  text: { ...typography.cardBody, lineHeight: 19, color: colors.g7, textAlign: 'auto' },
});
