import styled from '@emotion/styled';
import type { ServerLocation } from 'client/utils/result-processor';
import { Card } from 'client/components/Form/Card';
import LocationMap from 'client/components/misc/LocationMap';
import Flag from 'client/components/misc/Flag';
import { TextSizes } from 'client/styles/typography';
import colors from 'client/styles/colors';
import Row, { StyledRow } from 'client/components/Form/Row';
import { useT } from 'client/i18n';

const SmallText = styled.span`
  color: ${colors.textColorTertiary};
  font-size: ${TextSizes.xSmall};
  text-align: right;
  display: block;
`;

const MapRow = styled(StyledRow)`
  padding-top: 1rem;
  flex-direction: column;
`;

const CountryValue = styled.span`
  display: flex;
  gap: 0.5rem;
`;

const ServerLocationCard = (props: {
  data: ServerLocation;
  title: string;
  actionButtons: any;
}): JSX.Element => {
  const t = useT();
  const location = props.data;
  const { city, region, country, postCode, countryCode, coords, isp, asn, timezone } = location;

  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {(postCode || city || region) && (
        <Row lbl={t('City')} val={[postCode, city, region].filter(Boolean).join(', ')} />
      )}
      {country && (
        <Row>
          <span className="lbl">{t('Country')}</span>
          <CountryValue>
            {country}
            {countryCode && <Flag countryCode={countryCode} width={28} />}
          </CountryValue>
        </Row>
      )}
      {timezone && <Row lbl={t('Timezone')} val={timezone} />}
      {isp && <Row lbl={t('Network')} val={isp} />}
      {asn && <Row lbl="ASN" val={`AS${asn}`} link={`https://bgp.he.net/AS${asn}`} />}
      <MapRow>
        <LocationMap
          lat={coords.latitude}
          lon={coords.longitude}
          label={t('Server ({isp})', { isp })}
        />
        <SmallText>
          {t('Latitude: {lat}, Longitude: {lon}', {
            lat: coords.latitude,
            lon: coords.longitude,
          })}{' '}
        </SmallText>
      </MapRow>
    </Card>
  );
};

export default ServerLocationCard;
