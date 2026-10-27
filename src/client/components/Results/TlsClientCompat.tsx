import { Card } from 'client/components/Form/Card';
import { ExpandableRow } from 'client/components/Form/Row';
import { useT } from 'client/i18n';

const PROTOCOL_NAMES: Record<number, string> = {
  512: 'SSL 2.0',
  768: 'SSL 3.0',
  769: 'TLS 1.0',
  770: 'TLS 1.1',
  771: 'TLS 1.2',
  772: 'TLS 1.3',
};

const buildTitle = (c: any, t: ReturnType<typeof useT>): string => {
  const platform = c.platform ? ` (${c.platform})` : '';
  const version = c.version ? ` ${c.version}` : '';
  const ref = c.isReference ? ' *' : '';
  return `${c.name || t('Client')}${platform}${version}${ref}`;
};

const optionalRow = (lbl: string, val: any) =>
  val == null || val === '' ? null : { lbl, val: String(val) };

// Per-client fields shown when the simulated handshake succeeded
const successFields = (sim: any, t: ReturnType<typeof useT>) =>
  [
    optionalRow(
      t('Protocol'),
      PROTOCOL_NAMES[sim.protocolId] || (sim.protocolId ? String(sim.protocolId) : null),
    ),
    optionalRow(t('Cipher'), sim.suiteName),
    optionalRow(t('Key Exchange'), sim.kxType),
    optionalRow(t('Key Exchange Strength'), sim.kxStrength),
    optionalRow(t('DH Strength'), sim.dhStrength),
    optionalRow(t('Key Algorithm'), sim.keyAlg),
    optionalRow(t('Key Size'), sim.keySize),
    optionalRow(t('Signature Algorithm'), sim.sigAlg),
    optionalRow(t('Attempts'), sim.attempts > 1 ? sim.attempts : null),
  ].filter(Boolean) as { lbl: string; val: string }[];

// Per-client fields shown when the simulated handshake failed
const failureFields = (sim: any, t: ReturnType<typeof useT>) => {
  const reason =
    sim.alertDescription || sim.errorMessage || t('This client cannot complete the TLS handshake');
  return [{ plaintext: reason }];
};

const TlsClientCompatCard = (props: {
  data: any;
  title: string;
  actionButtons: any;
}): JSX.Element | null => {
  const t = useT();
  const sims = props.data?.endpoints?.[0]?.details?.sims?.results;
  if (!sims?.length) return null;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {sims.map((sim: any, i: number) => {
        const ok = sim.errorCode === 0;
        return (
          <ExpandableRow
            key={`tls-cli-${i}`}
            lbl={buildTitle(sim.client || {}, t)}
            val={ok}
            yes={t('Connects')}
            no={t('Fails')}
            status={ok ? 'pass' : 'warning'}
            term="client-compatibility"
            rowList={ok ? successFields(sim, t) : failureFields(sim, t)}
          />
        );
      })}
    </Card>
  );
};

export default TlsClientCompatCard;
