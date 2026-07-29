import { ButtonLink } from '../components/ButtonLink';
import { Icon } from '../components/Icon';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
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
          <div className="leadership-placeholder" aria-label="Leadership portrait placeholder">
            <Icon name="globe" />
            <span>Approved leadership portrait required</span>
          </div>
          <div>
            <SectionHeading eyebrow="Leadership" title={content.about.leadershipName} text={content.about.leadershipText} />
            <p className="role-label">{content.about.leadershipRole}</p>
            <div className="verification-note"><Icon name="shield" /><p>This section intentionally avoids adding unverified career history, awards or statistics.</p></div>
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container values-grid">
          {[
            ['Clarity', 'Present relevant information without exaggeration or hidden assumptions.'],
            ['Preparation', 'Explain how coffee and documentation move through the operational process.'],
            ['Responsiveness', 'Give buyers direct routes to email, WhatsApp, samples and current offers.'],
          ].map(([title, text], index) => (
            <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>
    </>
  );
}
