import type { Analyzer } from '../types';
import { t } from '@/i18n';

// DNSSEC enabled when DNSKEY + DS records exist for the zone
const dnssec: Analyzer = (d) => {
  const dnskey = !!d.DNSKEY?.isFound;
  const ds = !!d.DS?.isFound;
  if (dnskey && ds) {
    return [{ severity: 'pass', title: t('DNSSEC enabled') }];
  }
  return [
    {
      severity: 'warning',
      title: t('DNSSEC not enabled'),
      detail: t('Sign DNS records to prevent spoofing and cache poisoning'),
    },
  ];
};

export default dnssec;
