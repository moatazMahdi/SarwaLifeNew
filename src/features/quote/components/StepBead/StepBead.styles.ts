import { StyleSheet } from 'react-native';
import { colors, gradients, typography } from '../../../../shared/theme';

export const BEAD_FILL = {
  colors: [...gradients.brand.colors],
  locations: [...gradients.brand.locations],
  useAngle: true,
  angle: 145,
};

export const styles = StyleSheet.create({
  connector: {
    flex: 1,
    height: 2,
    borderRadius: 1.25,
    backgroundColor: colors.br,
    marginHorizontal: 4,
  },
  connectorOn: { backgroundColor: colors.green },
  beadCol: { width: 30, alignItems: 'center' },
  bead: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  beadIdle: {
    borderWidth: 1,
    borderColor: colors.br,
    backgroundColor: colors.white,
  },
  halo: {
    position: 'absolute',
    top: -4,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,105,87,0.13)',
  },
  beadNum: { ...typography.stepNum, color: colors.g4 },
  beadNumOn: { color: colors.white },
  label: {
    position: 'absolute',
    top: 34,
    left: -31,
    right: -31,
    ...typography.stepCaption,
    color: colors.g4,
    textAlign: 'center',
  },
  labelOn: { color: colors.green },
});
