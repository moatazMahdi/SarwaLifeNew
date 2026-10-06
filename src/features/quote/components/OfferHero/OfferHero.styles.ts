import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';

export const FILL = {
  colors: ['#0C7A65', '#00705C', '#054A3D'],
  locations: [0, 0.42, 1],
  useAngle: true,
  angle: 151.42,
};

export const GLOW_WHITE = 'rgb(255,255,255)';
export const GLOW_GOLD = 'rgb(228,205,142)';

export const styles = StyleSheet.create({
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  hero: {
    height: 163,
    borderRadius: 26,
    overflow: 'hidden',
    justifyContent: 'center',
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 22 },
    shadowOpacity: 0.45,
    shadowRadius: 22,
    elevation: 8,
  },
  glowA: { position: 'absolute', left: -90, top: -170.25 },
  glowB: { position: 'absolute', left: 186, top: 130 },
  watermark: {
    position: 'absolute',
    right: -14,
    top: -20.25,
    width: 120,
    height: 120,
    opacity: 0.17,
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  body: { alignItems: 'center', gap: 16 },
  top: { alignItems: 'center', gap: 8 },
  caption: {
    ...typography.premiumCaption,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
  },
  amountRow: { alignItems: 'baseline', gap: 6 },
  unit: { ...typography.premiumUnit, color: colors.white },
  chip: {
    height: 31.25,
    borderRadius: 14,
    backgroundColor: 'rgba(6,90,74,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    alignItems: 'center',
    gap: 8,
  },
  chipText: { ...typography.chipLabel, color: colors.white },
});
