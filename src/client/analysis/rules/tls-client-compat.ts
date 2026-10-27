import type { Analyzer } from '../types';
import { t } from '@/i18n';

interface Sim {
  client?: { name?: string; version?: string };
  errorCode?: number;
}

// Collect handshake-failure simulations from the SSL Labs report
const failures = (d: any): Sim[] => {
  if (!Array.isArray(d?.endpoints)) return [];
  const out: Sim[] = [];
  for (const e of d.endpoints) {
    const sims = e?.details?.sims?.results;
    if (!Array.isArray(sims)) continue;
    for (const s of sims) if (s?.errorCode && s.errorCode !== 0) out.push(s);
  }
  return out;
};

// Surface clients that cannot negotiate TLS with this host
const tlsClientCompat: Analyzer = (d) => {
  const fails = failures(d);
  if (!fails.length) return [];
  const sample = fails
    .slice(0, 5)
    .map((s) => `${s.client?.name || 'client'} ${s.client?.version || ''}`.trim())
    .join(', ');
  const more = fails.length > 5 ? t(' (+{count} more)', { count: fails.length - 5 }) : '';
  return [
    {
      severity: 'warning',
      title: t('{count} simulated client(s) cannot connect', { count: fails.length }),
      detail: t('{sample}{more}. Drop legacy ciphers/protocols only after weighing reach', {
        sample,
        more,
      }),
    },
  ];
};

export default tlsClientCompat;
