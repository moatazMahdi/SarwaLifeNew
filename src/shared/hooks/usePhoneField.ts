import { useRef, useState } from 'react';
import type { AppInputRef } from '../components/AppInput/AppInput';
import { toNsn } from '../utils/phone';

export function usePhoneField(onChange: (nsn: string) => void, onBlurField?: () => void) {
  const inputRef = useRef<AppInputRef>(null);
  const [focused, setFocused] = useState(false);

  return {
    inputRef,
    focused,
    focusInput: () => inputRef.current?.focus(),
    onChangeText: (raw: string) => onChange(toNsn(raw)),
    onFocus: () => setFocused(true),
    onBlur: () => {
      setFocused(false);
      onBlurField?.();
    },
  };
}
