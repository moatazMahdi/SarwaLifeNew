import { useBackGuard } from '../../../shared/hooks/useBackGuard';
import { S } from '../../../shared/i18n';
import { METHOD_LABELS, settle } from '../services/gateway';
import { useCheckoutProduct } from './useCheckoutProduct';

export function usePaymentFailed({ navigation, route }: any) {
  const params = route?.params ?? {};
  const { flow, product } = useCheckoutProduct(route);
  const method = params.method ?? flow.paymentMethod;

  useBackGuard();

  function retry() {
    flow.recordPaymentAttempt();
    if (settle(flow.paymentAttempts + 1) === 'failed') {
      navigation?.replace('PaymentFailed', params);
      return;
    }
    flow.issuePolicy();
    navigation?.replace('PolicyIssued', params);
  }

  return {
    product,
    methodLabel: METHOD_LABELS[method] ?? S.checkout.methodNames.fallback,
    amount: params.amount ?? flow.result?.yearly ?? 0,
    retry,
    changeMethod: () => navigation?.navigate('CheckoutPayment', { product: product.key }),
  };
}
