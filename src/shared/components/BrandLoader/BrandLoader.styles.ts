import { StyleSheet } from 'react-native';
import { colors, gradients, typography } from '../../theme';

export const FILL = {
  colors: [...gradients.heroBrand.colors],
  useAngle: true,
  angle: gradients.heroBrand.angle,
};

export const styles = StyleSheet.create({
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  root: { backgroundColor: colors.green, zIndex: 20 },
  glowA: { position: 'absolute', left: -110, top: -60 },
  glowB: { position: 'absolute', right: -90, bottom: -40 },
  watermark: {
    position: 'absolute',
    right: -34,
    top: 54,
    width: 190,
    height: 190,
    opacity: 0.09,
  },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 34 },
  ringWrap: { width: 86, height: 86, alignItems: 'center', justifyContent: 'center' },
  ringTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 43,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.16)',
  },
  ring: {
    position: 'absolute',
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 3,
    borderColor: 'transparent',
    borderTopColor: colors.goldL,
    borderRightColor: colors.goldL,
  },
  headline: {
    ...typography.greeting,
    color: colors.white,
    textAlign: 'center',
    marginTop: 30,
  },
  subtitle: {
    ...typography.introText,
    color: 'rgba(255,255,255,0.72)',
    textAlign: 'center',
    marginTop: 8,
  },
  list: { marginTop: 34, alignSelf: 'stretch', gap: 14 },
});
