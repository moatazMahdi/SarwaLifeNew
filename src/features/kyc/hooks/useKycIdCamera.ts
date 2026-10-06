import { useCallback, useMemo } from 'react';
import { useFlow } from '../../../shared/state/FlowContext';
import { Side } from '../constants';
import { useCameraCapture } from './useCameraCapture';

export function useKycIdCamera({ navigation, route }: any) {
  const params = useMemo(() => route?.params ?? {}, [route?.params]);
  const side: Side = params.side === 'back' ? 'back' : 'front';
  const { setIdImage } = useFlow();
  const camera = useCameraCapture('back', 'quality');
  const { shot } = camera;

  const onConfirm = useCallback(() => {
    if (!shot) return;
    setIdImage(side, shot);
    navigation?.goBack();
  }, [shot, side, setIdImage, navigation]);

  return { side, camera, onConfirm, onBack: () => navigation?.goBack() };
}
