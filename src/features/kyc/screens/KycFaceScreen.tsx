import React from 'react';
import { S, useI18n } from '../../../shared/i18n';
import {
  CameraChrome,
  CameraControls,
  CameraLayout,
  CameraPreview,
  FaceOverlay,
} from '../components';
import { useKycFace } from '../hooks/useKycFace';

export function KycFaceScreen(props: any) {
  const { t } = useI18n();
  const { camera, onConfirm, onBack } = useKycFace(props);

  return (
    <CameraLayout>
      <CameraPreview camera={camera} />
      <FaceOverlay />
      <CameraChrome
        title={t(S.kyc.face.headTitle)}
        caption={camera.shot ? t(S.kyc.face.check) : t(S.kyc.face.hint)}
        onBack={onBack}
      >
        <CameraControls camera={camera} onConfirm={onConfirm} />
      </CameraChrome>
    </CameraLayout>
  );
}
