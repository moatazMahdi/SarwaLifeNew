import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import {
  applyDirection,
  DEFAULT_LANG,
  digits,
  isRtl,
  Lang,
  Phrase,
  pick,
  readStoredLang,
  reloadApp,
  writeStoredLang,
} from './lang';
import { S } from './strings';

type I18n = {
  lang: Lang;

  isRTL: boolean;

  t: (phrase: Phrase) => string;

  n: (value: number | string) => string;
  setLang: (lang: Lang) => void;

  toggle: () => void;
};

const I18nCtx = createContext<I18n | null>(null);

export function useI18n(): I18n {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang | null>(null);

  useEffect(() => {
    let alive = true;
    readStoredLang().then((stored) => {
      if (!alive) return;

      if (applyDirection(stored) && reloadApp()) return;
      setLangState(stored);
    });
    return () => {
      alive = false;
    };
  }, []);

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      setLangState(next);
      writeStoredLang(next);
      if (applyDirection(next) && !reloadApp()) {
        Alert.alert(pick(S.lang.restartTitle, next), pick(S.lang.restartBody, next), [
          { text: pick(S.lang.ok, next) },
        ]);
      }
    },
    [lang],
  );

  const value = useMemo<I18n>(() => {
    const current = lang ?? DEFAULT_LANG;
    return {
      lang: current,
      isRTL: isRtl(current),
      t: (phrase: Phrase) => pick(phrase, current),
      n: (num: number | string) => digits(num, current),
      setLang,
      toggle: () => setLang(current === 'ar' ? 'en' : 'ar'),
    };
  }, [lang, setLang]);

  if (lang === null) return null;
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}
