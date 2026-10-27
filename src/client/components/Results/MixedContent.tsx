import { Card } from 'client/components/Form/Card';
import Row, { ListRow, type RowProps } from 'client/components/Form/Row';
import { fromFindings } from 'client/components/misc/Icon';
import { useT } from 'client/i18n';
import { integrityFindings, mixedFindings } from 'client/analysis/rules/mixed-content';

type Translate = (key: string, vars?: Record<string, string | number | undefined | null>) => string;

// Sum up the mixed content, noting when the page's CSP upgrades it to https
const mixedSummary = (d: any, count: number, t: Translate): RowProps => {
  if (!d.url.startsWith('https:')) return { val: t('N/A, page is HTTP') };
  const result = fromFindings(mixedFindings(d));
  if (!count) return { val: t('None'), ...result };
  return {
    val: d.upgradeInsecureRequests
      ? t('{count} upgraded by CSP', { count })
      : t('{count} found', { count }),
    ...result,
  };
};

const MixedContentCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const { url, upgradeInsecureRequests, integrityPolicy, thirdPartyScripts } = props.data;
  const { active = [], passive = [], forms = [], missingCrossorigin = [] } = props.data;
  const { versioned = [], unversioned = [] } = props.data.missingIntegrity || {};
  const https = url.startsWith('https:');
  const mixed = active.length + passive.length + forms.length;
  const summary = mixedSummary(props.data, mixed, t);
  const unhashed = versioned.length + unversioned.length;
  const lists: [string, string[]][] = [
    ['Insecure Scripts, Styles & Frames', active],
    ['Insecure Images & Media', passive],
    ['Insecure Form Targets', forms],
    ['Versioned Scripts Without SRI', versioned],
    ['Unversioned Scripts Without SRI', unversioned],
    ['SRI Scripts Missing crossorigin', missingCrossorigin],
  ];
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      <Row lbl={t('Page')} val={url} />
      <Row lbl={t('Mixed Content')} term="mixed-content" {...summary} />
      {https && (upgradeInsecureRequests || mixed > 0) && (
        <Row
          lbl={t('Upgrade Insecure Requests')}
          val={upgradeInsecureRequests}
          yes={t('Yes')}
          no={t('No')}
          status={upgradeInsecureRequests ? 'pass' : summary.status}
          term="upgrade-insecure-requests"
        />
      )}
      <Row lbl={t('Third-Party Scripts in HTML')} val={thirdPartyScripts} />
      {thirdPartyScripts > 0 && (
        <Row
          lbl={t('Using SRI')}
          val={t('{done} of {total}', {
            done: thirdPartyScripts - unhashed,
            total: thirdPartyScripts,
          })}
          term="sri"
          {...fromFindings(integrityFindings(props.data))}
        />
      )}
      {integrityPolicy && (
        <Row
          lbl="Integrity-Policy"
          val={unhashed ? t('Blocks {count} script(s)', { count: unhashed }) : t('Enforced')}
          status={unhashed ? 'error' : 'pass'}
          term="integrity-policy"
        />
      )}
      {lists.map(
        ([title, list]) => list.length > 0 && <ListRow key={title} title={t(title)} list={list} />,
      )}
    </Card>
  );
};

export default MixedContentCard;
