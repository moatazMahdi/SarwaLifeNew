import { useFlow } from '../../../shared/state/FlowContext';

export function useSignupDone({ navigation }: any) {
  const { productKey, result } = useFlow();
  const resuming = Boolean(productKey && result);

  function onStart() {
    if (productKey && result) {
      navigation?.reset({
        index: 1,
        routes: [{ name: 'Home' }, { name: 'CheckoutPersonal', params: { product: productKey } }],
      });
      return;
    }
    if (productKey) {
      navigation?.reset({
        index: 1,
        routes: [{ name: 'Home' }, { name: 'ProductDetails', params: { product: productKey } }],
      });
      return;
    }
    navigation?.reset({ index: 0, routes: [{ name: 'Home' }] });
  }

  return { resuming, onStart };
}
