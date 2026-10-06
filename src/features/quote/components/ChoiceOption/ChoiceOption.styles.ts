import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const fontSizeStyle = (fontSize?: number) => (fontSize ? { fontSize } : null);

export const styles = StyleSheet.create({
  choice: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  off: {
    borderWidth: 1,
    borderColor: colors.qBorder,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  on: {
    borderWidth: 2,
    borderColor: colors.green,
    paddingHorizontal: 11,
  },
  textOn: {
    ...typography.choiceOn,
    color: colors.green,
    textAlign: 'auto',
    flexShrink: 1,
  },
  textOff: { ...typography.choiceOff, color: colors.qInk, textAlign: 'center' },
});
