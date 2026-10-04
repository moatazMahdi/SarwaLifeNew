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
  /** Mirrors `I18nManager.isRTL` for the *current* language. */
  isRTL: boolean;
  /** Writes a phrase in the current language. */
  t: (phrase: Phrase) => string;
  /** Writes a bare number in the current language's digits — Arabic-Indic under `ar`. */
  n: (value: number | string) => string;
  setLang: (lang: Lang) => void;
  /** Flips between the two languages — what the header button calls. */
  toggle: () => void;
};

const I18nCtx = createContext<I18n | null>(null);

export function useI18n(): I18n {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}

/**
 * Owns the app's language.
 *
 * Two things have to agree: the strings (plain JS state) and the native layout direction
 * (a process-wide flag that RN reads when it builds each view). Only the strings can change
 * in place, so every change of direction ends in a restart. The flag itself is persisted
 * natively by `forceRTL`, and the language is persisted alongside it so the two can never
 * drift apart across launches.
 *
 * Children are held back until the stored language is known — rendering Arabic for a frame
 * and then snapping to English would be worse than a blank frame.
 */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang | null>(null);

  useEffect(() => {
    let alive = true;
    readStoredLang().then((stored) => {
      if (!alive) return;
      // A fresh install comes up LTR, so the default language already needs the flip.
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
        // Release builds have no reload module. The strings have already switched; the
        // layout follows on the next cold start.
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
