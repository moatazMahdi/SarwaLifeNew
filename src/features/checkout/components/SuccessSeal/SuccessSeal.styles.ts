import { StyleSheet } from 'react-native';
import { gradients, shadows } from '../../../../shared/theme';
import { SEAL } from '../../constants';

export const RING_FILL = {
  colors: [...gradients.brandSoft.colors],
  useAngle: true,
  angle: 140,
};

export const DISC_FILL = {
  colors: [...gradients.brand.colors],
  locations: [...gradients.brand.locations],
  useAngle: true,
  angle: 145,
};

export const styles = StyleSheet.create({
  ring: {
    width: SEAL.ring,
    height: SEAL.ring,
    borderRadius: SEAL.ring / 2,
    borderWidth: 1,
    borderColor: 'rgba(0,105,87,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.chip,
  },
  disc: {
    width: SEAL.disc,
    height: SEAL.disc,
    borderRadius: SEAL.disc / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.6,
    shadowRadius: 14,
    elevation: 10,
  },
});
