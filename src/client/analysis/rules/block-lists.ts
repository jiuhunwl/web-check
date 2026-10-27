import type { Analyzer } from '../types';
import { t } from '@/i18n';

// Domain is suspicious when blocked by family/security DNS resolvers
const blockLists: Analyzer = (d) => {
  if (!d || !Array.isArray(d.blocklists)) return [];
  const blocked = d.blocklists.filter((b: any) => b?.isBlocked);
  if (!blocked.length) return [{ severity: 'pass', title: t('Not on any tested DNS blocklist') }];
  const names = blocked.map((b: any) => b.server).join(', ');
  const severity = blocked.length >= 3 ? 'critical' : 'issue';
  return [
    {
      severity,
      title: t('Blocked by {count} DNS resolver(s)', { count: blocked.length }),
      detail: t('Listed by {servers}', { servers: names }),
    },
  ];
};

export default blockLists;
