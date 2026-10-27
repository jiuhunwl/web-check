import type { Analyzer } from '../types';
import { t } from '@/i18n';

export const LEAK_HEADERS = ['x-powered-by', 'server', 'x-aspnet-version', 'x-aspnetmvc-version'];

// Surface server fingerprint headers as informational findings
const headers: Analyzer = (d) => {
  const out: ReturnType<Analyzer> = [];
  for (const key of LEAK_HEADERS) {
    const val = d[key];
    if (val) {
      out.push({
        severity: 'info',
        title: t('Server discloses {header}', { header: key }),
        detail: t('Value: {value}', { value: String(val).slice(0, 80) }),
      });
    }
  }
  return out;
};

export default headers;
