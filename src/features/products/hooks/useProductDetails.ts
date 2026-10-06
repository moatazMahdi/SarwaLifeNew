import { useCallback } from 'react';
import { Share } from 'react-native';
import { productColors } from '../../../shared/theme';
import { getProduct } from '../../../shared/data/products';
import { openSupportChat } from '../../../shared/utils/support';
import { useFlow } from '../../../shared/state/FlowContext';
import { useI18n } from '../../../shared/i18n';

export function useProductDetails({ navigation, route }: any) {
  const { t } = useI18n();
  const { setProduct } = useFlow();
  const product = getProduct(route?.params?.product);
  const palette = productColors[product.key];

  const onBack = useCallback(() => navigation?.goBack(), [navigation]);

  const onCalc = useCallback(() => {
    setProduct(product.key);
    navigation?.navigate('Quote', { product: product.key });
  }, [navigation, product.key, setProduct]);

  const onShare = useCallback(() => {
    Share.share({ message: `${t(product.title)}\n${t(product.short)}` }).catch(() => {});
  }, [product, t]);

  return { product, palette, onBack, onCalc, onShare, onWhatsApp: openSupportChat };
}
