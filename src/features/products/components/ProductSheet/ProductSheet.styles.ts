import { StyleSheet } from 'react-native';
import { colors } from '../../../../shared/theme';
import { BODY_OVERLAP } from '../../constants';

export const styles = StyleSheet.create({
  sheet: {
    flex: 1,
    marginTop: -BODY_OVERLAP,
    backgroundColor: colors.bg,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: -16 },
    shadowOpacity: 0.18,
    shadowRadius: 17,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 23.75,
    paddingBottom: 28,
  },
});
