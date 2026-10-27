import { Card } from 'client/components/Form/Card';
import Row, { ListRow } from 'client/components/Form/Row';
import { useT } from 'client/i18n';

const styles = `
  grid-row: span 2;
`;

const DnsRecordsCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const dns = props.data;
  const mx = (dns.MX || []).map((r: any) =>
    typeof r === 'string'
      ? r
      : t('{value} (priority {priority})', { value: r.exchange, priority: r.priority }),
  );
  const soa = dns.SOA ? [`${dns.SOA.nsname} (${dns.SOA.hostmaster})`] : [];
  return (
    <Card heading={props.title} actionButtons={props.actionButtons} styles={styles}>
      {dns.A?.length > 0 && <ListRow title="A" list={dns.A} />}
      {dns.AAAA?.length > 0 && <ListRow title="AAAA" list={dns.AAAA} />}
      {mx.length > 0 && <ListRow title="MX" list={mx} />}
      {dns.CNAME?.length > 0 && <ListRow title="CNAME" list={dns.CNAME} />}
      {dns.NS?.length > 0 && <ListRow title="NS" list={dns.NS} />}
      {dns.PTR?.length > 0 && <ListRow title="PTR" list={dns.PTR} />}
      {soa.length > 0 && <ListRow title="SOA" list={soa} />}
      {dns.SRV?.length > 0 && (
        <ListRow
          title="SRV"
          list={dns.SRV.map((r: any) =>
            t('{value} (priority {priority})', {
              value: `${r.name}:${r.port}`,
              priority: r.priority,
            }),
          )}
        />
      )}
      {dns.TXT?.length > 0 && (
        <Row lbl="TXT" val={t('{count} records', { count: dns.TXT.length })} />
      )}
    </Card>
  );
};

export default DnsRecordsCard;
