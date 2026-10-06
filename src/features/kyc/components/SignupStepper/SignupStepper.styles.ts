import { StyleSheet } from 'react-native';
import { colors } from '../../../../shared/theme';
import { STEP_BEAD, STEP_LINE } from '../../constants';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 17,
    padding: 16,
  },
  track: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  lines: {
    position: 'absolute',
    top: STEP_BEAD / 2 - STEP_LINE / 2,
    left: STEP_BEAD / 2,
    right: STEP_BEAD / 2,
  },
  line: {
    flex: 1,
    height: STEP_LINE,
    borderRadius: STEP_LINE / 2,
    backgroundColor: colors.br,
  },
  lineDone: { backgroundColor: colors.green },
});
