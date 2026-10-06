import { StyleSheet } from 'react-native';
import { colors, gradients, typography } from '../../../../shared/theme';

export const FILL = {
  colors: [...gradients.brandSoft.colors],
  useAngle: true,
  angle: 144.49,
};

export const styles = StyleSheet.create({
  premium: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,105,87,0.1)',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tile: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(0,105,87,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { ...typography.rowLabel, color: colors.g5, textAlign: 'auto', flex: 1 },
  amountRow: {
    minWidth: 101,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 6,
  },
  value: { ...typography.authAmount, color: colors.green },
  unit: { fontSize: 12, lineHeight: 22.5 },
  cycle: { ...typography.chipLabel, color: colors.g5 },
});
