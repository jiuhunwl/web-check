import type { Analyzer } from '../types';
import { t } from '@/i18n';

// One year, the shortest max-age the HSTS preload list accepts
export const MIN_MAX_AGE = 31536000;

// The max-age and flags an HSTS header sets
export const parseHsts = (header: string) => {
  const lower = header.toLowerCase();
  return {
    maxAge: Number(/max-age\s*=\s*"?(\d+)/.exec(lower)?.[1] || 0),
    includeSubDomains: lower.includes('includesubdomains'),
    preload: lower.includes('preload'),
  };
};

// Check HSTS presence, max-age, includeSubDomains, preload
const hsts: Analyzer = (d) => {
  if (!d.hstsHeader) {
    return [
      {
        severity: 'issue',
        title: t('No HSTS header'),
        detail: t('Add Strict-Transport-Security to enforce HTTPS for clients'),
      },
    ];
  }
  const { maxAge, includeSubDomains, preload } = parseHsts(String(d.hstsHeader));
  const out: ReturnType<Analyzer> = [];
  if (maxAge < MIN_MAX_AGE) {
    out.push({
      severity: 'warning',
      title: t('HSTS max-age under a year'),
      detail: t('Current max-age is {maxAge}, raise it to {minMaxAge} for preload eligibility', {
        maxAge,
        minMaxAge: MIN_MAX_AGE,
      }),
    });
  }
  if (!includeSubDomains) {
    out.push({
      severity: 'warning',
      title: t('HSTS missing includeSubDomains'),
      detail: t('Add includeSubDomains to protect every subdomain'),
    });
  }
  if (!preload) {
    out.push({
      severity: 'info',
      title: t('HSTS missing preload directive'),
      detail: t('Add preload to qualify for the HSTS preload list'),
    });
  }
  if (d.compatible) out.push({ severity: 'pass', title: t('HSTS preload compatible') });
  return out;
};

export default hsts;
