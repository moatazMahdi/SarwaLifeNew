import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FOOTER_FADE } from '../constants';

export function useFooterInset(buttonHeight = 56) {
  const insets = useSafeAreaInsets();
  return FOOTER_FADE + buttonHeight + Math.max(insets.bottom, 16) + 12;
}
