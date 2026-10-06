import { StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';

export const styles = StyleSheet.create({
  btn: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
  },
  btnLight: { borderColor: '#F0F0F0', backgroundColor: colors.white },
  btnDark: { borderColor: 'rgba(255,255,255,0.28)', backgroundColor: 'rgba(255,255,255,0.12)' },
  label: { ...typography.btnLabelSm, fontSize: 13, lineHeight: 20, textAlign: 'center' },
  labelLight: { color: colors.ink },
  labelDark: { color: colors.white },
});
