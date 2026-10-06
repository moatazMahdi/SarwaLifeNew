import { getProduct } from '../../../shared/data/products';
import { useFlow } from '../../../shared/state/FlowContext';

export function useCheckoutProduct(route: any) {
  const flow = useFlow();
  return { flow, product: getProduct(route?.params?.product ?? flow.productKey ?? undefined) };
}
