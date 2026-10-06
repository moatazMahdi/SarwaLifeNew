import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.mint,
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  col: { flex: 1, gap: 8 },
  titleRow: { alignItems: 'center', gap: 8 },
  tile: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.authOption,
    fontSize: 20,
    lineHeight: 28,
    color: colors.green,
    textAlign: 'auto',
    flex: 1,
  },
  desc: { ...typography.optLabel, color: colors.ink, textAlign: 'auto' },
});
