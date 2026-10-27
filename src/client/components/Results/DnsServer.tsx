import { Card } from 'client/components/Form/Card';
import Row, { Section } from 'client/components/Form/Row';
import { useT } from 'client/i18n';

const DnsServerCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const dnsSecurity = props.data;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {dnsSecurity.zone && <Row lbl={t('Zone')} val={dnsSecurity.zone} />}
      {dnsSecurity.dns.map((dns: any, index: number) => (
        <Section
          key={index}
          title={dnsSecurity.dns.length > 1 && t('DNS Server #{number}', { number: index + 1 })}
        >
          <Row lbl={t('Hostname')} val={dns.hostname} />
          {dns.address && <Row lbl={t('IP Address')} val={dns.address} />}
        </Section>
      ))}
    </Card>
  );
};

export default DnsServerCard;
