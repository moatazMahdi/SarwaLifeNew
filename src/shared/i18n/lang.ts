import AsyncStorage from '@react-native-async-storage/async-storage';
import { DevSettings, I18nManager, NativeModules } from 'react-native';

export type Lang = 'ar' | 'en';

export const LANGS: Lang[] = ['ar', 'en'];
export const DEFAULT_LANG: Lang = 'ar';

export const isRtl = (lang: Lang) => lang === 'ar';

export const LANG_ENDONYM: Record<Lang, string> = { ar: 'العربية', en: 'English' };

export type Phrase = readonly [ar: string, en: string];

export const pick = (p: Phrase, lang: Lang): string => (lang === 'en' ? p[1] || p[0] : p[0]);

const AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export const digits = (value: number | string, lang: Lang): string =>
  lang === 'ar' ? String(value).replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)]) : String(value);

const STORAGE_KEY = 'sarwa.lang';

export async function readStoredLang(): Promise<Lang> {
  try {
    const v = await AsyncStorage.getItem(STORAGE_KEY);
    return v === 'ar' || v === 'en' ? v : DEFAULT_LANG;
  } catch {
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

export function applyDirection(lang: Lang): boolean {
  const want = isRtl(lang);
  if (I18nManager.isRTL === want) return false;
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(want);
  return true;
}

export function reloadApp(): boolean {
  if (__DEV__ && NativeModules.DevSettings) {
    DevSettings.reload();
    return true;
  }
  return false;
}
