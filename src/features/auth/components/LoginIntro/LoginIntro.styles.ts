import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const styles = StyleSheet.create({
  intro: { paddingHorizontal: 20, paddingVertical: 12, gap: 24, alignItems: 'flex-start' },
  logoClip: { width: 73, height: 86, overflow: 'hidden' },
  logo: { position: 'absolute', left: 0, top: 0, width: 86, height: 86 },
  titleBlock: { gap: 8, alignSelf: 'stretch' },
  title: { ...typography.authTitle, color: colors.ink, textAlign: 'auto' },
  subtitle: { ...typography.introText, color: colors.g5, textAlign: 'auto' },
});
