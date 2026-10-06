import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Linking } from 'react-native';

export function useCameraPrompt(hasPermission: boolean, requestPermission: () => Promise<boolean>) {
  const [denied, setDenied] = useState(false);
  const asking = useRef(false);

  const ask = useCallback(() => {
    if (hasPermission || asking.current) return;
    asking.current = true;
    requestPermission()
      .then((ok) => setDenied(!ok))
      .catch(() => setDenied(true))
      .finally(() => {
        asking.current = false;
      });
  }, [hasPermission, requestPermission]);

  useEffect(ask, [ask]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'active') {
        setDenied(false);
        ask();
      }
    });
    return () => sub.remove();
  }, [ask]);

  return {
    blocked: denied && !hasPermission,
    openSettings: () => {
      Linking.openSettings().catch(() => {});
    },
  };
}
