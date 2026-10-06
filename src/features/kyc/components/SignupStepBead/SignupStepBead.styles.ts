import { StyleSheet } from 'react-native';
import { colors, gradients, typography } from '../../../../shared/theme';
import { STEP_BEAD } from '../../constants';

export const BEAD_FILL = {
  colors: [...gradients.brand.colors],
  locations: [...gradients.brand.locations],
  useAngle: true,
  angle: 145,
};

export const styles = StyleSheet.create({
  col: { alignItems: 'center', width: 52 },
  bead: {
    width: STEP_BEAD,
    height: STEP_BEAD,
    borderRadius: STEP_BEAD / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  beadRing: {
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.26,
    shadowRadius: 4,
    elevation: 3,
  },
  beadOff: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.br,
  },
  numOn: { ...typography.stepNum, color: colors.white },
  numOff: { ...typography.stepNum, color: colors.g4 },
  label: { ...typography.stepCaption, color: colors.g4, marginTop: 5, textAlign: 'center' },
  labelOn: { color: colors.green },
});
