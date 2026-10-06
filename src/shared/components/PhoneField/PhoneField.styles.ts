import { StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';

export const FLAG = {
  colors: ['#C8102E', '#C8102E', '#FFFFFF', '#FFFFFF', '#000000', '#000000'],
  locations: [0, 0.33, 0.33, 0.66, 0.66, 1],
};

export const styles = StyleSheet.create({
  block: { gap: 8 },
  label: { ...typography.inputLabel, fontSize: 14, color: colors.qInk, textAlign: 'auto' },
  field: {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.qBorder,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fieldOn: { borderColor: colors.green },
  fieldBad: { borderColor: colors.bad, backgroundColor: colors.badBg },
  country: {
    width: 75,
    height: 38.5,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.br,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  flag: { width: 20, height: 15, borderRadius: 2 },
  countryCode: { ...typography.authCode, color: colors.ink },
  input: {
    flex: 1,
    ...typography.authPhone,
    color: colors.ink,
    padding: 0,
  },
});
