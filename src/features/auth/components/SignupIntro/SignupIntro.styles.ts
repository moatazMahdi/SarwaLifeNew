import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  intro: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 12, gap: 8 },
  title: { ...typography.authTitle, color: colors.ink, textAlign: 'auto' },
  subtitle: { ...typography.introText, color: colors.g5, textAlign: 'auto' },
});
