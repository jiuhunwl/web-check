import { Card } from 'client/components/Form/Card';
import Row, { ExpandableRow } from 'client/components/Form/Row';
import { useT } from 'client/i18n';
import { getPath } from 'client/utils/result-processor';

// Rows shown when a page is expanded, skipping any the sitemap leaves out
const details = (page: any, t: ReturnType<typeof useT>) =>
  [
    { lbl: t('Last Modified'), val: page.lastmod?.[0] },
    { lbl: t('Change Frequency'), val: page.changefreq?.[0] },
    { lbl: t('Priority'), val: page.priority?.[0] },
  ].filter((row) => row.val);

const SitemapCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const pages = props.data.url || props.data.urlset?.url || [];
  const sitemaps = props.data.sitemapindex?.sitemap || [];
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {pages.map((page: any, index: number) => (
        <ExpandableRow key={index} lbl={getPath(page.loc[0])} rowList={details(page, t)} />
      ))}
      {sitemaps.length > 0 && (
        <p>{t('This site returns a sitemap index, which is a list of sitemaps.')}</p>
      )}
      {sitemaps.map((sitemap: any, index: number) => (
        <Row key={index}>
          <a href={sitemap.loc[0]}>{getPath(sitemap.loc[0])}</a>
        </Row>
      ))}
    </Card>
  );
};

export default SitemapCard;
