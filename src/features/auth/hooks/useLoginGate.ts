import { useCallback } from 'react';
import { useFlow } from '../../../shared/state/FlowContext';

export function useLoginGate({ navigation, route }: any) {
  const flow = useFlow();
  const product = route?.params?.product ?? flow.productKey ?? undefined;

  return {
    yearly: flow.result?.yearly ?? 0,
    onBack: useCallback(() => navigation?.goBack(), [navigation]),
    onExisting: useCallback(() => navigation?.navigate('LoginPhone', { product }), [navigation, product]),
    onNew: useCallback(() => navigation?.navigate('SignupPhone', { product }), [navigation, product]),
  };
}
