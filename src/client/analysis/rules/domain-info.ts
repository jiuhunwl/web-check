import type { Analyzer } from '../types';
import { daysUntil } from '../helpers';
import { formatNumber } from 'client/utils/format';
import { t } from '@/i18n';

// Warn when a domain is close to expiring so renewal can happen on time
const domainInfo: Analyzer = (d) => {
  const days = daysUntil(d.expires);
  if (days === null) return [];
  if (days < 0) {
    return [
      {
        severity: 'critical',
        title: t('Domain registration expired'),
        detail: t('Expired {days} day(s) ago, renew before it drops', {
          days: formatNumber(-days),
        }),
      },
    ];
  }
  if (days <= 7) {
    return [
      {
        severity: 'critical',
        title: t('Domain expires within a week'),
        detail: t('Expires in {count} day(s), renew immediately', { count: days }),
      },
    ];
  }
  if (days <= 30) {
    return [
      {
        severity: 'warning',
        title: t('Domain expires within a month'),
        detail: t('Expires in {count} day(s)', { count: days }),
      },
    ];
  }
  return [{ severity: 'pass', title: t('Domain registration is valid') }];
};

export default domainInfo;
