import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

export function useIsForeground() {
  const [fg, setFg] = useState(AppState.currentState === 'active');
  useEffect(() => {
    const sub = AppState.addEventListener('change', (s) => setFg(s === 'active'));
    return () => sub.remove();
  }, []);
  return fg;
}
