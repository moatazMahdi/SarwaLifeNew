import React from 'react';
import { LivenessHero, LivenessLayout } from '../components';
import { useLivenessIntro } from '../hooks/useLivenessIntro';

export function LivenessIntroScreen(props: any) {
  const { onBack, onStart } = useLivenessIntro(props);

  return (
    <LivenessLayout onBack={onBack}>
      <LivenessHero onStart={onStart} />
    </LivenessLayout>
  );
}
