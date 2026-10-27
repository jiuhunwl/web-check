import type { HostNames } from 'client/utils/result-processor';
import { Card } from 'client/components/Form/Card';
import { ListRow } from 'client/components/Form/Row';
import { useT } from 'client/i18n';

const HostNamesCard = (props: {
  data: HostNames;
  title: string;
  actionButtons: any;
}): JSX.Element => {
  const t = useT();
  const hosts = props.data;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {hosts.domains.length > 0 && <ListRow list={hosts.domains} title={t('Domains')} />}
      {hosts.hostnames.length > 0 && <ListRow list={hosts.hostnames} title={t('Hosts')} />}
    </Card>
  );
};

export default HostNamesCard;
