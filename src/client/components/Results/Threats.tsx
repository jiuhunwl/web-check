import { Card } from 'client/components/Form/Card';
import Row, { ExpandableRow, Section } from 'client/components/Form/Row';
import { useT } from 'client/i18n';
import { getPath } from 'client/utils/result-processor';
import { formatNumber } from 'client/utils/format';

const convertToDate = (dateString: string): string => {
  const [date, time] = dateString.split(' ');
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute, second] = time.split(':').map(Number);
  const dateObject = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  if (isNaN(dateObject.getTime())) {
    return dateString;
  }
  return dateObject.toString();
};

const MalwareCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const urlHaus = props.data.urlHaus || {};
  const phishTank = props.data.phishTank || {};
  const cloudmersive = props.data.cloudmersive || {};
  const safeBrowsing = props.data.safeBrowsing || {};
  const phished = phishTank.url0?.in_database === 'true' && phishTank.url0?.valid === 'true';
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {!safeBrowsing.error && (
        <Row
          lbl={t('Google Safe Browsing')}
          val={!safeBrowsing.unsafe}
          yes={t('Safe')}
          no={t('Unsafe')}
          term="safe-browsing"
        />
      )}
      {typeof cloudmersive.CleanResult === 'boolean' && (
        <Row
          lbl="Cloudmersive"
          val={cloudmersive.CleanResult}
          yes={t('Safe')}
          no={t('Unsafe')}
          term="threat-scan"
        />
      )}
      {(!cloudmersive.error || safeBrowsing.details) && (
        <Row
          lbl={t('Threat Type')}
          val={safeBrowsing.details?.[0]?.threatType || cloudmersive.WebsiteThreatType || t('None')}
        />
      )}
      {!phishTank.error && (
        <Row
          lbl={t('Phishing Status')}
          val={!phished}
          yes={t('No Phishing Found')}
          no={t('Phishing Identified')}
          term="phishing"
        />
      )}
      {phishTank.url0?.valid === 'true' && phishTank.url0.phish_detail_page && (
        <Row
          lbl={t('Phish Info')}
          val={phishTank.url0.phish_id}
          link={phishTank.url0.phish_detail_page}
        />
      )}
      {urlHaus.query_status === 'no_results' && (
        <Row lbl={t('Malware Status')} val={t('No Malware Found')} status="pass" term="malware" />
      )}
      {urlHaus.query_status === 'ok' && (
        <>
          <Row lbl={t('Status')} val={t('Malware Identified')} status="error" term="malware" />
          <Row lbl={t('First Seen')} val={convertToDate(urlHaus.firstseen)} />
          <Row lbl={t('Bad URLs Count')} val={formatNumber(urlHaus.url_count)} />
        </>
      )}
      {urlHaus.urls && (
        <Section title={t('Reported URLs')} collapsible>
          {urlHaus.urls.map((urlResult: any) => {
            const rows = [
              { lbl: 'ID', val: urlResult.id },
              { lbl: t('Status'), val: urlResult.url_status },
              { lbl: t('Date Added'), val: convertToDate(urlResult.date_added) },
              { lbl: t('Threat Type'), val: urlResult.threat },
              { lbl: t('Reported By'), val: urlResult.reporter },
              {
                lbl: t('Takedown Time'),
                val:
                  urlResult.takedown_time_seconds &&
                  t('{count} seconds', {
                    count: formatNumber(urlResult.takedown_time_seconds),
                  }),
              },
              { lbl: 'Larted', val: urlResult.larted },
              { lbl: t('Tags'), val: (urlResult.tags || []).join(', ') },
              { lbl: t('Reference'), val: urlResult.urlhaus_reference },
              { lbl: t('File Path'), val: urlResult.url },
            ];
            return (
              <ExpandableRow
                key={urlResult.id}
                lbl={`${getPath(urlResult.url)} (${urlResult.id})`}
                rowList={rows}
              />
            );
          })}
        </Section>
      )}
    </Card>
  );
};

export default MalwareCard;
