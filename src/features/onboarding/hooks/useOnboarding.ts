import { useCallback } from 'react';
import { SLIDES } from '../constants';

export function useOnboarding({ navigation, route }: any) {
  const step: number = route?.params?.step ?? 1;
  const slide = SLIDES[step - 1];
  const isLast = step === SLIDES.length;

  const goHome = useCallback(
    () => navigation?.reset({ index: 0, routes: [{ name: 'Home' }] }),
    [navigation],
  );

  const goNext = useCallback(
    () => (isLast ? goHome() : navigation?.navigate('Onboarding', { step: step + 1 })),
    [goHome, isLast, navigation, step],
  );

  return { step, slide, isLast, goHome, goNext, total: SLIDES.length };
}
