import { Card, Note } from 'client/components/Form/Card';
import Row, { ListRow } from 'client/components/Form/Row';
import { fromFinding } from 'client/components/misc/Icon';
import { useT } from 'client/i18n';
import caaRecords from 'client/analysis/rules/caa-records';

type Translate = (key: string, vars?: Record<string, string | number | undefined | null>) => string;

const titles: Record<string, string> = {
  issue: 'Allowed CAs',
  issuewild: 'Allowed CAs for Wildcards',
  iodef: 'Violation Reports',
  contactemail: 'Contact Email',
  contactphone: 'Contact Phone',
};

// Group record values by tag, with the known tags first
const groupByTag = (records: any[], t: Translate) => {
  const groups: Record<string, string[]> = { issue: [], issuewild: [], iodef: [] };
  for (const { tag, value, critical } of records) {
    groups[tag] = [...(groups[tag] || []), critical ? t('{value} (critical)', { value }) : value];
  }
  return Object.entries(groups).filter(([, values]) => values.length);
};

const CaaRecordsCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const { domain, records = [] } = props.data;
  const [finding] = caaRecords(props.data);
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      <Row lbl={t('Domain')} val={domain} />
      <Row
        lbl={t('CAA Records')}
        val={records.length || t('None')}
        term="caa"
        {...fromFinding(finding)}
      />
      {groupByTag(records, t).map(([tag, values]) => (
        <ListRow key={tag} title={t(titles[tag] || tag)} list={values} />
      ))}
      {!records.length && (
        <Note>{t('Without CAA records, any certificate authority can issue for this domain')}</Note>
      )}
    </Card>
  );
};

export default CaaRecordsCard;
