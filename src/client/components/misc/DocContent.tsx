import styled from '@emotion/styled';
import { checks, isCheck } from '@/data/checks';
import colors from 'client/styles/colors';
import Heading from 'client/components/Form/Heading';
import { useT } from 'client/i18n';

const JobDocsContainer = styled.div`
  p.doc-desc,
  p.doc-uses,
  ul {
    margin: 0.25rem auto 1.5rem auto;
  }
  ul {
    padding: 0 0.5rem 0 1rem;
  }
  ul li a {
    color: ${colors.primaryIncreasedContrast};
  }
  h4 {
    border-top: 1px solid ${colors.primary};
    color: ${colors.primaryIncreasedContrast};
    padding: 0.5rem 0;
  }
`;

const DocContent = (props: { id: string }) => {
  const t = useT();
  const { id } = props;
  const doc = isCheck(id) ? checks[id] : null;
  if (!doc) {
    return (
      <JobDocsContainer>
        <p>{t('No Docs provided for this widget yet')}</p>
      </JobDocsContainer>
    );
  }
  return (
    <JobDocsContainer>
      <Heading as="h3" size="medium" color={colors.primary}>
        {t(`check:${id}.title`)}
      </Heading>
      <Heading as="h4" size="small">
        {t('About')}
      </Heading>
      <p className="doc-desc">{t(`check:${id}.description`)}</p>
      <Heading as="h4" size="small">
        {t('Use Cases')}
      </Heading>
      <p className="doc-uses">{t(`check:${id}.use`)}</p>
      {doc.resources.length > 0 && (
        <>
          <Heading as="h4" size="small">
            {t('Links')}
          </Heading>
          <ul>
            {doc.resources.map((resource, index) =>
              typeof resource === 'string' ? (
                <li key={`link-${index}`} id={`link-${index}`}>
                  <a target="_blank" rel="noreferrer" href={resource}>
                    {resource}
                  </a>
                </li>
              ) : (
                <li key={`link-${index}`} id={`link-${index}`}>
                  <a target="_blank" rel="noreferrer" href={resource.link}>
                    {t(resource.title)}
                  </a>
                </li>
              ),
            )}
          </ul>
        </>
      )}
    </JobDocsContainer>
  );
};

export default DocContent;
