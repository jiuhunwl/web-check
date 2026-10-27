import { Card } from 'client/components/Form/Card';
import Row, { ListRow, Section, type RowProps } from 'client/components/Form/Row';
import { fromFinding } from 'client/components/misc/Icon';
import { useT } from 'client/i18n';
import type { Result } from 'client/analysis/types';
import {
  checkSpf,
  checkDmarc,
  checkSubdomainDmarc,
  checkDkim,
  checkMtaSts,
  checkTlsRpt,
  findRecords,
  mxHosts,
  sendsNoMail,
  type MailData,
} from 'client/analysis/rules/mail-config';

type Translate = (key: string, vars?: Record<string, string | number | undefined | null>) => string;

// Whether a record exists, or Invalid when it exists but fails, with the check's status
const checkRow = (found: boolean, check: Result, t: Translate): RowProps => {
  const { status, reason } = fromFinding(check);
  return { val: found && status === 'error' ? t('Invalid') : found, status, reason };
};

// An optional record as Yes, or Not set up with any status its absence gets
const optional = (found: boolean, t: Translate, check?: Result | null): RowProps =>
  found ? { val: true } : { val: t('Not set up'), ...fromFinding(check) };

// DKIM as a check, or why no key was found
const dkimStatus = (d: MailData, t: Translate): RowProps => {
  const found = !!d.dkim?.length;
  const row = checkRow(found, checkDkim(d), t);
  return found ? row : { ...row, val: sendsNoMail(d) ? t('Not needed') : t('Not found') };
};

// MTA-STS as a check, or its mode while the policy is only being tested
const mtaStsStatus = (d: MailData, t: Translate): RowProps => {
  const check = checkMtaSts(d)!;
  if (!d.mtaSts) return optional(false, t, check);
  if (!d.mtaSts.mode) return { ...checkRow(true, check, t), val: t('Unreadable') };
  if (check.severity === 'info')
    return { val: t('Mode: {mode}', { mode: d.mtaSts.mode }), ...fromFinding(check) };
  return checkRow(true, check, t);
};

const MailConfigCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const mailServer = props.data;
  const txt = mailServer.txtRecords || [];
  const hasRecord = (prefix: string) => findRecords(txt, prefix).length > 0;
  const senders = (findRecords(txt, 'v=spf1')[0] || '')
    .split(' ')
    .map((term) => term.split('include:')[1])
    .filter(Boolean);
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      <Section title={t('Mail Security Checklist')}>
        <Row
          lbl="SPF"
          term="spf"
          {...checkRow(hasRecord('v=spf1'), checkSpf(mailServer), t)}
          yes={t('Yes')}
          no={t('No')}
        />
        <Row lbl="DKIM" term="dkim" {...dkimStatus(mailServer, t)} yes={t('Yes')} no={t('No')} />
        <Row
          lbl="DMARC"
          term="dmarc"
          {...checkRow(
            hasRecord('v=DMARC1'),
            checkSubdomainDmarc(mailServer) || checkDmarc(mailServer),
            t,
          )}
          yes={t('Yes')}
          no={t('No')}
        />
        <Row
          lbl="BIMI"
          term="bimi"
          {...optional(hasRecord('v=BIMI1'), t)}
          yes={t('Yes')}
          no={t('No')}
        />
        {mxHosts(mailServer).length > 0 && (
          <>
            <Row
              lbl="MTA-STS"
              term="mta-sts"
              {...mtaStsStatus(mailServer, t)}
              yes={t('Yes')}
              no={t('No')}
            />
            <Row
              lbl="TLS-RPT"
              term="tls-rpt"
              {...optional(hasRecord('v=TLSRPTv1'), t, checkTlsRpt(mailServer))}
              yes={t('Yes')}
              no={t('No')}
            />
            <Row
              lbl="DANE"
              term="dane"
              {...optional(mailServer.dane?.length > 0, t)}
              yes={t('Yes')}
              no={t('No')}
            />
          </>
        )}
      </Section>
      {mailServer.mxRecords?.length > 0 && (
        <Section title={t('MX Records')}>
          {mailServer.mxRecords.map((record: any, index: number) => (
            <Row
              key={index}
              lbl={record.exchange || t('Null MX, accepts no mail')}
              val={record.exchange && t('Priority: {priority}', { priority: record.priority })}
            />
          ))}
        </Section>
      )}
      {mailServer.mailServices?.length > 0 && (
        <Section title={t('External Mail Services')}>
          {mailServer.mailServices.map((service: any, index: number) => (
            <Row key={index} lbl={service.provider} title={service.value} />
          ))}
        </Section>
      )}
      {senders.length > 0 && <ListRow title={t('Authorised Senders')} list={senders} />}
      {txt.length > 0 && (
        <Section title={t('Mail-related TXT Records ({count})', { count: txt.length })} collapsible>
          {txt.map((record: string[], index: number) => (
            <Row key={index}>{record.join('')}</Row>
          ))}
        </Section>
      )}
    </Card>
  );
};

export default MailConfigCard;
