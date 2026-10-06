import { useState } from 'react';
import { OPTIONALS } from '../../../shared/data/products';
import { S, useI18n } from '../../../shared/i18n';
import { settle } from '../services/gateway';
import { useCheckoutProduct } from './useCheckoutProduct';

export function useCheckoutPayment({ navigation, route }: any) {
  const { t } = useI18n();
  const { flow, product } = useCheckoutProduct(route);
  const result = flow.result;

  const [method, setMethod] = useState<string | null>(flow.paymentMethod);
  const [agreed, setAgreed] = useState(false);

  const picked = OPTIONALS.filter((o) => (flow.quote.optionals ?? []).includes(o.key));
  const covers = picked.length
    ? picked.map((o) => t(o.label)).join(' + ')
    : t(S.checkout.payment.baseCover);

  function onIssue() {
    if (!method) return;
    flow.setPaymentMethod(method);
    flow.recordPaymentAttempt();

    const params = {
      product: product.key,
      method,
      amount: result?.yearly ?? 0,
      cycle: 'yearly' as const,
    };

    if (settle(flow.paymentAttempts + 1) === 'failed') {
      navigation?.navigate('PaymentFailed', params);
      return;
    }
    flow.issuePolicy();
    navigation?.navigate('PolicyIssued', params);
  }

  return {
    product,
    cover: flow.quote.cover ?? 0,
    yearly: result?.yearly ?? 0,
    covers,
    method,
    setMethod,
    agreed,
    toggleAgreed: () => setAgreed((v) => !v),
    canIssue: !!method && agreed,
    onIssue,
    onBack: () => navigation?.goBack(),
    openTerms: () => navigation?.navigate('Terms'),
    openPrivacy: () => navigation?.navigate('Privacy'),
  };
}
