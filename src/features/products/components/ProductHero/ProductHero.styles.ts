import { StyleSheet } from 'react-native';
import { colors, gradients } from '../../../../shared/theme';
import { FIGMA_TOP_INSET, HERO_BELOW_INSET } from '../../constants';

export const FILL = {
  colors: [...gradients.heroBrand.colors],
  useAngle: true,
  angle: gradients.heroBrand.angle,
  angleCenter: { x: 0.5, y: 0.5 },
};

const shift = (top: number) => top - FIGMA_TOP_INSET;

export const dynamic = {
  hero: (top: number) => ({ height: top + HERO_BELOW_INSET }),
  glowA: (top: number) => ({ top: -160 + shift(top) }),
  glowB: (top: number) => ({ top: 146 + shift(top) }),
  watermark: (top: number) => ({ top: -24 + shift(top) }),
  topRow: (top: number) => ({ marginTop: top + 5 }),
};

export const styles = StyleSheet.create({
  hero: { overflow: 'hidden' },
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  glowA: { position: 'absolute', left: -90 },
  glowB: { position: 'absolute', left: 240 },
  watermark: {
    position: 'absolute',
    left: 294,
    width: 130,
    height: 130,
    opacity: 0.07,
  },
  topRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    height: 42,
  },
  titleRow: {
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 22,
    marginTop: 20,
    minHeight: 58,
  },
  artTile: {
    width: 58,
    height: 58,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  art: { width: 42, height: 41 },
  title: {
    color: colors.white,
    textAlign: 'auto',
    flex: 1,
  },
});
