import { useCallback } from 'react';

export function useSplash({ navigation }: any) {
  const onNext = useCallback(() => navigation?.navigate('Onboarding', { step: 1 }), [navigation]);
  return { onNext };
}
