import { Card, Note } from 'client/components/Form/Card';
import Row from 'client/components/Form/Row';
import { useT } from 'client/i18n';
import { formatNumber } from 'client/utils/format';

const ArchivesCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const data = props.data;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      <Row lbl={t('First Scan')} val={data.firstScan} />
      <Row lbl={t('Last Scan')} val={data.lastScan} />
      <Row lbl={t('Days Archived')} val={formatNumber(data.daysArchived)} />
      <Row lbl={t('Change Count')} val={formatNumber(data.changeCount)} />
      <Row
        lbl={t('Avg Size')}
        val={t('{value} bytes', { value: formatNumber(data.averagePageSize) })}
      />
      <Row
        lbl={t('Avg Days between Archives')}
        val={formatNumber(data.scanFrequency.daysBetweenScans)}
      />

      <Note>
        {t('View historical versions of this page')}{' '}
        <a rel="noreferrer" target="_blank" href={`https://web.archive.org/web/*/${data.scanUrl}`}>
          {t('here')}
        </a>
        {t(", via the Internet Archive's Wayback Machine.")}
      </Note>
    </Card>
  );
};

export default ArchivesCard;
