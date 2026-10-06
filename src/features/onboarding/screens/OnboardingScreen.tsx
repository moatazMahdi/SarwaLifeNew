import React from 'react';
import { OnboardingArt, OnboardingHeader, OnboardingLayout, OnboardingPanel } from '../components';
import { useOnboarding } from '../hooks/useOnboarding';

export function OnboardingScreen(props: any) {
  const { step, slide, isLast, total, goHome, goNext } = useOnboarding(props);

  return (
    <OnboardingLayout header={<OnboardingHeader showSkip={!isLast} onSkip={goHome} />}>
      <OnboardingArt slide={slide} />
      <OnboardingPanel slide={slide} step={step} total={total} onNext={goNext} />
    </OnboardingLayout>
  );
}
