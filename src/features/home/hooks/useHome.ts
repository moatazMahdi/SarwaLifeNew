import { useCallback } from 'react';
import { ProductKey } from '../../../shared/theme';

export function useHome({ navigation }: any) {
  const openFaq = useCallback(() => navigation?.navigate('Faq'), [navigation]);
  const openProduct = useCallback(
    (key: ProductKey) => navigation?.navigate('ProductDetails', { product: key }),
    [navigation],
  );
  return { openFaq, openProduct };
}
