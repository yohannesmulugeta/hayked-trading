import { ButtonLink } from '../components/ButtonLink';
import { Icon } from '../components/Icon';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { content, qualityStages } from '../lib/content';

export function QualityPage() {
  return (
    <>
      <PageHero eyebrow={content.quality.eyebrow} title={content.quality.title} text={content.quality.intro} image={content.quality.heroImage}>
        <ButtonLink to="/request-sample" variant="primary">Request a sample</ButtonLink>
      </PageHero>

      <section className="section">
        <div className="container quality-intro-grid">
          <SectionHeading eyebrow="Quality promise" title={content.quality.promise} text="Quality requirements are aligned with the agreed coffee specification and buyer communication process." />
          <div className="verification-note verification-note--large"><Icon name="shield" /><p>No cup score, certification, laboratory result, defect count or technical parameter is displayed unless Hayked supplies and approves it.</p></div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading centered eyebrow="Six-stage workflow" title="Quality control explained in a buyer-friendly sequence." />
          <div className="quality-stage-grid">
            {qualityStages.map(([title, text], index) => (
              <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container documentation-grid">
          <div><SectionHeading light eyebrow="Buyer documents" title="Make supporting information easy to request." text="Ask the export team which supporting documents are available for the specific coffee or service requirement." /></div>
          <ul className="document-list">
            {content.quality.documents.map((document) => <li key={document}><Icon name="check" /><span>{document}</span><small>Confirm availability</small></li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
