import { Card, Note } from 'client/components/Form/Card';
import Row, { Section } from 'client/components/Form/Row';
import { fromFinding } from 'client/components/misc/Icon';
import { useT } from 'client/i18n';
import { getPath } from 'client/utils/result-processor';
import { checkContact, checkExpires, getField } from 'client/analysis/rules/security-txt';

const SecurityTxtCard = (props: { data: any; title: string; actionButtons: any }): JSX.Element => {
  const t = useT();
  const { isPresent, foundIn, isPgpSigned, fields = {}, content } = props.data;
  const contact = checkContact(fields);
  const expires = checkExpires(fields);
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      <Row
        lbl={t('Present')}
        val={!!isPresent}
        status={isPresent ? 'pass' : 'warning'}
        term="security-txt"
      />
      {isPresent && (
        <>
          <Row lbl={t('File Location')} val={foundIn} />
          <Row
            lbl={t('PGP Signed')}
            val={!!isPgpSigned}
            status={isPgpSigned ? 'pass' : 'info'}
            term="security-txt-signature"
          />
          {contact && (
            <Row
              lbl={t('Contact')}
              val={t('Missing')}
              term="security-txt-contact"
              {...fromFinding(contact)}
            />
          )}
          {!getField(fields, 'expires') && (
            <Row
              lbl={t('Expires')}
              val={t('Missing')}
              term="security-txt-expires"
              {...fromFinding(expires)}
            />
          )}
          {Object.entries(fields).map(([field, value]: [string, any]) => {
            const isLink = value.includes('http');
            return (
              <Row
                key={field}
                lbl={field}
                val={isLink ? getPath(value) : value}
                link={isLink ? value : undefined}
                term="security-txt-expires"
                {...fromFinding(field.toLowerCase() === 'expires' ? expires : null)}
              />
            );
          })}
          <Section title={t('View Full Policy')} collapsible>
            <Row plaintext={content} />
          </Section>
        </>
      )}
      {!isPresent && (
        <Note>
          {t(
            'Having a security.txt ensures security researchers know how and where to safely report vulnerabilities.',
          )}
        </Note>
      )}
    </Card>
  );
};

export default SecurityTxtCard;
