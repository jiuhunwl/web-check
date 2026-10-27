import { Card } from 'client/components/Form/Card';
import Row from 'client/components/Form/Row';
import { useT } from 'client/i18n';

const DomainLookupCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const d = props.data || {};
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {d.domain && <Row lbl={t('Registered Domain')} val={d.domain} />}
      {d.created && <Row lbl={t('Creation Date')} val={d.created} />}
      {d.updated && <Row lbl={t('Updated Date')} val={d.updated} />}
      {d.expires && <Row lbl={t('Registry Expiry Date')} val={d.expires} />}
      {d.registryDomainId && <Row lbl={t('Registry Domain ID')} val={d.registryDomainId} />}
      {d.registrarWhoisServer && (
        <Row lbl={t('Registrar WHOIS Server')} val={d.registrarWhoisServer} />
      )}
      {d.registrar && <Row lbl={t('Registrar')} val={d.registrar} link={d.registrarUrl} />}
      {d.registrarIanaId && <Row lbl={t('Registrar IANA ID')} val={d.registrarIanaId} />}
      {d.dnssec && <Row lbl="DNSSEC" val={d.dnssec} />}
    </Card>
  );
};

export default DomainLookupCard;
