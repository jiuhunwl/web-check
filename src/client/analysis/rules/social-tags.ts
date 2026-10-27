import type { Analyzer } from '../types';
import { t } from '@/i18n';

export const REQUIRED: Array<[string, string]> = [
  ['ogTitle', 'OpenGraph Title'],
  ['ogDescription', 'OpenGraph Description'],
  ['ogImage', 'OpenGraph Image'],
  ['twitterCard', 'Twitter Card'],
];

// Flag missing share-preview metadata
const socialTags: Analyzer = (d) => {
  const missing = REQUIRED.filter(([k]) => !d[k]).map(([, l]) => l);
  if (!missing.length) return [{ severity: 'pass', title: t('Social share metadata complete') }];
  return [
    {
      severity: 'warning',
      title: t('Missing social tags: {count}', { count: missing.length }),
      detail: t('Add {tags} for cleaner share previews', { tags: missing.join(', ') }),
    },
  ];
};

export default socialTags;
