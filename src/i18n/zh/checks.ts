/**
 * Flat entries derived from the structured copy, so an English string that also
 * exists as structured content can be looked up like any other.
 *
 * Covers check titles and summaries, category titles and tool names, plus the
 * resource link labels. Keeping this derived means a title only has to be
 * translated once, in src/data/checks/zh*.ts or src/data/categories-zh.ts.
 */
import { checks, checkIds } from '@/data/checks';
import { checkDocsZh, resourcesZh } from '@/data/checks/zh';
import { categories, categoryIds, toolName } from '@/data/categories';
import { categoriesZh, toolNamesZh } from '@/data/categories-zh';

const fromChecks = Object.fromEntries(
  checkIds.flatMap((id) => {
    const zh = checkDocsZh[id];
    if (!zh) return [];
    return [
      [checks[id].title, zh.title],
      [checks[id].summary, zh.summary],
    ];
  }),
);

const fromCategories = Object.fromEntries(
  categoryIds.flatMap((id) => [
    [categories[id].title, categoriesZh[id].title],
    [toolName(id), toolNamesZh[id]],
    [categories[id].label, categoriesZh[id].label],
  ]),
);

const derived: Record<string, string> = {
  ...fromChecks,
  ...fromCategories,
  ...resourcesZh,
};

export default derived;
