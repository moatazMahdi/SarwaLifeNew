import type { ImageSourcePropType } from 'react-native';
import type { ProductKey } from '../theme';

/**
 * The product marks as the design actually draws them.
 *
 * Figma renders each product's badge as raster artwork — a shield with figures inside it,
 * in the product's own palette — not as a line glyph. The vectors in `iconXml` under the
 * same five keys are a different, much plainer set, drawn for 24px inline use (the product
 * rows on the quote screen). Anywhere the design shows the *badge*, this is the right asset.
 *
 * Kept out of `data/products` so the catalogue stays plain data with no `require` graph of
 * its own, and so the home screen and the issuance chip cannot drift onto different art.
 */
export const PRODUCT_ART: Record<ProductKey, ImageSourcePropType> = {
  death: require('../assets/products/death.png'),
  sav: require('../assets/products/sav.png'),
  crit: require('../assets/products/crit.png'),
  fcan: require('../assets/products/fcan.png'),
  mcan: require('../assets/products/mcan.png'),
};
