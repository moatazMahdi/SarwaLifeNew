import { StyleSheet } from 'react-native';
import { colors, gradients, radius, spacing, typography } from '../../theme';

export type ButtonVariant =
  | 'primary'
  | 'hero'
  | 'gradient'
  | 'brand'
  | 'secondary'
  | 'counter'
  | 'link'
  | 'plain'
  | 'gold'
  | 'goldGlow'
  | 'translucent'
  | 'glassRound'
  | 'shutter'
  | 'ghost'
  | 'chip'
  | 'outline'
  | 'light'
  | 'pill'
  | 'fab'
  | 'badge'
  | 'glass'
  | 'icon'
  | 'round'
  | 'tool';

export const BRAND_FILL = {
  colors: [...gradients.brand.colors],
  locations: [...gradients.brand.locations],
  start: { x: 0.1, y: 0 },
  end: { x: 0.9, y: 1 },
};

export const HERO_FILL = {
  colors: [...gradients.heroBrand.colors],
  useAngle: true,
  angle: gradients.heroBrand.angle,
  angleCenter: { x: 0.5, y: 0.5 },
};

export const GRADIENT_FILL = {
  colors: [...gradients.brand.colors],
  locations: [...gradients.brand.locations],
  useAngle: true,
  angle: 145,
};

export const GLOSS = {
  colors: ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0)'],
  locations: [0, 0.55],
};

export const styles = StyleSheet.create({
  fill: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },

  primary: {
    height: spacing.buttonHeight,
    borderRadius: radius.button,
    overflow: 'hidden',
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  primaryDisabled: {
    opacity: 0.42,
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryFill: {
    flex: 1,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryGloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: spacing.buttonHeight,
    borderRadius: radius.button,
  },
  primaryContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  whiteLabel: {
    ...typography.buttonLabel,
    color: colors.white,
  },

  hero: {
    height: 56,
    borderRadius: 17,
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.42,
    shadowRadius: 13,
    elevation: 6,
  },
  heroFill: {
    flex: 1,
    borderRadius: 17,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  heroContent: {
    alignItems: 'center',
    gap: 10,
  },
  heroIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  gradient: {
    height: 52,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 13,
    elevation: 6,
  },
  gradientFill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },
  brand: {
    height: 52,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 18,
    elevation: 6,
  },
  brandFill: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  brandLabel: { ...typography.btnLabelMd, color: colors.white },

  secondary: {
    height: 52,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.green,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  secondaryLabel: { ...typography.btnLabelMd, color: colors.green },

  counter: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: colors.goldBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterDisabled: { opacity: 0.4 },
  counterLabel: { ...typography.countGlyph, color: colors.goldTx },

  gradientLabel: { ...typography.cardTitle, fontSize: 14, lineHeight: 21, color: colors.white },

  outline: {
    height: 52,
    borderRadius: 15,
    marginTop: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  outlineLabel: {
    ...typography.btnLabelSm,
    color: colors.green,
  },

  light: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    width: 286,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 6,
  },
  lightLabel: {
    ...typography.buttonLabel,
    color: colors.green,
  },

  pill: {
    height: 34,
    paddingHorizontal: 18,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgba(26,29,38,0.28)',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillLabel: { ...typography.obSkip, color: '#000000', textAlign: 'center' },

  fab: {
    position: 'absolute',
    end: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    height: 52,
    paddingHorizontal: 18,
    borderRadius: 26,
    backgroundColor: colors.white,
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 8,
  },
  fabPressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
  fabLabel: { ...typography.btnLabelSm, color: colors.ink, textAlign: 'auto' },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 28,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EAD9B0',
    backgroundColor: 'rgba(201,162,75,0.14)',
  },
  badgeLabel: { ...typography.badgeLabel, color: '#9B7F3E', textAlign: 'center' },

  glass: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassPressed: { backgroundColor: 'rgba(255,255,255,0.28)' },

  icon: {
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.br2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  round: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.qBtnBr,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tool: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  plain: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.br,
    backgroundColor: colors.white,
  },
  plainLabel: { ...typography.btnLabelMd, color: colors.g7 },

  gold: {
    height: 52,
    paddingHorizontal: 44,
    borderRadius: 17,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goldGlow: {
    width: 227,
    height: 48,
    borderRadius: 17,
    backgroundColor: colors.gold,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 13,
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  translucent: {
    height: 52,
    paddingHorizontal: 22,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassRound: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutter: {
    width: 77,
    height: 77,
    borderRadius: 39,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ghost: { height: 46, alignItems: 'center', justifyContent: 'center' },
  ghostLabel: { ...typography.btnLabelMd, color: colors.g5 },

  chip: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    height: 40,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  chipLabel: { ...typography.optSubtitle, fontSize: 14, lineHeight: 24, color: colors.goldTx },

  link: {},
  linkLabel: {
    ...typography.authLink,
    color: '#054A3D',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  pressedLink: { opacity: 0.6 },

  pressedSoft: { opacity: 0.9 },
  pressedStrong: { opacity: 0.7 },
  pressedMid: { opacity: 0.88 },
  pressedDim: { opacity: 0.75 },
});

type Spec = {
  box: object;
  pressed?: object;
  disabled?: object;
  label?: object;
  hitSlop?: number;
};

const iconSize = (size: number) => ({ width: size, height: size, borderRadius: radius.ibtn });

export const variantSpec = (variant: ButtonVariant, size: number): Spec => {
  switch (variant) {
    case 'hero':
      return { box: styles.hero, pressed: styles.pressedSoft, label: styles.whiteLabel };
    case 'gradient':
      return { box: styles.gradient, pressed: styles.pressedStrong, label: styles.gradientLabel };
    case 'brand':
      return { box: styles.brand, pressed: styles.pressedMid, label: styles.brandLabel };
    case 'secondary':
      return { box: styles.secondary, pressed: styles.pressedMid, label: styles.secondaryLabel };
    case 'counter':
      return {
        box: styles.counter,
        pressed: styles.pressedDim,
        disabled: styles.counterDisabled,
        label: styles.counterLabel,
        hitSlop: 6,
      };
    case 'plain':
      return { box: styles.plain, pressed: styles.pressedStrong, label: styles.plainLabel };
    case 'gold':
      return { box: styles.gold, pressed: styles.pressedStrong, label: styles.brandLabel };
    case 'goldGlow':
      return { box: styles.goldGlow, pressed: styles.pressedMid, label: styles.brandLabel };
    case 'translucent':
      return { box: styles.translucent, pressed: styles.pressedStrong, label: styles.brandLabel };
    case 'glassRound':
      return { box: styles.glassRound, pressed: styles.pressedStrong, hitSlop: 8 };
    case 'shutter':
      return { box: styles.shutter, pressed: styles.pressedStrong };
    case 'ghost':
      return { box: styles.ghost, pressed: styles.pressedStrong, label: styles.ghostLabel };
    case 'chip':
      return { box: styles.chip, pressed: styles.pressedStrong, label: styles.chipLabel };
    case 'link':
      return { box: styles.link, pressed: styles.pressedLink, label: styles.linkLabel };
    case 'outline':
      return { box: styles.outline, pressed: styles.pressedSoft, label: styles.outlineLabel };
    case 'light':
      return { box: styles.light, label: styles.lightLabel };
    case 'pill':
      return { box: styles.pill, label: styles.pillLabel };
    case 'fab':
      return { box: styles.fab, pressed: styles.fabPressed, label: styles.fabLabel };
    case 'badge':
      return { box: styles.badge, pressed: styles.pressedStrong, label: styles.badgeLabel, hitSlop: 8 };
    case 'glass':
      return { box: styles.glass, pressed: styles.glassPressed, hitSlop: 6 };
    case 'icon':
      return { box: [styles.icon, iconSize(size)], pressed: styles.pressedStrong, hitSlop: 6 };
    case 'round':
      return { box: styles.round, pressed: styles.pressedStrong, hitSlop: 8 };
    case 'tool':
      return { box: styles.tool, pressed: styles.pressedStrong, hitSlop: 8 };
    default:
      return { box: styles.primary, label: styles.whiteLabel };
  }
};
