import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  intro: { paddingHorizontal: 20, paddingVertical: 12, gap: 24 },
  titleBlock: { gap: 8 },
  title: { ...typography.authTitle, color: colors.ink, textAlign: 'auto' },
  subtitle: { ...typography.introText, color: colors.g5, textAlign: 'auto' },
});
