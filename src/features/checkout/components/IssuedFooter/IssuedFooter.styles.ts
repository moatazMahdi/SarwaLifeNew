import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  share: { gap: 12 },
  home: {
    ...typography.authResend,
    color: colors.green,
    textAlign: 'center',
    paddingVertical: 6,
  },
});
