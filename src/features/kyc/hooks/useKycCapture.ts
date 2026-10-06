import { useCallback, useEffect, useMemo } from 'react';
import { useCameraPermission } from 'react-native-vision-camera';
import { useFlow } from '../../../shared/state/FlowContext';
import { Side } from '../constants';

export function useKycCapture({ navigation, route }: any) {
  const params = useMemo(() => route?.params ?? {}, [route?.params]);
  const { idFrontUri, idBackUri } = useFlow();
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission, requestPermission]);

  const capture = useCallback(
    (side: Side) => navigation?.navigate('KycIdCamera', { ...params, side }),
    [navigation, params],
  );

  return {
    idFrontUri,
    idBackUri,
    ready: !!idFrontUri && !!idBackUri,
    capture,
    onBack: () => navigation?.goBack(),
    onNext: () => navigation?.navigate('KycProcessing', params),
  };
}
