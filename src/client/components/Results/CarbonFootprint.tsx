import { Card, Note } from 'client/components/Form/Card';
import Row from 'client/components/Form/Row';
import { useT } from 'client/i18n';
import { formatNumber } from 'client/utils/format';

type Translate = (key: string, vars?: Record<string, string | number | undefined | null>) => string;

// Fixed decimals, with the locale's separators
const fixed = (n: number, digits: number) => formatNumber(n, { digits });

const formatBytes = (n: number, t: Translate): string => {
  if (n >= 1048576) return `${fixed(n / 1048576, 2)} MB`;
  if (n >= 1024) return `${fixed(n / 1024, 2)} KB`;
  return t('{value} bytes', { value: fixed(n, 0) });
};

const formatGrams = (g: number): string => {
  if (g >= 1000) return `${fixed(g / 1000, 2)} kg`;
  if (g >= 1) return `${fixed(g, 2)} g`;
  return `${fixed(g * 1000, 2)} mg`;
};

const formatKwh = (kwh: number): string => {
  if (kwh >= 1) return `${fixed(kwh, 3)} kWh`;
  if (kwh >= 0.001) return `${fixed(kwh * 1000, 3)} Wh`;
  return `${fixed(kwh * 1_000_000, 2)} mWh`;
};

const CarbonCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const carbons = props.data.statistics;
  const cleanerThan = props.data.cleanerThan;

  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {!carbons?.adjustedBytes && <p>{t('Unable to calculate carbon footprint for host')}</p>}
      {carbons?.adjustedBytes > 0 && (
        <>
          {props.data.bytes > 0 && (
            <Row lbl={t('HTML Initial Size')} val={formatBytes(props.data.bytes, t)} />
          )}
          <Row lbl={t('Adjusted Transfer Size')} val={formatBytes(carbons.adjustedBytes, t)} />
          <Row lbl={t('CO2 for Initial Load')} val={formatGrams(carbons.co2.grid.grams)} />
          <Row lbl={t('Energy Usage for Load')} val={formatKwh(carbons.energy)} />
          {cleanerThan > 0 && (
            <Row lbl={t('Cleaner than average page (est.)')} val={`${cleanerThan}%`} />
          )}
        </>
      )}
      <Note>
        {t('Calculated using the')}{' '}
        <a
          href="https://sustainablewebdesign.org/estimating-digital-emissions"
          target="_blank"
          rel="noreferrer"
        >
          Sustainable Web Model v4
        </a>
      </Note>
    </Card>
  );
};

export default CarbonCard;
