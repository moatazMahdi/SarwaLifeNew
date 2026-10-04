import AsyncStorage from '@react-native-async-storage/async-storage';
import { DevSettings, I18nManager, NativeModules } from 'react-native';

/**
 * The two languages the app ships in. Arabic is the product's first language, so it is also
 * the default on a fresh install — the device locale is deliberately ignored.
 */
export type Lang = 'ar' | 'en';

export const LANGS: Lang[] = ['ar', 'en'];
export const DEFAULT_LANG: Lang = 'ar';

/** Arabic lays out right-to-left; English left-to-right. */
export const isRtl = (lang: Lang) => lang === 'ar';

/** What each language calls itself — a switcher must never be written in the other tongue. */
export const LANG_ENDONYM: Record<Lang, string> = { ar: 'العربية', en: 'English' };

/**
 * One translatable piece of copy, Arabic first. Phrases are passed around as values rather
 * than looked up by a string key: `t(S.home.greeting)` is checked by the compiler, so a typo
 * or a deleted entry is a build error instead of a blank label discovered on a device.
 */
export type Phrase = readonly [ar: string, en: string];

/** Writes a phrase. Arabic doubles as the fallback while English is still being filled in. */
export const pick = (p: Phrase, lang: Lang): string => (lang === 'en' ? p[1] || p[0] : p[0]);

const AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

/**
 * Writes a bare number in the current language's digits.
 *
 * Arabic gets Arabic-Indic digits, which is what the Figma draws in the age pill, the date
 * dropdowns and the card counter. English gets the Western ones it was typed with. This is
 * for standalone counts only — money keeps Western digits in both languages (see `money` in
 * `data/products`), the way prices are actually printed in Egypt.
 */
export const digits = (value: number | string, lang: Lang): string =>
  lang === 'ar' ? String(value).replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)]) : String(value);

const STORAGE_KEY = 'sarwa.lang';

export async function readStoredLang(): Promise<Lang> {
  try {
    const v = await AsyncStorage.getItem(STORAGE_KEY);
    return v === 'ar' || v === 'en' ? v : DEFAULT_LANG;
  } catch {
    // A broken store is not worth a crash — fall back to the product's first language.
    return DEFAULT_LANG;
  }
}

export async function writeStoredLang(lang: Lang): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Non-fatal: the direction flag below is persisted natively anyway, so the next launch
    // still comes up in the right direction even if this write is lost.
  }
}

/**
 * Lines the native layout direction up with `lang`.
 *
 * Returns `true` when the direction actually changed, which means the native views were all
 * built the wrong way round and the app has to come up again before anything looks right —
 * RN fixes a view's direction when it is created, so flipping the flag alone does nothing to
 * the tree that is already on screen.
 */
export function applyDirection(lang: Lang): boolean {
  const want = isRtl(lang);
  if (I18nManager.isRTL === want) return false;
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(want);
  return true;
}

/**
 * Restarts the JS runtime. `DevSettings.reload` only exists in dev builds; a release build
 * needs a native restart module, so until one is added the caller is told to ask the user to
 * reopen the app (hence the boolean rather than a fire-and-forget void).
 */
export function reloadApp(): boolean {
  if (__DEV__ && NativeModules.DevSettings) {
    DevSettings.reload();
    return true;
  }
  return false;
}
