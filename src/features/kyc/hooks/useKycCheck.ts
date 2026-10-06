import { DEMO_PROFILE, useFlow } from '../../../shared/state/FlowContext';
import { shouldFailKyc } from '../services/demoOutcome';

export function useKycProcessing({ navigation, route }: any) {
  const params = route?.params ?? {};
  const { setProfile, recordKycAttempt } = useFlow();

  return () => {
    if (shouldFailKyc(params.phone, recordKycAttempt('id'))) {
      navigation?.replace('KycFailed', { ...params, stage: 'id' });
      return;
    }
    setProfile({ ...DEMO_PROFILE, phone: params.phone ?? '' });
    navigation?.replace('KycReview', params);
  };
}

export function useKycVerifying({ navigation, route }: any) {
  const params = route?.params ?? {};
  const { login, recordKycAttempt } = useFlow();

  return () => {
    if (shouldFailKyc(params.phone, recordKycAttempt('liveness'))) {
      navigation?.replace('KycFailed', { ...params, stage: 'liveness' });
      return;
    }
    login(params.phone ?? '');
    navigation?.replace('SignupDone', params);
  };
}
