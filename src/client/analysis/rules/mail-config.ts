import type { Analyzer, Result } from '../types';
import { t } from '@/i18n';
type DkimKey = { selector: string; bits: number | null };

export interface MailData {
  mxRecords?: { exchange: string }[];
  txtRecords?: string[][];
  spfLookups?: number;
  dmarcDomain?: string;
  dkim?: DkimKey[];
  mtaSts?: { mode?: string; mx: string[] };
  dane?: string[];
}

// Join each record's DNS chunks, keeping those that start with the given version tag
export const findRecords = (txtRecords: string[][] = [], prefix: string) =>
  txtRecords
    .map((chunks) => chunks.join(''))
    .filter((record) => record.toLowerCase().startsWith(prefix.toLowerCase()));

// Split a "tag=value; tag=value" record into an object keyed by lowercase tag
const parseTags = (record: string): Record<string, string | undefined> =>
  Object.fromEntries(
    record.split(';').map((part) => {
      const [tag, ...value] = part.split('=');
      return [tag.trim().toLowerCase(), value.join('=').trim()];
    }),
  );

// Whether mail from servers not in the SPF record fails, via -all, ~all or a redirect
const spfFailsUnlisted = (spf: string) => {
  const terms = spf.toLowerCase().split(' ');
  const all = terms.find((term) => ['all', '+all', '-all', '~all', '?all'].includes(term));
  if (all) return all === '-all' || all === '~all';
  return terms.some((term) => term.startsWith('redirect='));
};

// An SPF record of just "v=spf1 -all" says the domain sends no mail
export const sendsNoMail = (d: MailData) => {
  const spf = findRecords(d.txtRecords, 'v=spf1')[0] || '';
  return spf.toLowerCase().split(' ').filter(Boolean).join(' ') === 'v=spf1 -all';
};

const enforced = (policy = '') => ['quarantine', 'reject'].includes(policy.toLowerCase());

export const checkSpf = (d: MailData): Result => {
  const spf = findRecords(d.txtRecords, 'v=spf1');
  if (!spf.length) {
    return {
      severity: 'issue',
      title: t('No SPF record found'),
      detail: t(
        'Publish a v=spf1 TXT record listing the servers allowed to send mail for this domain, or v=spf1 -all if it sends none',
      ),
    };
  }
  if (spf.length > 1) {
    return {
      severity: 'issue',
      title: t('Multiple SPF records found'),
      detail: t('Receivers treat this as an SPF error, so merge them into a single v=spf1 record'),
    };
  }
  if ((d.spfLookups ?? 0) > 10) {
    return {
      severity: 'issue',
      title: t('SPF record needs {count} DNS lookups, over the limit of 10', {
        count: d.spfLookups,
      }),
      detail: t(
        'Receivers stop at 10 and treat SPF as failed. Remove includes you no longer use, or replace some with ip4/ip6 ranges',
      ),
    };
  }
  if (!spfFailsUnlisted(spf[0])) {
    return {
      severity: 'warning',
      title: t("SPF record doesn't fail unlisted senders"),
      detail: t('End the record with -all or ~all so mail from servers it does not list fails SPF'),
    };
  }
  return { severity: 'pass', title: t('SPF record published') };
};

export const checkDmarc = (d: MailData): Result => {
  const dmarc = findRecords(d.txtRecords, 'v=DMARC1');
  if (!dmarc.length) {
    return {
      severity: 'issue',
      title: t('No DMARC record found'),
      detail: t(
        'Publish a v=DMARC1 TXT record on the _dmarc subdomain so receivers can act on spoofed mail',
      ),
    };
  }
  if (dmarc.length > 1) {
    return {
      severity: 'issue',
      title: t('Multiple DMARC records found'),
      detail: t(
        'Receivers ignore DMARC when there is more than one record, so merge them into one',
      ),
    };
  }
  const tags = parseTags(dmarc[0]);
  const tag = d.dmarcDomain && tags.sp ? 'sp' : 'p';
  const policy = tags[tag]?.toLowerCase();
  const from = d.dmarcDomain ? t(' (from {domain})', { domain: d.dmarcDomain }) : '';
  const percent = tags.pct ? Number(tags.pct) : 100;
  if (!enforced(policy)) {
    const next = t('set {tag}=quarantine or {tag}=reject', { tag });
    return {
      severity: 'warning',
      title: t('DMARC policy is monitor-only{from}', { from }),
      detail: tags.rua
        ? t(
            'Mail that fails DMARC is still delivered. Once reports show your own mail passing, {next}',
            {
              next,
            },
          )
        : t(
            'Mail that fails DMARC is still delivered, and no reports are sent. Add rua=mailto:<address> to get reports, then {next}',
            { next },
          ),
    };
  }
  if (percent < 100) {
    return {
      severity: 'warning',
      title: t('DMARC policy only applies to {percent}% of failing mail{from}', {
        percent,
        from,
      }),
      detail: t('Raise pct to 100, or remove it, so the policy applies to all failing mail'),
    };
  }
  return { severity: 'pass', title: t('DMARC policy: {policy}{from}', { policy, from }) };
};

export const checkSubdomainDmarc = (d: MailData): Result | null => {
  const dmarc = findRecords(d.txtRecords, 'v=DMARC1');
  if (dmarc.length !== 1 || d.dmarcDomain) return null;
  const { p, sp } = parseTags(dmarc[0]);
  if (!sp || !enforced(p) || enforced(sp)) return null;
  return {
    severity: 'warning',
    title: t("DMARC policy doesn't cover subdomains"),
    detail: t(
      'sp={policy} lets spoofed mail from subdomains through. Set sp=quarantine or sp=reject, or remove sp so subdomains follow p',
      { policy: sp },
    ),
  };
};

export const checkDkim = (d: MailData): Result => {
  const keys = d.dkim ?? [];
  const names = (list: DkimKey[]) => list.map((key) => key.selector).join(', ');
  const weak = keys.filter((key) => key.bits && key.bits < 1024);
  const short = keys.filter((key) => key.bits === 1024);
  if (!keys.length && sendsNoMail(d)) {
    return { severity: 'pass', title: t("Domain sends no mail, so DKIM isn't needed") };
  }
  if (!keys.length) {
    return {
      severity: 'info',
      title: t('No DKIM key found on common selectors'),
      detail: t(
        "DKIM can use any selector name, so it may be set up under one we don't check. If not, publish a DKIM key so receivers can verify your mail",
      ),
    };
  }
  if (weak.length) {
    return {
      severity: 'issue',
      title: t('DKIM key under 1024 bits ({selectors})', { selectors: names(weak) }),
      detail: t('Receivers ignore signatures from keys this short. Replace it with a 2048-bit key'),
    };
  }
  if (short.length) {
    return {
      severity: 'info',
      title: t('1024-bit DKIM key ({selectors})', { selectors: names(short) }),
      detail: t(
        '2048-bit keys are recommended. Rotate to a 2048-bit key, or ask your mail provider to',
      ),
    };
  }
  return { severity: 'pass', title: t('DKIM key found ({selectors})', { selectors: names(keys) }) };
};

// The hosts that receive this domain's mail, from its MX records
export const mxHosts = (d: MailData) =>
  (d.mxRecords || []).map((record) => record.exchange.toLowerCase()).filter(Boolean);

// True when an MTA-STS mx line covers a host, a leading * standing for one label
const coversHost = (pattern: string, host: string) =>
  pattern.startsWith('*.')
    ? host.split('.').slice(1).join('.') === pattern.slice(2)
    : host === pattern;

export const checkMtaSts = (d: MailData): Result | null => {
  const hosts = mxHosts(d);
  const policy = d.mtaSts;
  if (!hosts.length) return null;
  if (!policy) {
    return {
      severity: 'info',
      title: t('MTA-STS not set up'),
      detail: t('Without it, mail sent to this domain can be forced back to unencrypted delivery'),
    };
  }
  if (!policy.mode) {
    return {
      severity: 'warning',
      title: t('MTA-STS policy is unreadable or invalid'),
      detail: t(
        'Senders need one v=STSv1 record, and a valid mta-sts.<domain>/.well-known/mta-sts.txt',
      ),
    };
  }
  const patterns = policy.mx.map((pattern) => pattern.toLowerCase().replace(/\.$/, ''));
  const missing = hosts.filter((host) => !patterns.some((pattern) => coversHost(pattern, host)));
  if (missing.length && policy.mode !== 'none') {
    return {
      severity: policy.mode === 'enforce' ? 'issue' : 'warning',
      title: t('MTA-STS policy leaves out {hosts}', { hosts: missing.join(', ') }),
      detail: t(
        'Senders refuse to deliver to MX hosts an enforced policy leaves out, so add mx: lines',
      ),
    };
  }
  if (policy.mode !== 'enforce') {
    return {
      severity: 'info',
      title: t('MTA-STS is in {mode} mode', { mode: policy.mode }),
      detail: t('Switch the policy to mode: enforce once TLS reports show mail arriving encrypted'),
    };
  }
  return { severity: 'pass', title: t('MTA-STS policy enforced') };
};

export const checkTlsRpt = (d: MailData): Result | null => {
  if (!d.mtaSts && !d.dane?.length) return null;
  if (findRecords(d.txtRecords, 'v=TLSRPTv1').length) {
    return { severity: 'pass', title: t('TLS-RPT reports set up') };
  }
  return {
    severity: 'info',
    title: t('No TLS-RPT record'),
    detail: t('Publish a v=TLSRPTv1 TXT record on _smtp._tls, to hear when mail to you fails TLS'),
  };
};

const checkDane = (d: MailData): Result | null => {
  const hosts = mxHosts(d);
  if (!d.dane?.length) return null;
  return {
    severity: 'pass',
    title: t('DANE TLSA records on {covered} of {total} MX host(s)', {
      covered: d.dane.length,
      total: hosts.length,
    }),
  };
};

const mailConfig: Analyzer = (d) =>
  [
    checkSpf(d),
    checkDmarc(d),
    checkSubdomainDmarc(d),
    checkDkim(d),
    checkMtaSts(d),
    checkTlsRpt(d),
    checkDane(d),
  ].filter((r) => r !== null);

export default mailConfig;
