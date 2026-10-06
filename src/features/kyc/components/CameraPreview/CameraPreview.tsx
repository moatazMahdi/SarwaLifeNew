import React from 'react';
import { Camera } from 'react-native-vision-camera';
import { AppImage } from '../../../../shared/components';
import { useCameraCapture } from '../../hooks/useCameraCapture';
import { CameraWaiting } from '../CameraWaiting/CameraWaiting';
import { styles } from './CameraPreview.styles';

type Props = { camera: ReturnType<typeof useCameraCapture> };

export function CameraPreview({ camera }: Props) {
  if (camera.shot) {
    return <AppImage source={{ uri: camera.shot }} style={styles.fill} resizeMode="cover" />;
  }
  if (camera.device && camera.hasPermission) {
    return (
      <Camera
        style={styles.fill}
        device={camera.device}
        isActive={camera.isActive}
        outputs={camera.outputs}
      />
    );
  }
  return (
    <CameraWaiting
      hasPermission={camera.hasPermission}
      requestPermission={camera.requestPermission}
    />
  );
}
