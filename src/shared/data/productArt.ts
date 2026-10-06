import type { ImageSourcePropType } from 'react-native';
import type { ProductKey } from '../theme';

export const PRODUCT_ART: Record<ProductKey, ImageSourcePropType> = {
  death: require('../../assets/products/death.png'),
  sav: require('../../assets/products/sav.png'),
  crit: require('../../assets/products/crit.png'),
  fcan: require('../../assets/products/fcan.png'),
  mcan: require('../../assets/products/mcan.png'),
};
