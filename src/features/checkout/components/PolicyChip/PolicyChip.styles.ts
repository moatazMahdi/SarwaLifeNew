import { StyleSheet } from 'react-native';
import { colors, gradients, typography } from '../../../../shared/theme';

export const FILL = {
  colors: [...gradients.brandSoft.colors],
  useAngle: true,
  angle: 139,
};

export const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,105,87,0.1)',
  },
  chipCompact: { backgroundColor: colors.white },
  text: { flex: 1, gap: 10 },
  kicker: { ...typography.chipLabel, color: colors.g5, textAlign: 'auto' },
  title: {
    ...typography.optTitle,
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: -0.3,
    color: '#000000',
    textAlign: 'auto',
  },
  figures: { alignItems: 'center', gap: 10 },
  figure: { alignItems: 'baseline', gap: 3 },
  figLabel: { ...typography.cardBody, fontSize: 11.5, color: colors.g5 },
  figValue: { ...typography.optTitle, fontSize: 16, lineHeight: 22.5, color: colors.green },
  figValueSm: { ...typography.optTitle, fontSize: 14, lineHeight: 22.5, color: colors.green },
  rule: { width: 16, height: 3, backgroundColor: colors.green },
  tile: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileCompact: { backgroundColor: 'rgba(0,105,87,0.1)' },
  art: { width: 34, height: 34 },
});
