import { Card } from 'client/components/Form/Card';
import Row, { ExpandableRow, ListRow } from 'client/components/Form/Row';
import { fromFinding } from 'client/components/misc/Icon';
import { useT } from 'client/i18n';
import { REASONS, checkExpiry } from 'client/analysis/rules/ssl';
import { formatNumber } from 'client/utils/format';

function getExtendedKeyUsage(oids: string[], t: ReturnType<typeof useT>) {
  const oidMap: { [key: string]: string } = {
    '1.3.6.1.5.5.7.3.1': 'TLS Web Server Authentication',
    '1.3.6.1.5.5.7.3.2': 'TLS Web Client Authentication',
    '1.3.6.1.5.5.7.3.3': 'Code Signing',
    '1.3.6.1.5.5.7.3.4': 'Email Protection (SMIME)',
    '1.3.6.1.5.5.7.3.8': 'Time Stamping',
    '1.3.6.1.5.5.7.3.9': 'OCSP Signing',
    '1.3.6.1.5.5.7.3.5': 'IPSec End System',
    '1.3.6.1.5.5.7.3.6': 'IPSec Tunnel',
    '1.3.6.1.5.5.7.3.7': 'IPSec User',
    '1.3.6.1.5.5.8.2.2': 'IKE Intermediate',
    '2.16.840.1.113730.4.1': 'Netscape Server Gated Crypto',
    '1.3.6.1.4.1.311.10.3.3': 'Microsoft Server Gated Crypto',
    '1.3.6.1.4.1.311.10.3.4': 'Microsoft Encrypted File System',
    '1.3.6.1.4.1.311.20.2.2': 'Microsoft Smartcard Logon',
    '1.3.6.1.4.1.311.10.3.12': 'Microsoft Document Signing',
    '0.9.2342.19200300.100.1.3': 'Email Address (in Subject Alternative Name)',
  };
  const results = oids.map((oid) => (oidMap[oid] ? t(oidMap[oid]) : oid));
  return results.filter((item, index) => results.indexOf(item) === index);
}

// Days from a certificate's issue to its expiry
const lifetime = ({ valid_from, valid_to }: any) =>
  Math.round((Date.parse(valid_to) - Date.parse(valid_from)) / 86_400_000);

// Key type and size, like "RSA 2048-bit" or "EC 256-bit (P-256)"
const describeKey = ({ bits, modulus, asn1Curve, nistCurve }: any, t: ReturnType<typeof useT>) => {
  if (!bits) return '';
  if (modulus) return t('RSA {bits}-bit', { bits });
  const curve = nistCurve || asn1Curve;
  return curve ? t('EC {bits}-bit ({curve})', { bits, curve }) : t('{bits}-bit', { bits });
};

const SslCertCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const sslCert = props.data;
  const { subject, issuer, fingerprint, serialNumber, valid_to, valid_from, ext_key_usage } =
    sslCert;
  const key = describeKey(sslCert, t);
  const days = lifetime(sslCert);
  const altNames = (sslCert.subjectaltname || '')
    .split(', ')
    .map((name: string) => name.replace(/^[^:]+:/, ''))
    .filter(Boolean);
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {subject && <Row lbl={t('Subject')} val={subject.CN} />}
      {issuer?.O && <Row lbl={t('Issuer')} val={issuer.O} />}
      {typeof sslCert.isValid === 'boolean' && (
        <Row
          lbl={t('Trusted')}
          val={sslCert.isValid}
          no={t('No ({error})', { error: sslCert.authError })}
          reason={REASONS[sslCert.authError]}
          term="certificate-trust"
        />
      )}
      {key && <Row lbl={t('Public Key')} val={key} />}
      {valid_to && (
        <Row
          lbl={t('Expires')}
          val={valid_to}
          term="certificate-expiry"
          {...fromFinding(checkExpiry(valid_to))}
        />
      )}
      {valid_from && <Row lbl={t('Renewed')} val={valid_from} />}
      {days > 0 && (
        <Row lbl={t('Lifetime')} val={t('{count} days', { count: formatNumber(days) })} />
      )}
      {serialNumber && <Row lbl={t('Serial Num')} val={serialNumber} />}
      {fingerprint && <Row lbl={t('Fingerprint')} val={fingerprint} />}
      {altNames.length > 0 && (
        <ExpandableRow
          lbl={t('Alternative Names')}
          val={altNames.length}
          rowList={altNames.map((name: string) => ({ lbl: name }))}
        />
      )}
      {sslCert.chain?.length > 0 && <ListRow title={t('Certificate Chain')} list={sslCert.chain} />}
      {ext_key_usage && (
        <ListRow title={t('Extended Key Usage')} list={getExtendedKeyUsage(ext_key_usage, t)} />
      )}
    </Card>
  );
};

export default SslCertCard;
