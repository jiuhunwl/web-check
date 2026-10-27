import type { Analyzer } from '../types';
import { t } from '@/i18n';

type Findings = ReturnType<Analyzer>;

// The distinct hostnames in a list of URLs
const hosts = (urls: string[]) => [...new Set(urls.map((url) => new URL(url).hostname))].join(', ');

// Flag http resources on an https page, unless its CSP upgrades them
export const mixedFindings = (d: any): Findings => {
  if (!String(d.url).startsWith('https:')) return [];
  const { active = [], passive = [], forms = [] } = d;
  const count = active.length + passive.length + forms.length;
  if (!count) return [{ severity: 'pass', title: t('No mixed content in the page HTML') }];
  if (d.upgradeInsecureRequests) {
    return [
      {
        severity: 'info',
        title: t('CSP upgrades {count} HTTP URL(s) to HTTPS', { count }),
        detail: t(
          'upgrade-insecure-requests is set, so these only load if the host supports HTTPS',
        ),
      },
    ];
  }
  const out: Findings = [];
  if (active.length) {
    out.push({
      severity: 'issue',
      title: t('Loads {count} script(s), style(s) or frame(s) over HTTP', {
        count: active.length,
      }),
      detail: t('Browsers block these, which can break the page. From {hosts}', {
        hosts: hosts(active),
      }),
    });
  }
  if (passive.length) {
    out.push({
      severity: 'warning',
      title: t('Loads {count} image(s) or media file(s) over HTTP', { count: passive.length }),
      detail: t('Browsers upgrade or block these, old ones load them insecurely. From {hosts}', {
        hosts: hosts(passive),
      }),
    });
  }
  if (forms.length) {
    out.push({
      severity: 'issue',
      title: t('{count} form(s) submit over HTTP', { count: forms.length }),
      detail: t('Anything entered is sent unencrypted, to {hosts}', { hosts: hosts(forms) }),
    });
  }
  return out;
};

// Flag third-party scripts without SRI, and hashed scripts browsers will refuse to run
export const integrityFindings = (d: any): Findings => {
  const { versioned = [], unversioned = [] } = d.missingIntegrity || {};
  const blocked: string[] = d.missingCrossorigin || [];
  const unhashed = [...versioned, ...unversioned];
  const out: Findings = [];
  if (d.integrityPolicy) {
    out.push(
      unhashed.length
        ? {
            severity: 'issue',
            title: t('Integrity-Policy blocks {count} third-party script(s)', {
              count: unhashed.length,
            }),
            detail: t("They have no SRI hash, so browsers won't run them. From {hosts}", {
              hosts: hosts(unhashed),
            }),
          }
        : { severity: 'pass', title: t('Integrity-Policy requires SRI on every script') },
    );
  } else {
    if (versioned.length) {
      out.push({
        severity: 'warning',
        title: t('{count} versioned third-party script(s) without SRI', {
          count: versioned.length,
        }),
        detail: t('Fixed files can take a hash, to stop tampered copies. From {hosts}', {
          hosts: hosts(versioned),
        }),
      });
    }
    if (unversioned.length) {
      out.push({
        severity: 'info',
        title: t('{count} unversioned third-party script(s) without SRI', {
          count: unversioned.length,
        }),
        detail: t('These can change without notice, so SRI would break them. From {hosts}', {
          hosts: hosts(unversioned),
        }),
      });
    }
    if (!unhashed.length && !blocked.length && d.thirdPartyScripts > 0) {
      out.push({
        severity: 'pass',
        title: t('All {count} third-party script(s) use SRI', { count: d.thirdPartyScripts }),
      });
    }
  }
  if (blocked.length) {
    out.push({
      severity: 'issue',
      title: t('{count} script(s) with SRI blocked for missing crossorigin', {
        count: blocked.length,
      }),
      detail: t("Browsers need CORS to check the hash, so won't run these. From {hosts}", {
        hosts: hosts(blocked),
      }),
    });
  }
  return out;
};

// Flag mixed content, and scripts that skip or break SRI
const mixedContent: Analyzer = (d) =>
  Array.isArray(d.missingCrossorigin) ? [...mixedFindings(d), ...integrityFindings(d)] : [];

export default mixedContent;
