import { useCallback } from 'react';
import { Keyboard } from 'react-native';
import { usePhoneEntry } from '../../../shared/hooks/usePhoneEntry';

export function usePhoneStep({ navigation, route }: any, next: 'LoginOtp' | 'SignupOtp') {
  const phone = usePhoneEntry();

  const onContinue = () => {
    if (!phone.validate()) return;
    Keyboard.dismiss();
    navigation?.navigate(next, { phone: phone.value, product: route?.params?.product });
  };

  return {
    phone,
    canContinue: phone.value.length > 0,
    onContinue,
    onBack: useCallback(() => navigation?.goBack(), [navigation]),
    openTerms: useCallback(() => navigation?.navigate('Terms'), [navigation]),
    openPrivacy: useCallback(() => navigation?.navigate('Privacy'), [navigation]),
  };
}
