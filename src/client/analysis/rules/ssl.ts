import type { Analyzer, Result } from '../types';
import { daysUntil } from '../helpers';
import { formatNumber } from 'client/utils/format';
import { t } from '@/i18n';

// Plain reasons for the validation errors sites most often get
export const REASONS: Record<string, string> = {
  UNABLE_TO_VERIFY_LEAF_SIGNATURE: "Server doesn't send its intermediate certificate",
  UNABLE_TO_GET_ISSUER_CERT_LOCALLY: "Server doesn't send its intermediate certificate",
  DEPTH_ZERO_SELF_SIGNED_CERT: 'Self-signed, not issued by a trusted authority',
  SELF_SIGNED_CERT_IN_CHAIN: "Chain ends at a root browsers don't trust",
  ERR_TLS_CERT_ALTNAME_INVALID: "Certificate doesn't cover this hostname",
};

// A problem with when the certificate expires, or null when it's over a month away
export const checkExpiry = (validTo: unknown): Result | null => {
  const days = daysUntil(validTo);
  if (days === null || days > 30) return null;
  if (days < 0) {
    return {
      severity: 'critical',
      title: t('SSL certificate expired'),
      detail: t('Expired {days} day(s) ago', { days: formatNumber(-days) }),
    };
  }
  if (days <= 7) {
    return {
      severity: 'critical',
      title: t('SSL certificate expiring within a week'),
      detail: t('Expires in {count} day(s), renew immediately', { count: days }),
    };
  }
  if (days <= 14) {
    return {
      severity: 'issue',
      title: t('SSL certificate expiring soon'),
      detail: t('Expires in {count} day(s), schedule renewal', { count: days }),
    };
  }
  return {
    severity: 'warning',
    title: t('SSL certificate renews within a month'),
    detail: t('Expires in {count} day(s)', { count: days }),
  };
};

// Check certificate validity and expiry window
const ssl: Analyzer = (d) => {
  const out: ReturnType<Analyzer> = [];
  if (d.isValid === false) {
    out.push({
      severity: 'critical',
      title: t('SSL certificate invalid'),
      detail: REASONS[d.authError] || d.authError || t('Certificate failed validation'),
    });
  } else if (d.isValid === true) {
    out.push({ severity: 'pass', title: t('SSL certificate valid') });
  }
  const expiry = checkExpiry(d.valid_to);
  if (expiry) out.push(expiry);
  return out;
};

export default ssl;
