import { useCheckoutProduct } from './useCheckoutProduct';

export function useCheckoutBeneficiaries({ navigation, route }: any) {
  const { product } = useCheckoutProduct(route);
  return {
    product,
    onBack: () => navigation?.goBack(),
    onNext: () => navigation?.navigate('CheckoutMedical', { product: product.key }),
  };
}
