import type { CheckId } from './index';
import { partA } from './zh-a';
import { partB } from './zh-b';

/**
 * Chinese copy for the check documentation.
 *
 * English stays the source of truth in the sibling files; this only holds the
 * translated strings, so a missing entry falls back to English instead of
 * breaking the docs modal.
 */
export interface CheckDocZh {
  title: string;
  summary: string;
  description: string;
  use: string;
  /** Resource titles, keyed by their English title */
  resources?: Record<string, string>;
}

const parts: Array<Partial<Record<CheckId, CheckDocZh>>> = [partA, partB];

export const checkDocsZh: Partial<Record<CheckId, CheckDocZh>> = Object.assign({}, ...parts);

/** Flattened resource titles, so a link label can be looked up like any string. */
export const resourcesZh: Record<string, string> = Object.assign(
  {},
  ...parts.map((part) =>
    Object.values(part).reduce<Record<string, string>>(
      (all, doc) => ({ ...all, ...(doc?.resources ?? {}) }),
      {},
    ),
  ),
);
