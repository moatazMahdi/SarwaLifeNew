import { ImageSourcePropType } from 'react-native';
import { PRODUCT_ART } from '../../shared/data/productArt';
import { Phrase, S } from '../../shared/i18n';
import { ProductKey } from '../../shared/theme';

export type HomeProduct = {
  key: ProductKey;
  art: ImageSourcePropType;
  title: Phrase;
  desc: Phrase;
};

export const LOGO: ImageSourcePropType = require('../../assets/logo.png');

export const HOME_PRODUCTS: HomeProduct[] = [
  { key: 'death', art: PRODUCT_ART.death, ...S.products.death },
  { key: 'sav', art: PRODUCT_ART.sav, ...S.products.sav },
  { key: 'crit', art: PRODUCT_ART.crit, ...S.products.crit },
  { key: 'fcan', art: PRODUCT_ART.fcan, ...S.products.fcan },
  { key: 'mcan', art: PRODUCT_ART.mcan, ...S.products.mcan },
];
