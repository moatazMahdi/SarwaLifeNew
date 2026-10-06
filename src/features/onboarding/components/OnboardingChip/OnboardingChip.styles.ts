import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';
import { Chip } from '../../constants';

export const chipPosition = (chip: Chip) => [
  { top: chip.top },
  chip.left !== undefined ? { left: chip.left } : null,
  chip.right !== undefined ? { right: chip.right } : null,
];

export const styles = StyleSheet.create({
  chip: {
    position: 'absolute',
    alignItems: 'center',
    gap: 7,
    height: 33.25,
    paddingHorizontal: 14,
    borderRadius: 16.625,
    backgroundColor: colors.white,
    shadowColor: 'rgba(26,29,38,1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 5,
  },
  dot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: colors.green },
  text: { ...typography.badgeLabel, color: colors.ink, textAlign: 'auto' },
});
