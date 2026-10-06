import { useCallback, useState } from 'react';
import { useFlow } from '../../../shared/state/FlowContext';

export function useFaq({ navigation }: any) {
  const { isLoggedIn } = useFlow();
  const [open, setOpen] = useState<number | null>(null);

  const toggle = useCallback((i: number) => setOpen((cur) => (cur === i ? null : i)), []);
  const onBack = useCallback(() => navigation?.goBack(), [navigation]);
  const onGuest = useCallback(() => navigation?.navigate('LoginGate'), [navigation]);

  return { isLoggedIn, open, toggle, onBack, onGuest };
}
