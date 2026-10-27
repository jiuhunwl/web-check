import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getLang, hasTranslation, onLangChange, t as translate, type Lang } from '@/i18n';

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

/**
 * Skip reasons and errors come back from the handlers already interpolated, so
 * the templated ones are matched back to their key before translating. Text
 * that is ours but unknown, or an upstream error, is passed through as-is.
 */
const templated: { match: RegExp; key: string; field: string }[] = [
  {
    match: /^(.*) isn't ranked in the top 1 million sites yet$/,
    key: "{host} isn't ranked in the top 1 million sites yet",
    field: 'host',
  },
  {
    match: /^No nameservers found for (.*)$/,
    key: 'No nameservers found for {domain}',
    field: 'domain',
  },
  {
    match: /^No subdomains found for (.*) in Certificate Transparency logs$/,
    key: 'No subdomains found for {domain} in Certificate Transparency logs',
    field: 'domain',
  },
];

export const localizeReason = (reason?: string): string | undefined => {
  if (!reason) return reason;
  // Some handler strings carry a trailing space, so match on the trimmed text
  const key = reason.trim();
  if (hasTranslation(key)) return translate(key);
  for (const { match, key: template, field } of templated) {
    const found = match.exec(key);
    if (found) return translate(template, { [field]: found[1] });
  }
  return reason;
};

export default I18nProvider;
