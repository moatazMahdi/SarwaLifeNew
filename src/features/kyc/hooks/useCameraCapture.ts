import { useCallback, useMemo, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  useCameraDevice,
  useCameraPermission,
  usePhotoOutput,
} from 'react-native-vision-camera';
import { useIsForeground } from './useIsForeground';

export function useCameraCapture(
  position: 'front' | 'back',
  quality: 'quality' | 'balanced',
) {
  const device = useCameraDevice(position);
  const { hasPermission, requestPermission } = useCameraPermission();
  const photoOutput = usePhotoOutput({ qualityPrioritization: quality });
  const outputs = useMemo(() => [photoOutput], [photoOutput]);

  const [shot, setShot] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const isFocused = useIsFocused();
  const isForeground = useIsForeground();

  const onShutter = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    try {
      const photo = await photoOutput.capturePhoto({ flashMode: 'off' }, {});
      const path = await photo.saveToTemporaryFileAsync();
      photo.dispose();
      setShot(`file://${path}`);
    } catch {
    } finally {
      setBusy(false);
    }
  }, [busy, photoOutput]);

  return {
    device,
    hasPermission,
    requestPermission,
    outputs,
    shot,
    busy,
    isActive: isFocused && isForeground,
    onShutter,
    onRetake: () => setShot(null),
    canShoot: !busy && !!device && hasPermission,
  };
}
