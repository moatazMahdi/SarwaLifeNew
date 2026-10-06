import React from 'react';
import { S, useI18n } from '../../../shared/i18n';
import {
  CameraChrome,
  CameraControls,
  CameraLayout,
  CameraPreview,
  IdCardOverlay,
} from '../components';
import { useKycIdCamera } from '../hooks/useKycIdCamera';

export function KycIdCameraScreen(props: any) {
  const { t } = useI18n();
  const { side, camera, onConfirm, onBack } = useKycIdCamera(props);

  return (
    <CameraLayout>
      <CameraPreview camera={camera} />
      <IdCardOverlay />
      <CameraChrome
        title={t(side === 'back' ? S.kyc.idCamera.backTitle : S.kyc.idCamera.frontTitle)}
        caption={camera.shot ? t(S.kyc.idCamera.check) : t(S.kyc.idCamera.hint)}
        onBack={onBack}
      >
        <CameraControls camera={camera} onConfirm={onConfirm} />
      </CameraChrome>
    </CameraLayout>
  );
}
