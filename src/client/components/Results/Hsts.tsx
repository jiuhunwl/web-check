import { Card } from 'client/components/Form/Card';
import Row from 'client/components/Form/Row';
import { useT } from 'client/i18n';
import { MIN_MAX_AGE, parseHsts } from 'client/analysis/rules/hsts';
import { formatNumber } from 'client/utils/format';

const HstsCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const { hstsHeader, message } = props.data;
  const { maxAge, includeSubDomains, preload } = parseHsts(hstsHeader || '');
  const days = Math.round(maxAge / 86400);

  // The verdict is worded by the handler, so it only needs translating. Its
  // max-age variant carries numbers, which travel as placeholders.
  const localizeVerdict = (verdict: string): string => {
    const aged = /^HSTS max-age is (\d+), below the (\d+) minimum\.$/.exec(verdict);
    if (!aged) return t(verdict);
    return t('HSTS max-age is {maxAge}, below the {min} minimum.', {
      maxAge: formatNumber(Number(aged[1])),
      min: formatNumber(Number(aged[2])),
    });
  };

  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      <Row
        lbl={t('HSTS Enabled?')}
        val={!!hstsHeader}
        yes={t('Yes')}
        no={t('No')}
        term="strict-transport-security"
      />
      {hstsHeader && (
        <>
          <Row
            lbl="max-age"
            val={t('{count} days', { count: formatNumber(days) })}
            status={maxAge >= MIN_MAX_AGE ? 'pass' : 'warning'}
            title={t('{count} seconds', { count: formatNumber(maxAge) })}
            term="hsts-max-age"
          />
          <Row
            lbl="includeSubDomains"
            val={includeSubDomains}
            yes={t('Yes')}
            no={t('No')}
            status={includeSubDomains ? 'pass' : 'warning'}
            term="hsts-include-subdomains"
          />
          <Row
            lbl="preload"
            val={preload}
            yes={t('Yes')}
            no={t('No')}
            status={preload ? 'pass' : 'info'}
            term="hsts-preload"
          />
        </>
      )}
      {message && <p>{localizeVerdict(message)}</p>}
    </Card>
  );
};

export default HstsCard;
