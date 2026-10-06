import { ImageSourcePropType } from 'react-native';

export const LOGO: ImageSourcePropType = require('../../assets/logo.png');

export const OTP_BOX = {
  width: 50.7,
  height: 68.85,
  ring: 4.44,
};

export const OTP_BLEED = (OTP_BOX.height - 62) / 2;
