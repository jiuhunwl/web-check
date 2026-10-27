import { Card } from 'client/components/Form/Card';
import Row, { type RowProps } from 'client/components/Form/Row';
import { fromFindings } from 'client/components/misc/Icon';
import { useT } from 'client/i18n';
import { HEADERS, checkHeader, hasFrameAncestors } from 'client/analysis/rules/http-security';
import type { TermId } from '@/data/glossary';

type Translate = (key: string, vars?: Record<string, string | number | undefined | null>) => string;

const cardStyles = `
  span.lbl { flex: none !important; }
  span.val { flex: 1 1 auto !important; max-width: none !important; }
`;

// The glossary term behind each header
const TERMS: Record<string, TermId> = {
  contentSecurityPolicy: 'content-security-policy',
  strictTransportPolicy: 'strict-transport-security',
  xContentTypeOptions: 'x-content-type-options',
  xFrameOptions: 'x-frame-options',
  referrerPolicy: 'referrer-policy',
  permissionsPolicy: 'permissions-policy',
  crossOriginOpenerPolicy: 'cross-origin-opener-policy',
  crossOriginResourcePolicy: 'cross-origin-resource-policy',
  crossOriginEmbedderPolicy: 'cross-origin-embedder-policy',
  xXSSProtection: 'x-xss-protection',
};

// A header's value, with the status and any problems from its findings
const showHeader = (d: any, key: string, t: Translate): RowProps => ({
  val: d[key] || (key === 'xFrameOptions' && hasFrameAncestors(d) ? t('Via CSP') : t('No')),
  term: TERMS[key],
  ...fromFindings(checkHeader(d, key)),
});

const HttpSecurityCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const d = props.data;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons} styles={cardStyles}>
      {Object.entries(HEADERS).map(
        ([key, label]) =>
          (d[key] || key !== 'xXSSProtection') && (
            <Row key={key} lbl={label} {...showHeader(d, key, t)} />
          ),
      )}
    </Card>
  );
};

export default HttpSecurityCard;
