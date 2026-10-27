import type { ServerInfo } from 'client/utils/result-processor';
import { Card } from 'client/components/Form/Card';
import Row from 'client/components/Form/Row';
import { useT } from 'client/i18n';

const ServerInfoCard = (props: {
  data: ServerInfo;
  title: string;
  actionButtons: any;
}): JSX.Element => {
  const t = useT();
  const info = props.data;
  const { org, asn, isp, os, ports, ip, loc, type } = info;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {org && <Row lbl={t('Organization')} val={org} />}
      {isp && isp !== org && <Row lbl={t('Service Provider')} val={isp} />}
      {os && <Row lbl={t('Operating System')} val={os} />}
      {asn && <Row lbl={t('ASN Code')} val={asn} />}
      {ports && <Row lbl={t('Ports')} val={ports} />}
      {ip && <Row lbl="IP" val={ip} />}
      {type && <Row lbl={t('Type')} val={type} />}
      {loc && <Row lbl={t('Location')} val={loc} />}
    </Card>
  );
};

export default ServerInfoCard;
