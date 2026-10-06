import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

const badge = {
  width: 20,
  height: 20,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 1,
} as const;

export const styles = StyleSheet.create({
  row: { alignItems: 'flex-start', gap: 10, marginTop: 10 },
  rowFirst: { marginTop: 4 },
  ok: { ...badge, backgroundColor: colors.okBg },
  no: { ...badge, backgroundColor: colors.badBg },
  glyph: { fontSize: 11, lineHeight: 15, color: colors.g7 },
  text: {
    ...typography.cardBody,
    fontSize: 12.5,
    lineHeight: 20,
    color: colors.g7,
    flex: 1,
    textAlign: 'auto',
  },
});
