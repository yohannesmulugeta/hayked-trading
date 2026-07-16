import { ButtonLink } from '../components/ButtonLink';
import { Icon } from '../components/Icon';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { assetUrl, content } from '../lib/content';

export function SustainabilityPage() {
  return (
    <>
      <PageHero eyebrow={content.sustainability.eyebrow} title={content.sustainability.title} text={content.sustainability.intro} image={content.sustainability.heroImage}>
        <ButtonLink to="/contact" variant="primary">Request supporting information</ButtonLink>
      </PageHero>
      <section className="section">
        <div className="container">
          <SectionHeading centered eyebrow="Evidence-led structure" title="Four areas Hayked can document over time." text="Hayked shares sourcing, workforce, community and environmental information where it is documented and approved." />
          <div className="principle-grid">
            {content.sustainability.principles.map((principle, index) => (
              <article key={principle.title}><span>0{index + 1}</span><Icon name={index === 0 ? 'globe' : index === 1 ? 'shield' : index === 2 ? 'leaf' : 'check'} /><h3>{principle.title}</h3><p>{principle.text}</p></article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container sustainability-layout">
          <img className="rounded-media" src={assetUrl('/uploads/coffee-cherries.webp')} alt="Ripe Ethiopian coffee cherries" loading="lazy" />
          <div><SectionHeading eyebrow="Publication rule" title="Responsible communication protects trust." text="Only publish certificates, memberships, traceability claims, workforce data and community outcomes that are current, documented and approved for public use." /><div className="verification-note"><Icon name="shield" /><p>Supporting information can be requested directly from Hayked for buyer review.</p></div></div>
        </div>
      </section>
    </>
  );
}
