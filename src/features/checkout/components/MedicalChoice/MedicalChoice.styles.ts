import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  choice: {
    flex: 1,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.qBorder,
    backgroundColor: colors.white,
  },
  on: { borderWidth: 2, borderColor: colors.green },
  label: { ...typography.choiceOff, color: colors.qInk, textAlign: 'center' },
  labelOn: { ...typography.choiceOn, color: colors.green, flex: 1, textAlign: 'auto' },
  pressed: { opacity: 0.75 },
});
