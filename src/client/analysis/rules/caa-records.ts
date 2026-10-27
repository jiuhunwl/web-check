import type { Analyzer } from '../types';
import { t } from '@/i18n';

// Warn when no CAA issue tag limits which CAs can issue certificates
const caaRecords: Analyzer = (d) => {
  const records: any[] = Array.isArray(d.records) ? d.records : [];
  const issue = records.filter((r) => r.tag === 'issue');
  if (!issue.length) {
    return [
      {
        severity: 'warning',
        title: records.length ? t('CAA records have no issue tag') : t('No CAA records'),
        detail: t('Any certificate authority can issue certificates for this domain'),
      },
    ];
  }
  const issuers = [...new Set(issue.map((r) => r.value.split(';')[0].trim()).filter(Boolean))];
  if (!issuers.length) {
    return [{ severity: 'info', title: t('CAA blocks all certificate issuance') }];
  }
  return [
    {
      severity: 'pass',
      title: t('CAA limits issuance to {count} CA(s)', { count: issuers.length }),
      detail: issuers.join(', '),
    },
  ];
};

export default caaRecords;
