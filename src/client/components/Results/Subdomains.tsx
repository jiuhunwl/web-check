import { Card, Note } from 'client/components/Form/Card';
import Row from 'client/components/Form/Row';
import { useT } from 'client/i18n';
import { formatNumber } from 'client/utils/format';

const SubdomainsCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const { domain, count, truncated, subdomains = [], source } = props.data;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      <Row lbl={t('Base Domain')} val={domain} />
      <Row lbl={t('Subdomains Found')} val={formatNumber(count)} />
      {truncated && (
        <Row
          lbl={t('Showing')}
          val={t('First {count}', { count: formatNumber(subdomains.length) })}
        />
      )}
      {subdomains.map((sub: string) => (
        <Row key={sub}>
          <a href={`https://${sub}`} target="_blank" rel="noreferrer">
            {sub}
          </a>
        </Row>
      ))}
      {source && <Note>{t('Source: Certificate Transparency logs via {source}', { source })}</Note>}
    </Card>
  );
};

export default SubdomainsCard;
