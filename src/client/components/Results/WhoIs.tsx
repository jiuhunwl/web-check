import type { Whois } from 'client/utils/result-processor';
import { Card } from 'client/components/Form/Card';
import Row, { ListRow } from 'client/components/Form/Row';
import { useT } from 'client/i18n';

const WhoIsCard = (props: { data: Whois; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const { created, updated, expires, nameservers } = props.data;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {created && <Row lbl={t('Created')} val={created} />}
      {updated && <Row lbl={t('Updated')} val={updated} />}
      {expires && <Row lbl={t('Expires')} val={expires} />}
      {nameservers && <ListRow title={t('Name Servers')} list={nameservers} />}
    </Card>
  );
};

export default WhoIsCard;
