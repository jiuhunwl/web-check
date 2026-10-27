import { Card } from 'client/components/Form/Card';
import Row, { Section } from 'client/components/Form/Row';
import { toStatus, type Status } from 'client/components/misc/Icon';
import { useT } from 'client/i18n';
import { protocolSeverity } from 'client/analysis/rules/tls-connection';
import { REASONS } from 'client/analysis/rules/ssl';
import type { TermId } from '@/data/glossary';

// Each TLS version, with its status when enabled and when disabled
const VERSIONS: { id: string; label: string; on?: Status; off?: Status; term?: TermId }[] = [
  { id: 'TLSv1.3', label: 'TLS 1.3', on: 'pass', off: 'info', term: 'tls-1-3' },
  { id: 'TLSv1.2', label: 'TLS 1.2' },
  { id: 'TLSv1.1', label: 'TLS 1.1', on: 'error', off: 'pass', term: 'legacy-tls' },
  { id: 'TLSv1', label: 'TLS 1.0', on: 'error', off: 'pass', term: 'legacy-tls' },
];

const formatEphemeralKey = (k: any, t: ReturnType<typeof useT>): string => {
  if (!k?.type) return '';
  const parts = [k.type];
  if (k.name) parts.push(`(${k.name})`);
  if (k.size) parts.push(t('{size}-bit', { size: k.size }));
  return parts.join(' ');
};

const TlsConnectionCard = (props: {
  data: any;
  title: string;
  actionButtons: any;
}): JSX.Element => {
  const t = useT();
  const d = props.data || {};
  const cipherName = d.cipher?.standardName || d.cipher?.name || '';
  const ephemeral = formatEphemeralKey(d.ephemeralKey, t);
  const severity = protocolSeverity(d.protocol || '');
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {d.protocol && (
        <Row
          lbl={t('Protocol')}
          val={d.protocol}
          status={severity && toStatus(severity)}
          term="tls-version"
        />
      )}
      {cipherName && <Row lbl={t('Cipher Suite')} val={cipherName} />}
      {d.cipher?.version && <Row lbl={t('Cipher Version')} val={d.cipher.version} />}
      {ephemeral && <Row lbl={t('Ephemeral Key')} val={ephemeral} />}
      {d.alpnProtocol && (
        <Row
          lbl="ALPN"
          val={d.alpnProtocol}
          status={d.alpnProtocol === 'h2' ? 'pass' : undefined}
          term="http2"
        />
      )}
      <Row
        lbl={t('Forward Secrecy')}
        val={!!d.forwardSecrecy}
        status={d.forwardSecrecy ? 'pass' : 'warning'}
        term="forward-secrecy"
      />
      <Row
        lbl={t('Session Resumption')}
        val={!!d.sessionResumption}
        status={d.sessionResumption ? 'pass' : 'info'}
        term="session-resumption"
      />
      <Row
        lbl={t('OCSP Stapling')}
        val={d.ocspStapled ? t('Present') : t('Not Present')}
        status={d.ocspStapled ? 'pass' : 'info'}
        term="ocsp-stapling"
      />
      <Row
        lbl={t('Certificate Trust')}
        val={!!d.authorized}
        yes={t('Trusted')}
        no={d.authError || t('Untrusted')}
        reason={REASONS[d.authError]}
        term="certificate-trust"
      />
      {d.versions && (
        <Section title={t('TLS Versions')}>
          {VERSIONS.map((version) => {
            const enabled = d.versions.includes(version.id);
            return (
              <Row
                key={version.id}
                lbl={version.label}
                val={enabled ? t('Enabled') : t('Disabled')}
                status={enabled ? version.on : version.off}
                term={version.term}
              />
            );
          })}
        </Section>
      )}
    </Card>
  );
};

export default TlsConnectionCard;
