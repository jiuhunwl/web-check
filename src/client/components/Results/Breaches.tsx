import { Card, Note } from 'client/components/Form/Card';
import Row, { ExpandableRow } from 'client/components/Form/Row';
import { fromFinding } from 'client/components/misc/Icon';
import { useT } from 'client/i18n';
import checkBreaches from 'client/analysis/rules/breaches';
import { formatNumber } from 'client/utils/format';

const BreachesCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const { domain, breaches = [] } = props.data;
  const [result] = checkBreaches(props.data);
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      <Row lbl={t('Domain')} val={domain} />
      <Row
        lbl={t('Breaches')}
        val={breaches.length || t('None')}
        term="data-breach"
        {...fromFinding(result)}
      />
      {breaches.map((breach: any) => (
        <ExpandableRow
          key={breach.name}
          lbl={breach.title}
          val={t('{count} accounts', { count: formatNumber(breach.accounts) })}
          rowList={[
            { lbl: t('Breach Date'), val: breach.date },
            { lbl: t('Site'), val: breach.domain },
            { lbl: t('Verified'), val: breach.verified ? t('Yes') : t('No') },
            { lbl: t('Data Exposed'), listResults: breach.exposed },
            { lbl: t('Details'), plaintext: breach.description },
          ]}
        />
      ))}
      <Note>
        {t('Source:')}{' '}
        <a href="https://haveibeenpwned.com/" target="_blank" rel="noreferrer">
          Have I Been Pwned
        </a>
      </Note>
    </Card>
  );
};

export default BreachesCard;
