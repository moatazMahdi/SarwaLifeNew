import { StyleSheet } from 'react-native';
import { colors, radius } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  illustration: { alignItems: 'center', paddingVertical: 10 },
  frame: {
    width: 230,
    height: 142,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 18,
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  photo: {
    width: 54,
    height: 66,
    borderRadius: 8,
    backgroundColor: colors.mint,
  },
  lines: { flex: 1, gap: 9 },
  line: { height: 8, borderRadius: 4, backgroundColor: colors.br },
  lineA: { width: '85%' },
  lineB: { width: '60%' },
  lineC: { width: '72%' },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: colors.green,
  },
  cTL: { top: -6, left: -6, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 8 },
  cTR: { top: -6, right: -6, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 8 },
  cBL: { bottom: -6, left: -6, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 8 },
  cBR: { bottom: -6, right: -6, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 8 },
});
