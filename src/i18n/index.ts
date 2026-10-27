/**
 * Internationalisation core.
 *
 * The English source string is the lookup key, so a missing translation falls
 * back to readable English instead of a raw key or an empty label. That keeps
 * the app usable if a string is added before its translation is written.
 *
 * Prefixed keys read structured content instead of the flat dictionary:
 *   check:<id>.<field>      -> src/data/checks/zh.ts
 *   category:<id>.<field>   -> src/data/categories-zh.ts
 *   term:<id>.<field>       -> src/data/glossary-zh.ts
 */
import { getSetting, setSetting } from '@/client/utils/settings';
import { checkDocsZh } from '@/data/checks/zh';
import { checks, isCheck, type CheckId } from '@/data/checks';
import { categoriesZh } from '@/data/categories-zh';
import { categories, isCategory, type CategoryId } from '@/data/categories';
import { glossaryZh } from '@/data/glossary-zh';
import { glossary, isTerm, type TermId } from '@/data/glossary';

import common from './zh/common';
import results from './zh/results';
import resultsTwo from './zh/results-2';
import rules from './zh/rules';
import pages from './zh/pages';
import components from './zh/components';
import checkResources from './zh/checks';

export type Lang = 'en' | 'zh-CN';

export const LANGS: ReadonlyArray<{ id: Lang; label: string; native: string }> = [
  { id: 'en', label: 'English', native: 'English' },
  { id: 'zh-CN', label: 'Simplified Chinese', native: '中文（简体）' },
];

const DEFAULT_LANG: Lang = 'en';
const FALLBACK: Lang = 'en';

/** Everything the UI needs, merged into one lookup table. */
const dictionaries: Record<Lang, Record<string, string>> = {
  en: {},
  'zh-CN': {
    ...common,
    ...results,
    ...resultsTwo,
    ...rules,
    ...pages,
    ...components,
    ...checkResources,
  },
};

const isLang = (value: unknown): value is Lang =>
  value === 'en' || value === 'zh-CN';

/** Read the stored preference, following the browser when set to auto. */
const detectLang = (): Lang => {
  if (typeof window === 'undefined') return DEFAULT_LANG;

  let saved: unknown;
  try {
    saved = getSetting('language');
  } catch {
    saved = undefined;
  }
  if (isLang(saved)) return saved;

  // Auto (or nothing saved yet): match the browser, Chinese first
  const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
  const preferred = tags.find((tag): tag is string => typeof tag === 'string') || '';
  if (/^zh\b/i.test(preferred)) return /^zh-(tw|hk|mo|hant)/i.test(preferred) ? 'zh-CN' : 'zh-CN';
  return FALLBACK;
};

let current: Lang | null = null;

/** The active language, cached so render loops don't re-read storage. */
export const getLang = (): Lang => {
  if (current === null) current = detectLang();
  return current;
};

/** Human readable name of a language, in that language. */
export const langName = (lang: Lang): string =>
  LANGS.find((entry) => entry.id === lang)?.native ?? lang;

/** BCP-47 tag for <html lang> and Intl. */
export const htmlLang = (lang: Lang = getLang()): string => (lang === 'zh-CN' ? 'zh-CN' : 'en');

type Vars = Record<string, string | number | undefined | null>;

/** Replace {placeholders} with values, leaving unknown ones untouched. */
const interpolate = (text: string, vars?: Vars): string => {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = vars[name];
    return value === undefined || value === null ? match : String(value);
  });
};

/** Walk a dotted path, so nested fields and array items both resolve. */
const pick = (source: unknown, path: string): unknown =>
  path
    .split('.')
    .reduce<unknown>((value, part) => (value as Record<string, unknown> | undefined)?.[part], source);

/** Chinese term copy, layered over the English so a gap falls back per field. */
const glossaryMerged = Object.fromEntries(
  Object.entries(glossary).map(([id, term]) => [id, { ...term, ...(glossaryZh[id as TermId] ?? {}) }]),
) as Record<TermId, (typeof glossary)[TermId]>;

export type { TermId };

/** Structured lookups for checks, categories and terms, in either language. */
const structured = (key: string, lang: Lang): string | undefined => {
  const [namespace, rest = ''] = key.split(':');
  const [id, ...fieldPath] = rest.split('.');
  const field = fieldPath.join('.');

  const source =
    namespace === 'check' && isCheck(id)
      ? lang === 'en'
        ? checks[id as CheckId]
        : (checkDocsZh[id] ?? checks[id as CheckId])
      : namespace === 'category' && isCategory(id)
        ? lang === 'en'
          ? categories[id as CategoryId]
          : categoriesZh[id]
        : namespace === 'term' && isTerm(id)
          ? lang === 'en'
            ? glossary[id as TermId]
            : glossaryMerged[id as TermId]
          : undefined;

  if (!source) return undefined;
  const value = field ? pick(source, field) : (source as { title?: string }).title;
  return typeof value === 'string' ? value : undefined;
};

const missing = new Set<string>();

/** Whether a key has a translation in the given language, even an identical one. */
export const hasTranslation = (key: string, lang: Lang = getLang()): boolean => {
  if (key.startsWith('check:') || key.startsWith('category:') || key.startsWith('term:')) {
    return structured(key, lang) !== undefined;
  }
  return dictionaries[lang]?.[key] !== undefined;
};

/** Translate a key, with optional {placeholder} values. */
export const t = (key: string, vars?: Vars, lang: Lang = getLang()): string => {
  if (!key) return '';

  let text: string | undefined;
  if (key.startsWith('check:') || key.startsWith('category:') || key.startsWith('term:')) {
    text = structured(key, lang);
  } else {
    text = dictionaries[lang]?.[key];
    // A locale may fall back to the base language for untranslated strings
    if (text === undefined && lang !== FALLBACK) text = dictionaries[FALLBACK]?.[key];
  }

  if (text === undefined) {
    if (import.meta.env?.DEV && lang !== FALLBACK && !key.includes(':') && !missing.has(key)) {
      missing.add(key);
      console.warn(`[i18n] Missing ${lang} translation: ${key}`);
    }
    text = key;
  }

  return interpolate(text, vars);
};

/**
 * What a glossary term means for a row, preferring the pass or fail wording
 * when the term has one, and falling back to its definition.
 */
export const termText = (id: TermId, passed: boolean): string => {
  const key = `term:${id}.${passed ? 'pass' : 'fail'}`;
  const text = t(key);
  return text === key ? t(`term:${id}.definition`) : text;
};

const listeners = new Set<() => void>();

/** Subscribe to language changes. Returns an unsubscribe function. */
export const onLangChange = (callback: () => void): (() => void) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

const announce = () => listeners.forEach((callback) => callback());

const applyLangToDocument = (lang: Lang) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.lang = htmlLang(lang);
  root.dataset.lang = lang;
  root.classList.toggle('lang-zh', lang === 'zh-CN');
  // The boot script hides the page briefly; this is what reveals it
  root.removeAttribute('data-i18n-pending');
};

/** Change language, persist it, and update every subscriber. */
export const setLang = (lang: Lang): void => {
  if (!isLang(lang)) return;
  current = lang;
  try {
    setSetting('language', lang);
  } catch {
    /* storage can be unavailable, the in-memory value still applies */
  }
  applyLangToDocument(lang);
  applyTranslations();
  announce();
};

/** Re-read the stored preference (used when another tab changes it). */
export const refreshLang = (): void => {
  const next = detectLang();
  if (next === current) return;
  current = next;
  applyLangToDocument(next);
  applyTranslations();
  announce();
};

/* ---------------------------------------------------------------- DOM layer */

const ATTR_PREFIX = 'data-i18n-';
const RESERVED = new Set([
  'data-i18n',
  'data-i18n-html',
  'data-i18n-vars',
  'data-i18n-after',
  'data-i18n-doc',
]);

const readVars = (el: HTMLElement): Vars | undefined => {
  const raw = el.dataset.i18nVars;
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as Vars;
  } catch {
    return undefined;
  }
};

/** The English markup as it was built, so `en` can go back to it untouched. */
const originalHtml = new WeakMap<HTMLElement, string>();

/**
 * Astro scopes component styles with a `data-astro-cid-*` attribute, so any
 * markup a translation injects has to carry the same marker. Without it the new
 * nodes fall back to the global element styles — which is how the footer links
 * ended up lime-on-lime, invisible against the bar.
 */
const writeHtml = (el: HTMLElement, html: string): void => {
  if (el.innerHTML === html) return;
  el.innerHTML = html;
  const scopes = Array.from(el.attributes).filter(({ name }) => name.startsWith('data-astro-cid-'));
  if (!scopes.length) return;
  el.querySelectorAll('*').forEach((child) => {
    for (const { name, value } of scopes) {
      if (!child.hasAttribute(name)) child.setAttribute(name, value);
    }
  });
};

/**
 * Translate server-rendered markup. Elements opt in with:
 *   data-i18n="English source"          textContent
 *   data-i18n-html="English source"     innerHTML (translations may hold markup)
 *   data-i18n-vars='{"n":3}'            interpolation values
 *   data-i18n-placeholder="..."         any attribute: data-i18n-<attr>
 * The English stays in the markup, so this is the fallback and the key.
 */
export const applyTranslations = (root: ParentNode = document): void => {
  if (typeof document === 'undefined') return;
  const lang = getLang();

  root.querySelectorAll<HTMLElement>('[data-i18n], [data-i18n-html]').forEach((el) => {
    const asHtml = el.hasAttribute('data-i18n-html');
    const key = el.getAttribute(asHtml ? 'data-i18n-html' : 'data-i18n') || '';
    // A suffix like " | Web Check" is brand copy, so it stays in English
    const suffix = el.dataset.i18nAfter ?? '';
    const value = t(key, readVars(el), lang) + suffix;
    if (asHtml) {
      if (!originalHtml.has(el)) originalHtml.set(el, el.innerHTML);
      if (lang === 'en') {
        // The build already shipped this markup, scope attributes included
        const pristine = originalHtml.get(el) as string;
        if (el.innerHTML !== pristine) el.innerHTML = pristine;
      } else {
        writeHtml(el, value);
      }
    } else if (el.textContent !== value) {
      el.textContent = value;
    }
  });

  root.querySelectorAll<HTMLElement>('*').forEach((el) => {
    for (const { name, value } of Array.from(el.attributes)) {
      if (!name.startsWith(ATTR_PREFIX) || RESERVED.has(name)) continue;
      const attribute = name.slice(ATTR_PREFIX.length);
      const translated = t(value, readVars(el), lang);
      if (el.getAttribute(attribute) !== translated) el.setAttribute(attribute, translated);
    }
  });
};

/** Set up a server-rendered page: translate now, and again after every swap. */
export const initPageI18n = (): void => {
  if (typeof window === 'undefined') return;
  applyLangToDocument(getLang());
  applyTranslations();

  document.addEventListener('astro:page-load', () => {
    applyLangToDocument(getLang());
    applyTranslations();
  });

  // Astro's client router swaps the <html> attributes too, so re-apply after
  document.addEventListener('astro:after-swap', () => applyLangToDocument(getLang()));

  addEventListener('settings-change', refreshLang);
  addEventListener('storage', refreshLang);
  onLangChange(() => applyTranslations());
};
