import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.goldBg,
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 16,
  },
  top: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  topInner: { flex: 1, alignItems: 'center', gap: 4 },
  label: {
    ...typography.optLabel,
    color: colors.ink,
    textAlign: 'auto',
    flex: 1,
  },
  dim: { opacity: 0.75 },
});
