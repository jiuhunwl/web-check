import { Card } from 'client/components/Form/Card';
import Row from 'client/components/Form/Row';
import { useT } from 'client/i18n';

const BlockListsCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const blockLists = props.data.blocklists;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {blockLists.map((blocklist: any, blockIndex: number) => (
        <Row
          title={blocklist.serverIp}
          lbl={blocklist.server}
          val={!blocklist.isBlocked}
          yes={t('Not Blocked')}
          no={t('Blocked')}
          term="dns-blocklist"
          key={`blocklist-${blockIndex}-${blocklist.serverIp}`}
        />
      ))}
    </Card>
  );
};

export default BlockListsCard;
