import type { Analyzer, Result } from '../types';
import { t } from '@/i18n';

const label = (profile: any): string => `${profile.network} @${profile.handle}`;

// Flag claimed social accounts that are missing, or cannot be tied back to the site
const socialPresence: Analyzer = (d) => {
  const profiles: any[] = Array.isArray(d.profiles) ? d.profiles : [];
  const missing = profiles.filter((p) => p.exists === false);
  const unconfirmed = profiles.filter((p) => p.exists && !p.domainVerified && !p.linksBack);
  const confirmed = profiles.filter((p) => p.exists && (p.domainVerified || p.linksBack));
  const unchecked = profiles.filter((p) => p.checked === false);
  const findings: Result[] = [];

  if (missing.length) {
    findings.push({
      severity: 'issue',
      title: t('Social account not found: {count}', { count: missing.length }),
      detail: t('This site points to {accounts}, which does not exist', {
        accounts: missing.map(label).join(', '),
      }),
    });
  }
  if (unconfirmed.length) {
    findings.push({
      severity: 'warning',
      title: t('Unconfirmed social accounts: {count}', { count: unconfirmed.length }),
      detail: t('{accounts} does not link back to this site', {
        accounts: unconfirmed.map(label).join(', '),
      }),
    });
  }
  if (!findings.length && confirmed.length && !unchecked.length) {
    findings.push({ severity: 'pass', title: t('Social accounts link back to this site') });
  }
  return findings;
};

export default socialPresence;
