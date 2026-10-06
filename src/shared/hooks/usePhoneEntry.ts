import { useState } from 'react';
import { Phrase, useI18n } from '../i18n';
import { isCompleteNsn, PHONE_ERROR } from '../utils/phone';

export function usePhoneEntry() {
  const { t } = useI18n();
  const [value, setValue] = useState('');
  const [error, setError] = useState<Phrase | null>(null);

  const onChange = (next: string) => {
    setValue(next);
    setError(null);
  };

  const validate = () => {
    const ok = isCompleteNsn(value);
    setError(ok ? null : PHONE_ERROR);
    return ok;
  };

  const onBlurField = () => {
    if (value.length > 0) validate();
  };

  return { value, error: error ? t(error) : null, onChange, onBlurField, validate };
}
