import { faXTwitter, faBluesky, faGithub, faMastodon } from '@fortawesome/free-brands-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Card } from 'client/components/Form/Card';
import Row, { Section, type RowProps } from 'client/components/Form/Row';
import Icon from 'client/components/misc/Icon';
import { useT } from 'client/i18n';
import { formatNumber } from 'client/utils/format';

const cardStyles = `
  h4 {
    gap: 0.5rem;
  }
  img.avatar {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    vertical-align: text-bottom;
    margin-right: 0.35rem;
  }
`;

const ICONS: Record<string, IconDefinition> = {
  X: faXTwitter,
  Bluesky: faBluesky,
  GitHub: faGithub,
  Mastodon: faMastodon,
};

const LABELS: Record<string, string> = { X: 'X (Twitter)' };

const verification = (profile: any, t: ReturnType<typeof useT>): RowProps => {
  if (profile.checked === false) {
    return {
      val: t('Unknown'),
      status: 'info',
      reason: t('The network could not be reached, so this account was not checked'),
    };
  }
  if (!profile.exists) {
    return { val: false, reason: t('This handle does not resolve to a live account') };
  }
  if (profile.domainVerified) {
    return {
      val: true,
      reason: t('The handle is this domain, so the network has verified control of it'),
    };
  }
  if (profile.linksBack) {
    return {
      val: true,
      reason: profile.websiteVerified
        ? t('The profile links back to this site, and the network has verified the link')
        : t('The profile links back to this site'),
    };
  }
  return {
    val: false,
    status: 'warning',
    reason: profile.website
      ? t('The profile links to {site} instead', { site: profile.website })
      : t('The profile lists no website to check against'),
  };
};

const num = (value: any): string =>
  typeof value === 'number' ? formatNumber(value) : String(value);

const SocialPresenceCard = (props: {
  data: any;
  title: string;
  actionButtons: any;
}): JSX.Element => {
  const t = useT();
  const profiles: any[] = props.data || [];
  return (
    <Card heading={props.title} actionButtons={props.actionButtons} styles={cardStyles}>
      {profiles.map((profile) => (
        <Section
          key={`${profile.network}-${profile.handle}`}
          title={
            <>
              {ICONS[profile.network] && <Icon icon={ICONS[profile.network]} />}
              {LABELS[profile.network] || profile.network}
            </>
          }
        >
          <Row>
            <span className="lbl">{t('Handle')}</span>
            <span className="val">
              <a target="_blank" rel="noreferrer" href={profile.url}>
                {profile.avatar && <img className="avatar" src={profile.avatar} alt="" />}@
                {profile.handle}
              </a>
            </span>
          </Row>
          {profile.name && <Row lbl={t('Name')} val={profile.name} />}
          {profile.joined && <Row lbl={t('Joined')} val={profile.joined} />}
          {profile.count !== undefined && (
            <Row
              lbl={profile.network === 'GitHub' ? t('Repositories') : t('Posts')}
              val={num(profile.count)}
            />
          )}
          {profile.followers !== undefined && (
            <Row lbl={t('Followers')} val={num(profile.followers)} />
          )}
          {profile.website && !profile.linksBack && (
            <Row lbl={t('Website')} val={profile.website} />
          )}
          <Row lbl={t('Verification')} term="social-verification" {...verification(profile, t)} />
        </Section>
      ))}
    </Card>
  );
};

export default SocialPresenceCard;
