import { Card, Note } from 'client/components/Form/Card';
import Row from 'client/components/Form/Row';
import { useT } from 'client/i18n';

const FirewallCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const data = props.data;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      <Row
        lbl={t('Firewall')}
        val={data.hasWaf ? t('Yes') : t('No*')}
        status={data.hasWaf ? 'pass' : 'warning'}
        term="waf"
      />
      {data.waf && <Row lbl="WAF" val={data.waf} />}
      {!data.hasWaf && (
        <Note>
          {t(
            '*The domain may be protected with a proprietary or custom WAF which we were unable to identify automatically',
          )}
        </Note>
      )}
    </Card>
  );
};

export default FirewallCard;
