import React from 'react';
import { SplashBrand, SplashFooter, SplashHeader, SplashLayout } from '../components';
import { useSplash } from '../hooks/useSplash';

export function SplashScreen(props: any) {
  const { onNext } = useSplash(props);

  return (
    <SplashLayout>
      <SplashHeader />
      <SplashBrand />
      <SplashFooter onNext={onNext} />
    </SplashLayout>
  );
}
