import { Animated, StyleSheet } from 'react-native';
import { colors, gradients, typography } from '../../../../shared/theme';

type Anim = Animated.AnimatedInterpolation<number>;

export const PRIMARY_FILL = {
  colors: ['#0C7A65', '#00705C', '#054A3D'],
  locations: [0, 0.42, 1],
  useAngle: true,
  angle: 149.04,
};

export const TILE_FILL = {
  colors: [...gradients.brandSoft.colors],
  useAngle: true,
  angle: 140,
};

export const chevronColor = (primary?: boolean) => (primary ? 'rgba(255,255,255,0.8)' : '#595959');

export const rowMotion = (enter: Animated.Value, scale: Anim, lift: Anim) => ({
  opacity: enter,
  transform: [{ scale }, { translateY: lift }],
});

export const styles = StyleSheet.create({
  row: {
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  plain: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  shadow: {
    borderRadius: 16,
    shadowColor: 'rgba(0,105,87,1)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 6,
  },
  mid: { flex: 1, alignItems: 'center', gap: 4 },
  label: { ...typography.authOption, color: colors.ink, textAlign: 'auto', flex: 1 },
  labelOn: { color: colors.white },
  tile: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileOn: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  tileOff: {
    borderWidth: 1,
    borderColor: 'rgba(0,105,87,0.1)',
    shadowColor: 'rgba(16,24,40,1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
});
