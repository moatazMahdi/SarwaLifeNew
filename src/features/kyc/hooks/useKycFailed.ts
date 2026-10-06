import { useFlow } from '../../../shared/state/FlowContext';
import { useBackGuard } from '../../../shared/hooks/useBackGuard';
import { FAILED_COPY, KycStage } from '../constants';

export function useKycFailed({ navigation, route }: any) {
  const params = route?.params ?? {};
  const stage: KycStage = params.stage === 'liveness' ? 'liveness' : 'id';
  const copy = FAILED_COPY[stage];
  const { clearCaptures } = useFlow();

  useBackGuard();

  function retry() {
    clearCaptures(stage === 'id' ? 'id' : 'selfie');
    navigation?.replace(copy.route, params);
  }

  return { copy, retry };
}
