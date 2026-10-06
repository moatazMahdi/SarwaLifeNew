import { useCallback } from 'react';
import { DEMO_PROFILE, useFlow } from '../../../shared/state/FlowContext';
import { maskPhone } from '../../../shared/utils/phone';
import { useOtpEntry } from './useOtpEntry';

export function useLoginOtp({ navigation, route }: any) {
  const nsn: string = route?.params?.phone ?? '';
  const flow = useFlow();

  const onVerified = useCallback(() => {
    const phone = nsn ? `0${nsn}` : '';
    flow.setProfile({ ...DEMO_PROFILE, phone });
    flow.login(phone);
    const product = route?.params?.product ?? flow.productKey ?? undefined;
    if (product && flow.result) {
      navigation?.reset({
        index: 1,
        routes: [{ name: 'Home' }, { name: 'CheckoutPersonal', params: { product } }],
      });
      return;
    }
    navigation?.reset({ index: 0, routes: [{ name: 'Home' }] });
  }, [flow, navigation, nsn, route]);

  return {
    otp: useOtpEntry(onVerified),
    masked: maskPhone(nsn),
    onBack: useCallback(() => navigation?.goBack(), [navigation]),
  };
}
