import { ButtonLink } from '../components/ButtonLink';
import { Icon } from '../components/Icon';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { assetUrl } from '../lib/assets';
import { content } from '../lib/content';

export function SustainabilityPage() {
  return (
    <>
      <PageHero eyebrow={content.sustainability.eyebrow} title={content.sustainability.title} text={content.sustainability.intro} image={content.sustainability.heroImage}>
        <ButtonLink to="/contact" variant="primary">Request supporting information</ButtonLink>
      </PageHero>
      <section className="section">
        <div className="container">
          <SectionHeading centered eyebrow="Responsible trade" title="Four principles for dependable communication." text="Hayked shares sourcing, operational and supporting information where current records are available." />
          <div className="principle-grid">
            {content.sustainability.principles.map((principle, index) => (
              <article key={principle.title}><span>0{index + 1}</span><Icon name={index === 0 ? 'globe' : index === 1 ? 'shield' : index === 2 ? 'leaf' : 'check'} /><h3>{principle.title}</h3><p>{principle.text}</p></article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container sustainability-layout">
          <img className="rounded-media" src={assetUrl('/uploads/hayked/011-coffee-hero-2560x1440.webp')} alt="Fresh red coffee cherries" loading="lazy" />
          <div><SectionHeading eyebrow="Supporting information" title="Responsible communication protects trust." text="Certifications, memberships, traceability records and operational information are shared according to the specific coffee or service requirement." /><div className="verification-note"><Icon name="shield" /><p>Contact Hayked to request the supporting information available for buyer review.</p></div></div>
        </div>
      </section>
    </>
  );
}
