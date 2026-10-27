import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getLang, onLangChange, t as translate, type Lang } from '@/i18n';

interface I18nValue {
  lang: Lang;
  /** Translate an English source string into the active language */
  t: typeof translate;
}

// Defaults to English so a component outside the provider still renders
const I18nContext = createContext<I18nValue>({ lang: 'en', t: translate });

export const I18nProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [lang, setLang] = useState<Lang>(() => getLang());

  useEffect(() => onLangChange(() => setLang(getLang())), []);

  useEffect(() => {
    document.documentElement.lang = lang === 'zh-CN' ? 'zh-CN' : 'en';
  }, [lang]);

  // The value changes with the language, so every consumer re-renders
  const value = useMemo(() => ({ lang, t: translate }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

/** Translate helper for a component. */
export const useT = (): typeof translate => useContext(I18nContext).t;

/** The active language, for format-sensitive rendering. */
export const useLang = (): Lang => useContext(I18nContext).lang;

export default I18nProvider;
