import { Animated, StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const sheetMotion = (bottom: number, translateY: Animated.AnimatedInterpolation<number>) => ({
  paddingBottom: Math.max(bottom, 16),
  transform: [{ translateY }],
});

export const styles = StyleSheet.create({
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10,20,18,0.42)',
  },
  anchor: { flex: 1, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 20,
    paddingTop: 10,
    maxHeight: '88%',
  },
  grabber: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.br,
  },
  title: { ...typography.authTitle, fontSize: 20, color: colors.ink, textAlign: 'auto', marginTop: 16 },
  subtitle: {
    ...typography.helperText,
    fontSize: 13,
    lineHeight: 19,
    color: colors.g5,
    textAlign: 'auto',
    marginTop: 4,
  },
  list: { flexGrow: 0, marginTop: 14 },
  listContent: { paddingBottom: 8, gap: 14 },
  actions: { paddingTop: 14, gap: 8 },
});
