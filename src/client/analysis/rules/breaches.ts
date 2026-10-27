import type { Analyzer } from '../types';
import { t } from '@/i18n';

// Flag any breach HIBP has recorded for the domain, naming the latest
const breaches: Analyzer = (d) => {
  const list: any[] = Array.isArray(d.breaches) ? d.breaches : [];
  if (!list.length) return [{ severity: 'pass', title: t('No known data breaches') }];
  const leakedPasswords = list.some((b) => b.verified && b.exposed?.includes('Passwords'));
  return [
    {
      severity: leakedPasswords ? 'issue' : 'warning',
      title: t('Found in {count} data breach(es)', { count: list.length }),
      detail: leakedPasswords
        ? t(
            'Latest was {title} on {date}. Passwords were exposed, so watch for credential stuffing',
            {
              title: list[0].title,
              date: list[0].date,
            },
          )
        : t('Latest was {title} on {date}', { title: list[0].title, date: list[0].date }),
    },
  ];
};

export default breaches;
