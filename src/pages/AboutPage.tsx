import { ButtonLink } from '../components/ButtonLink';
import { Icon } from '../components/Icon';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { assetUrl } from '../lib/assets';
import { content } from '../lib/content';

export function AboutPage() {
  return (
    <>
      <PageHero eyebrow={content.about.eyebrow} title={content.about.title} text={content.about.intro} image={content.about.heroImage}>
        <ButtonLink to="/contact" variant="primary">Start a conversation</ButtonLink>
      </PageHero>

      <section className="section">
        <div className="container story-grid">
          <div>
            <SectionHeading eyebrow="Our role" title={content.about.storyTitle} text={content.about.storyText} />
            <div className="feature-list">
              <div><Icon name="coffee" /><span>Coffee-focused service</span></div>
              <div><Icon name="warehouse" /><span>Processing and storage capability</span></div>
              <div><Icon name="globe" /><span>International buyer communication</span></div>
            </div>
          </div>
          <div className="statement-stack">
            <article><span>Mission</span><h3>{content.about.mission}</h3></article>
            <article><span>Vision</span><h3>{content.about.vision}</h3></article>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container leadership-grid">
          <img className="rounded-media rounded-media--portrait" src={assetUrl(content.about.facilityImage)} alt="Warehouse aisle between stacked coffee sacks" loading="lazy" />
          <div>
            <SectionHeading eyebrow="Our facility" title={content.about.facilityTitle} text={content.about.facilityText} />
            <div className="feature-list">
              <div><Icon name="warehouse" /><span>Organized storage environment</span></div>
              <div><Icon name="coffee" /><span>Coffee-focused infrastructure</span></div>
              <div><Icon name="globe" /><span>Direct service and buyer enquiries</span></div>
            </div>
            <ButtonLink to="/services" variant="secondary">Explore our services</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container values-grid">
          {[
            ['Clarity', 'Share the information buyers and service clients need to make the next decision.'],
            ['Preparation', 'Coordinate coffee, lot records and agreed service requirements through each stage.'],
            ['Responsiveness', 'Keep email, WhatsApp, sample and current-offer enquiries easy to start.'],
          ].map(([title, text], index) => (
            <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>
    </>
  );
}
