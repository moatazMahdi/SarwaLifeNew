import { StyleSheet } from 'react-native';
import { colors, gradients, typography } from '../../../../shared/theme';

const DISC = 30;

export const DISC_FILL = {
  colors: [...gradients.brand.colors],
  locations: [...gradients.brand.locations],
  useAngle: true,
  angle: 145,
};

export const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 2,
    borderRadius: 1.25,
    backgroundColor: colors.br,
    marginTop: DISC / 2 - 1,
    marginHorizontal: 6,
  },
  step: { alignItems: 'center', gap: 4, minWidth: 34 },
  disc: {
    width: DISC,
    height: DISC,
    borderRadius: DISC / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  discRing: {
    borderWidth: 0,
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.13,
    shadowRadius: 4,
    elevation: 3,
  },
  discOff: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.br,
  },
  num: { ...typography.stepNum, color: colors.g4 },
  numOn: { ...typography.stepNum, color: colors.white },
  label: { ...typography.stepCaption, color: colors.g4, textAlign: 'center' },
  labelOn: { color: colors.green },
});
