import type { Analyzer } from '../types';
import { t } from '@/i18n';

// Any positive hit on a reputable threat feed is critical
const threats: Analyzer = (d) => {
  const out: ReturnType<Analyzer> = [];
  if (d.safeBrowsing?.unsafe) {
    out.push({
      severity: 'critical',
      title: t('Listed by Google Safe Browsing'),
      detail: t('Site flagged for malware, phishing or unwanted software'),
    });
  }
  if (Array.isArray(d.urlHaus?.urls) && d.urlHaus.urls.length) {
    out.push({ severity: 'critical', title: t('Listed on URLhaus malware feed') });
  }
  const phish = d.phishTank?.url0;
  const inDb = phish?.in_database === 'true' || phish?.in_database === true;
  const valid = phish?.valid === 'true' || phish?.valid === true;
  if (inDb && valid) {
    out.push({ severity: 'critical', title: t('Listed on PhishTank') });
  }
  if (d.cloudmersive?.CleanResult === false) {
    out.push({ severity: 'critical', title: t('Cloudmersive flagged this site as unsafe') });
  }
  if (!out.length) out.push({ severity: 'pass', title: t('No threat feed matches') });
  return out;
};

export default threats;
