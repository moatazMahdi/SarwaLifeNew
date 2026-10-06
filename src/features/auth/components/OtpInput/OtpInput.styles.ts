import { Animated, I18nManager, StyleSheet } from 'react-native';
import { colors } from '../../../../shared/theme';
import { OTP_BLEED, OTP_BOX } from '../../constants';

export const shakeStyle = (translateX: Animated.AnimatedInterpolation<number>) => ({
  transform: [{ translateX }],
});

export const styles = StyleSheet.create({
  row: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    marginVertical: -OTP_BLEED,
  },
  busy: { opacity: 0.6 },
  cell: {
    width: OTP_BOX.width,
    height: OTP_BOX.height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    top: -OTP_BOX.ring,
    bottom: -OTP_BOX.ring,
    left: -OTP_BOX.ring,
    right: -OTP_BOX.ring,
    borderRadius: 15.55 + OTP_BOX.ring,
    backgroundColor: 'rgba(0,105,87,0.1)',
  },
  box: {
    width: OTP_BOX.width,
    height: OTP_BOX.height,
    borderRadius: 15.55,
    borderWidth: 1.11,
    borderColor: '#CDCDCD',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxOn: { borderWidth: 2.22, borderColor: colors.green },
  boxBad: { borderWidth: 2.22, borderColor: colors.bad, backgroundColor: colors.badBg },
  caret: { width: 2.22, height: 28.87, borderRadius: 1.11, backgroundColor: colors.green },
  hidden: { position: 'absolute', width: 1, height: 1, opacity: 0 },
});
