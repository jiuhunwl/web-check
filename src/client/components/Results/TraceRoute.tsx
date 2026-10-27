import styled from '@emotion/styled';
import colors from 'client/styles/colors';
import { Card } from 'client/components/Form/Card';
import { useT } from 'client/i18n';

const RouteRow = styled.div`
  text-align: center;
  width: fit-content;
  margin: 0 auto;
  .ipName {
    font-size: 1rem;
  }
`;

const RouteTimings = styled.div`
  p {
    margin: 0 auto;
  }
  .arrow {
    font-size: 2.5rem;
    color: ${colors.primary};
    margin-top: -1rem;
  }
  .times {
    font-size: 0.85rem;
    color: ${colors.textColorSecondary};
  }
  .completed {
    text-align: center;
    font-weight: bold;
  }
`;

const TraceRouteCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const traceRouteResponse = props.data;
  const routes = traceRouteResponse.result;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      {routes
        .filter((x: any) => x)
        .map((route: any, index: number) => (
          <RouteRow key={index}>
            <span className="ipName">{Object.keys(route)[0]}</span>
            <RouteTimings>
              {route[Object.keys(route)[0]].map((time: any, packetIndex: number) => (
                <p className="times" key={`timing-${packetIndex}-${time}`}>
                  {route[Object.keys(route)[0]].length > 1 && (
                    <>{t('Packet #{packet}:', { packet: packetIndex + 1 })} </>
                  )}
                  {t('Took {time} ms', { time })}
                </p>
              ))}
              <p className="arrow">↓</p>
            </RouteTimings>
          </RouteRow>
        ))}
      <RouteTimings>
        <p className="completed">
          {t('Round trip completed in {time} ms', { time: traceRouteResponse.timeTaken })}
        </p>
      </RouteTimings>
    </Card>
  );
};

export default TraceRouteCard;
