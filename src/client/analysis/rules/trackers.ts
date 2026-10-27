import type { Analyzer, Severity } from '../types';
import { t } from '@/i18n';

// The tracker categories worth flagging, and how much
export const FLAGGED: Record<string, Severity> = {
  Advertising: 'warning',
  'Adult Advertising': 'warning',
  'Site Analytics': 'info',
};

const names = (list: any[]): string => list.map((entry) => entry.name).join(', ');

// Warn on ad trackers, and note any analytics or other tracking the page reports to
const trackers: Analyzer = (d) => {
  const list: any[] = Array.isArray(d.trackers) ? d.trackers : [];
  const others: string[] = Array.isArray(d.otherTrackers) ? d.otherTrackers : [];
  const ads = list.filter((t) => FLAGGED[t.category] === 'warning');
  const analytics = list.filter((t) => FLAGGED[t.category] === 'info');
  const out: ReturnType<Analyzer> = [];
  if (ads.length) {
    out.push({
      severity: 'warning',
      title: t('Loads {count} advertising tracker(s)', { count: ads.length }),
      detail: names(ads),
    });
  }
  if (analytics.length) {
    out.push({
      severity: 'info',
      title: t('Reports to {count} analytics service(s)', { count: analytics.length }),
      detail: names(analytics),
    });
  }
  if (others.length) {
    out.push({
      severity: 'info',
      title: t('Contacts {count} other tracking host(s)', { count: others.length }),
      detail: others.join(', '),
    });
  }
  if (!out.length) out.push({ severity: 'pass', title: t('No trackers found') });
  return out;
};

export default trackers;
