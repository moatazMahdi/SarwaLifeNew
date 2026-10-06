import { useCallback, useMemo } from 'react';
import { maskPhone } from '../../../shared/utils/phone';
import { useOtpEntry } from './useOtpEntry';

export function useSignupOtp({ navigation, route }: any) {
  const params = useMemo(() => route?.params ?? {}, [route?.params]);
  const nsn: string = params.phone ?? '';

  const onVerified = useCallback(() => {
    navigation?.navigate('KycCapture', params);
  }, [navigation, params]);

  return {
    otp: useOtpEntry(onVerified),
    masked: maskPhone(nsn),
    onBack: useCallback(() => navigation?.goBack(), [navigation]),
  };
}
