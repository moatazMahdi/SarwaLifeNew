import { Animated, StyleSheet } from 'react-native';
import { colors, gradients, shadows, typography } from '../../../../shared/theme';

export const SURFACE = {
  colors: [...gradients.surface.colors],
  useAngle: true,
  angle: 180,
};

export const heightStyle = (height: Animated.AnimatedInterpolation<number>) => ({ height });

export const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.br2,
    overflow: 'hidden',
    ...shadows.card,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 62,
    paddingStart: 18,
    paddingEnd: 16,
    paddingVertical: 14,
  },
  question: {
    ...typography.cardTitle,
    fontSize: 14.5,
    lineHeight: 21.75,
    color: colors.ink,
    textAlign: 'auto',
    flex: 1,
  },
  chevron: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F3F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerClip: { overflow: 'hidden' },
  answerPad: { paddingStart: 18, paddingEnd: 16, paddingBottom: 16 },
  answer: {
    ...typography.cardBody,
    fontSize: 13,
    lineHeight: 21,
    color: colors.g5,
    textAlign: 'auto',
  },
  measure: { position: 'absolute', start: 0, end: 0, opacity: 0 },
  pressed: { opacity: 0.7 },
});
