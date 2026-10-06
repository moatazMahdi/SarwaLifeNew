import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  attest: {
    ...typography.obSubtitle,
    fontSize: 11,
    lineHeight: 17.6,
    color: colors.g4,
    textAlign: 'auto',
  },
});
