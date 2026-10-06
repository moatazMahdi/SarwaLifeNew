import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const scrimHeight = (height: number) => ({ height: height * (230 / 812) });

export const styles = StyleSheet.create({
  fill: { flex: 1 },
  bottomScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  head: {
    paddingHorizontal: 16,
    paddingTop: 18,
    alignItems: 'center',
    gap: 12,
  },
  title: {
    ...typography.pageTitle,
    fontSize: 18,
    lineHeight: 32,
    letterSpacing: -0.54,
    color: colors.white,
    textAlign: 'auto',
  },
  footer: { marginTop: 'auto', alignItems: 'center', paddingBottom: 24, gap: 36 },
  caption: {
    ...typography.authTitle,
    fontSize: 18,
    lineHeight: 26,
    color: colors.white,
    textAlign: 'center',
    paddingHorizontal: 26,
  },
});
