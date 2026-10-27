import { Card } from 'client/components/Form/Card';
import Row, { ExpandableRow, ListRow, Section } from 'client/components/Form/Row';
import { toStatus } from 'client/components/misc/Icon';
import { useT } from 'client/i18n';
import { FLAGGED } from 'client/analysis/rules/trackers';
import type { TermId } from '@/data/glossary';

// The glossary term for each tracker category that gets a status
const TERMS: Record<string, TermId> = {
  Advertising: 'ad-trackers',
  'Adult Advertising': 'ad-trackers',
  'Site Analytics': 'analytics',
};

const regions = new Intl.DisplayNames(['en'], { type: 'region' });

// Rows shown when a tracker is expanded, skipping any that are unknown
const details = (tracker: any, t: ReturnType<typeof useT>) =>
  [
    { lbl: t('Requests'), val: String(tracker.requests) },
    ...tracker.hosts.map((host: string) => ({ lbl: t('Host'), val: host })),
    { lbl: t('Based In'), val: tracker.country && regions.of(tracker.country) },
    {
      lbl: t('Privacy Policy'),
      val: tracker.privacyPolicy && t('View'),
      link: tracker.privacyPolicy,
    },
  ].filter((row) => row.val);

const TrackersCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const { requests, trackers = [], otherTrackers = [], unknown = [] } = props.data;
  const categories: string[] = [...new Set<string>(trackers.map((t: any) => t.category))];
  const companies = new Set(trackers.map((t: any) => t.company)).size;
  const found = trackers.length + otherTrackers.length + unknown.length;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      <Row lbl={t('Requests Made')} val={requests} />
      {companies > 0 && <Row lbl={t('Companies')} val={companies} />}
      {!found && <Row lbl={t('Third Parties')} val={t('None')} status="pass" term="trackers" />}
      {categories.map((category) => (
        <Section key={category} title={category}>
          {trackers
            .filter((t: any) => t.category === category)
            .map((tracker: any) => (
              <ExpandableRow
                key={tracker.name}
                lbl={tracker.name}
                val={tracker.company}
                status={FLAGGED[category] && toStatus(FLAGGED[category])}
                term={TERMS[category]}
                rowList={details(tracker, t)}
              />
            ))}
        </Section>
      ))}
      {otherTrackers.length > 0 && <ListRow title={t('Other Trackers')} list={otherTrackers} />}
      {unknown.length > 0 && <ListRow title={t('Unrecognised')} list={unknown} />}
    </Card>
  );
};

export default TrackersCard;
