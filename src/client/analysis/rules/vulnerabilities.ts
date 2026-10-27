import type { Analyzer } from '../types';
import type { Vuln } from 'client/utils/result-processor';
import { t } from '@/i18n';

const MAX_LISTED = 8;

// Surface CVEs Shodan attributes to this host, rated by known or likely exploitation
const vulnerabilities: Analyzer = (d) => {
  const vulns: Vuln[] = Array.isArray(d?.vulns) ? d.vulns : [];
  if (!vulns.length) return [{ severity: 'pass', title: t('No known CVEs on this host') }];
  const exploited = vulns.filter((v) => v.kev).length;
  const note = exploited
    ? t('{count} known to be exploited in the wild. ', { count: exploited })
    : '';
  const cves = vulns
    .slice(0, MAX_LISTED)
    .map((v) => v.id)
    .join(', ');
  const more =
    vulns.length > MAX_LISTED ? t(' (+{count} more)', { count: vulns.length - MAX_LISTED }) : '';
  return [
    {
      severity: exploited ? 'critical' : (vulns[0].epss ?? 0) >= 0.1 ? 'issue' : 'warning',
      title: t('Shodan reports {count} CVE(s) on this host', { count: vulns.length }),
      detail: t('{note}{cves}{more}. Patch affected services or block at the firewall', {
        note,
        cves,
        more,
      }),
    },
  ];
};

export default vulnerabilities;
