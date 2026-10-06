import React from 'react';
import { CaptureContent, CaptureFooter, KycFlowLayout } from '../components';
import { useKycCapture } from '../hooks/useKycCapture';

export function KycCaptureScreen(props: any) {
  const { idFrontUri, idBackUri, ready, capture, onBack, onNext } = useKycCapture(props);

  return (
    <KycFlowLayout step={1} onBack={onBack}>
      <CaptureContent front={idFrontUri} back={idBackUri} onCapture={capture} />
      <CaptureFooter ready={ready} onNext={onNext} />
    </KycFlowLayout>
  );
}
