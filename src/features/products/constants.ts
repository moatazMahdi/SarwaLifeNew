import { ImageSourcePropType } from 'react-native';
import { ProductKey } from '../../shared/theme';

export const FIGMA_TOP_INSET = 47;
export const HERO_BELOW_INSET = 246 - FIGMA_TOP_INSET;
export const BODY_OVERLAP = 52;

export const HERO_ART: Record<ProductKey, ImageSourcePropType> = {
  death: require('../../assets/products/hero-death.png'),
  sav: require('../../assets/products/hero-sav.png'),
  crit: require('../../assets/products/hero-crit.png'),
  fcan: require('../../assets/products/hero-fcan.png'),
  mcan: require('../../assets/products/hero-mcan.png'),
};

export const HERO_WATERMARK: ImageSourcePropType = require('../../assets/hero-watermark.png');
