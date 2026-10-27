import type { Analyzer, Result } from '../types';
import { t } from '@/i18n';

// A note on how many redirects the chain follows, warning when it's long
export const checkHops = (chain: string[]): Result | null => {
  const hops = chain.length - 1;
  if (hops >= 4) {
    return {
      severity: 'warning',
      title: t('Long redirect chain: {count} hops', { count: hops }),
      detail: t('Collapse intermediate redirects to reduce latency'),
    };
  }
  return hops > 0
    ? { severity: 'info', title: t('{count} redirect hop(s)', { count: hops }) }
    : null;
};

// Whether a chain that starts on HTTP ends up on HTTPS, or null when it starts on HTTPS
export const checkHttps = (chain: string[]): Result | null => {
  if (!/^http:\/\//i.test(chain[0])) return null;
  if (/^https:\/\//i.test(chain[chain.length - 1])) {
    return { severity: 'pass', title: t('HTTP requests are redirected to HTTPS') };
  }
  return {
    severity: 'critical',
    title: t('Site does not enforce HTTPS'),
    detail: t('Add a permanent redirect from http:// to https://'),
  };
};

// Inspect the HTTP redirect chain for length and HTTPS upgrade
const redirects: Analyzer = (d) => {
  const chain: string[] = Array.isArray(d?.redirects)
    ? d.redirects.filter((u: unknown) => typeof u === 'string')
    : [];
  if (!chain.length) return [];
  return [checkHops(chain), checkHttps(chain)].filter((r) => r !== null);
};

export default redirects;
