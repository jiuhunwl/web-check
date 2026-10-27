import { Card } from 'client/components/Form/Card';
import Row, { ExpandableRow } from 'client/components/Form/Row';
import { fromFinding } from 'client/components/misc/Icon';
import { useT } from 'client/i18n';
import robotsTxt, { AI_CRAWLERS, blocksCrawler } from 'client/analysis/rules/robots-txt';

const cardStyles = `
  grid-row: span 2;
`;

const RobotsTxtCard = (props: {
  data: { robots: { lbl: string; val: string }[]; llmsTxt?: boolean };
  title: string;
  actionButtons: any;
}): JSX.Element => {
  const t = useT();
  const { data } = props;
  const robots = data?.robots || [];
  const crawlers = AI_CRAWLERS.map((name) => ({
    lbl: name,
    val: blocksCrawler(robots, name) ? 'Blocked' : 'Allowed',
  }));
  const blocked = crawlers.filter((crawler) => crawler.val === 'Blocked').length;
  const [googleBlocked] = robotsTxt(data);

  return (
    <Card heading={props.title} actionButtons={props.actionButtons} styles={cardStyles}>
      {robots.length === 0 && <p>{t('No crawl rules found.')}</p>}
      {robots.length > 0 && (
        <>
          <Row
            lbl={t('Google Search')}
            val={t(googleBlocked ? 'Blocked' : 'Allowed')}
            term="search-crawling"
            {...fromFinding(googleBlocked)}
          />
          <ExpandableRow
            lbl={t('AI Crawlers Blocked')}
            val={t('{blocked} of {total}', { blocked, total: crawlers.length })}
            rowList={crawlers.map((crawler) => ({ ...crawler, val: t(crawler.val) }))}
          />
        </>
      )}
      {typeof data?.llmsTxt === 'boolean' && (
        <Row lbl="llms.txt" val={data.llmsTxt ? t('Found') : t('Not found')} />
      )}
      {robots.map((row, index) => {
        return <Row key={`${row.lbl}-${index}`} lbl={row.lbl} val={row.val} />;
      })}
    </Card>
  );
};

export default RobotsTxtCard;
