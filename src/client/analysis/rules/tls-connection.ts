import type { Analyzer, Severity } from '../types';
import { t } from '@/i18n';

const LEGACY: Record<string, string> = { TLSv1: 'TLS 1.0', 'TLSv1.1': 'TLS 1.1' };

// How good the negotiated TLS version is, from outdated to current
export const protocolSeverity = (protocol: string): Severity | undefined => {
  if (/^SSLv|TLSv1(\.0)?$|TLSv1\.1/.test(protocol)) return 'critical';
  if (protocol === 'TLSv1.2') return 'info';
  if (protocol === 'TLSv1.3') return 'pass';
};

// Inspect negotiated protocol, legacy versions, forward secrecy, ALPN, OCSP stapling
const tlsConnection: Analyzer = (d) => {
  const out: ReturnType<Analyzer> = [];
  const protocol = String(d.protocol || '');
  const legacy = (d.versions || []).filter((v: string) => LEGACY[v]).map((v: string) => LEGACY[v]);
  const severity = protocolSeverity(protocol);

  if (severity === 'critical') {
    out.push({
      severity: 'critical',
      title: t('Outdated TLS protocol negotiated: {protocol}', { protocol }),
      detail: t('Disable TLS 1.0 and 1.1 on the server'),
    });
  } else if (legacy.length) {
    out.push({
      severity: 'issue',
      title: t('Server still accepts {versions}', { versions: legacy.join(t(' and ')) }),
      detail: t('Browsers dropped these in 2020 and they have known weaknesses, so disable them'),
    });
  }

  if (severity === 'info') {
    out.push({ severity: 'info', title: t('TLS 1.2 in use, consider enabling TLS 1.3') });
  } else if (severity === 'pass') {
    out.push({ severity: 'pass', title: t('TLS 1.3 negotiated') });
  }

  if (d.forwardSecrecy === false) {
    out.push({
      severity: 'warning',
      title: t('No forward secrecy in negotiated cipher'),
      detail: t('Prefer ECDHE or DHE cipher suites'),
    });
  }

  if (d.ocspStapled === false) {
    out.push({
      severity: 'info',
      title: t('OCSP stapling not enabled'),
      detail: t('Enable OCSP stapling to speed up cert revocation checks'),
    });
  }

  if (d.alpnProtocol === 'h2') {
    out.push({ severity: 'pass', title: t('HTTP/2 negotiated via ALPN') });
  }

  return out;
};

export default tlsConnection;
