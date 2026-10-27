import type { Analyzer, Severity } from '../types';
import { t } from '@/i18n';

const LABELS: Record<string, string> = {
  performance: 'Performance',
  accessibility: 'Accessibility',
  'best-practices': 'Best Practices',
  seo: 'SEO',
};

// Convert a 0..1 lighthouse score to a severity bucket
export const scoreSeverity = (score: number): Severity => {
  if (score >= 0.9) return 'pass';
  if (score >= 0.7) return 'info';
  if (score >= 0.5) return 'warning';
  return 'issue';
};

// One finding per Lighthouse category, mirroring the score colour
const quality: Analyzer = (d) => {
  const cats = d?.categories;
  if (!cats || typeof cats !== 'object') return [];
  const out: ReturnType<Analyzer> = [];
  for (const [key, label] of Object.entries(LABELS)) {
    const score = cats[key]?.score;
    if (typeof score !== 'number') continue;
    const pct = Math.round(score * 100);
    out.push({
      severity: scoreSeverity(score),
      title: t('{category} score: {pct}', { category: t(label), pct }),
      detail:
        score < 0.9
          ? t('Lighthouse flagged {category} as below recommended', {
              category: t(label).toLowerCase(),
            })
          : undefined,
    });
  }
  return out;
};

export default quality;
