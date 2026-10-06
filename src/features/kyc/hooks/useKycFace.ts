import { useCallback, useMemo } from 'react';
import { useFlow } from '../../../shared/state/FlowContext';
import { useCameraCapture } from './useCameraCapture';

export function useKycFace({ navigation, route }: any) {
  const params = useMemo(() => route?.params ?? {}, [route?.params]);
  const { setSelfie } = useFlow();
  const camera = useCameraCapture('front', 'balanced');
  const { shot } = camera;

  const onConfirm = useCallback(() => {
    if (!shot) return;
    setSelfie(shot);
    navigation?.replace('KycVerifying', params);
  }, [shot, setSelfie, navigation, params]);

  return { camera, onConfirm, onBack: () => navigation?.goBack() };
}
