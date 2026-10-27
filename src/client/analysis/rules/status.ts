import type { Analyzer, Result } from '../types';
import { formatNumber } from 'client/utils/format';
import { t } from '@/i18n';

const SLOW_MS = 2000;
const VERY_SLOW_MS = 5000;

// A note on a slow response time, or null when it's quick enough
export const checkResponseTime = (ms: number): Result | null => {
  if (ms >= VERY_SLOW_MS) {
    return {
      severity: 'warning',
      title: t('Slow response time: {time}ms', { time: formatNumber(ms, { digits: 0 }) }),
      detail: t('Investigate server performance, caching or CDN coverage'),
    };
  }
  if (ms >= SLOW_MS) {
    return {
      severity: 'info',
      title: t('Response time over {time}ms', { time: formatNumber(SLOW_MS) }),
    };
  }
  return null;
};

// Reachability + latency. Non-success codes never reach here, the API throws
const status: Analyzer = (d) => {
  const out: ReturnType<Analyzer> = [];
  const code = Number(d.responseCode);
  if (Number.isFinite(code)) {
    out.push({ severity: 'pass', title: t('Site responded with {code}', { code }) });
  }
  const slow = checkResponseTime(Number(d.responseTime));
  if (slow) out.push(slow);
  return out;
};

export default status;
