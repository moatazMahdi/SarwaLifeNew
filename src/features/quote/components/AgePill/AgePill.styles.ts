import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  pill: {
    backgroundColor: 'rgba(0,105,87,0.1)',
    borderRadius: 15,
    paddingEnd: 16,
    paddingStart: 21,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  caption: { ...typography.ageCaption, color: colors.qGreenInk },
  number: { ...typography.ageNumber, color: colors.qGreenInk },
});
