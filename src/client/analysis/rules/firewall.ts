import type { Analyzer } from '../types';
import { t } from '@/i18n';

// Lack of a detectable WAF is a hardening gap, not a hard fail
const firewall: Analyzer = (d) => {
  if (d.hasWaf) {
    return [
      {
        severity: 'pass',
        title: t('WAF detected: {waf}', { waf: d.waf || t('unknown') }),
      },
    ];
  }
  return [
    {
      severity: 'warning',
      title: t('No web application firewall detected'),
      detail: t('Consider Cloudflare, AWS WAF or similar to filter malicious traffic'),
    },
  ];
};

export default firewall;
