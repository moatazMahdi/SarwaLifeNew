import { I18nManager, StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/theme';
import { SLOT } from '../../constants';

export const styles = StyleSheet.create({
  slot: {
    height: SLOT.height,
    borderRadius: SLOT.radius,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pressed: { opacity: 0.75 },
  empty: { alignItems: 'center' },
  label: { ...typography.optTitle, color: colors.ink, marginTop: 11.5, textAlign: 'center' },
  hint: { ...typography.bodyText, fontSize: 12, color: colors.g4, marginTop: 14, textAlign: 'center' },
  shot: { width: '62%', height: '72%', borderRadius: 10 },
  tick: {
    position: 'absolute',
    top: 12,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tickStart: { left: 12 },
  tickEnd: { right: 12 },
});

export const tickSide = () => (I18nManager.isRTL ? styles.tickStart : styles.tickEnd);
