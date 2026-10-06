import { StyleSheet } from 'react-native';
import { colors, shadows } from '../../theme';

const RING = 120;
const DISC = 84;

export const styles = StyleSheet.create({
  ring: {
    width: RING,
    height: RING,
    borderRadius: RING / 2,
    backgroundColor: colors.badBg,
    borderWidth: 1,
    borderColor: colors.badBr,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.chip,
  },
  disc: {
    width: DISC,
    height: DISC,
    borderRadius: DISC / 2,
    backgroundColor: colors.bad,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(239,68,68,1)',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 10,
  },
});
