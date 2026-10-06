import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  row: { alignItems: 'center', justifyContent: 'center' },
  muted: { ...typography.authResendMuted, color: colors.g5 },
  resend: { ...typography.authResend, color: colors.gold },
  link: { textDecorationLine: 'underline' },
});
