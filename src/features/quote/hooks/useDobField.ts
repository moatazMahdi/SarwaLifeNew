import { useMemo, useState } from 'react';
import { S, useI18n } from '../../../shared/i18n';
import { DobParts, digitsOf, dobToString, isRealDate, partsOf } from '../utils/dob';

export function useDobField(dob: DobParts, onDob: (next: DobParts) => void, age: number) {
  const { t } = useI18n();
  const [digits, setDigits] = useState(() => dobToString(dob).replace(/\D/g, ''));

  function onType(text: string) {
    const next = digitsOf(text);
    setDigits(next);
    onDob(partsOf(next));
  }

  const error = useMemo(() => {
    if (digits.length < 8) return null;
    if (!isRealDate(partsOf(digits))) return t(S.quote.data.dobInvalid);
    return age >= 18 && age <= 65 ? null : t(S.quote.data.dobAge);
  }, [digits, age, t]);

  return { digits, onType, error };
}
