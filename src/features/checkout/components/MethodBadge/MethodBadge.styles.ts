import { StyleSheet } from 'react-native';
import { colors, gradients, shadows } from '../../../../shared/theme';
import { METHOD_BADGE } from '../../constants';

export const SOFT_FILL = {
  colors: [...gradients.brandSoft.colors],
  useAngle: true,
  angle: 140,
};

export const styles = StyleSheet.create({
  soft: {
    width: METHOD_BADGE,
    height: METHOD_BADGE,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: 'rgba(0,105,87,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.chip,
  },
  brand: {
    width: METHOD_BADGE,
    height: METHOD_BADGE,
    borderRadius: 11,
    overflow: 'hidden',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.chip,
  },
  brandInset: { borderWidth: 1, borderColor: 'rgba(0,105,87,0.1)' },
});
