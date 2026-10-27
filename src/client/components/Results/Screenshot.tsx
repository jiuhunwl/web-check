import { Card } from 'client/components/Form/Card';
import { useT } from 'client/i18n';

const cardStyles = `
  overflow: auto;
  max-height: 50rem;
  grid-row: span 2;
  img {
    border-radius: 6px;
    width: 100%;
    margin: 0.5rem 0;
  }
`;

const ScreenshotCard = (props: {
  data: { image?: string; data?: string };
  title: string;
  actionButtons: any;
}): JSX.Element => {
  const t = useT();
  const screenshot = props.data;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons} styles={cardStyles}>
      {screenshot.image && (
        <img src={`data:image/png;base64,${screenshot.image}`} alt={t('Full page screenshot')} />
      )}
      {!screenshot.image && screenshot.data && (
        <img src={screenshot.data} alt={t('Full page screenshot')} />
      )}
    </Card>
  );
};

export default ScreenshotCard;
