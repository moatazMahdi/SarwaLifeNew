import { StyleSheet } from 'react-native';
import { colors } from '../../../../shared/theme';

export const FADE = { colors: ['rgba(245,247,250,0)', colors.bg] };

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  body: { paddingHorizontal: 20, paddingVertical: 12, gap: 20, paddingBottom: 28 },
  footer: { backgroundColor: colors.bg },
  fade: { position: 'absolute', start: 0, end: 0, top: -20, height: 20 },
  footerInner: { paddingHorizontal: 22, paddingTop: 8, paddingBottom: 12, gap: 14 },
});
