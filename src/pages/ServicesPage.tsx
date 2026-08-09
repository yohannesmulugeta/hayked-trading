import { ButtonLink } from '../components/ButtonLink';
import { Icon } from '../components/Icon';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { assetUrl } from '../lib/assets';
import { content, processSteps } from '../lib/content';

export function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Processing & warehousing" title="Real infrastructure for coffee preparation and storage." text="Discuss coffee processing, organized warehousing, quality requirements and export coordination with the Hayked team." image="/uploads/hayked/017-processing-hero-2560x1440.webp">
        <ButtonLink to="/contact?type=services" variant="primary">Discuss a service requirement</ButtonLink>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading centered eyebrow="Service areas" title="Connected support from preparation to dispatch." text="Contact Hayked to confirm the current service scope, facility requirements and timing for your coffee." />
          <div className="service-grid">
            {content.services.map((service) => (
              <article className="service-card service-card--large" key={service.slug}>
                <div className="service-card__top"><span>{service.number}</span><Icon name={service.icon} /></div>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <ButtonLink to={`/contact?type=${service.slug}`} variant="text">Ask about this service</ButtonLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container process-layout">
          <div className="process-layout__intro">
            <SectionHeading eyebrow="Working process" title="A structured journey from requirement to release." text="The operating sequence is aligned with the coffee, agreed service scope and buyer requirement." />
          </div>
          <ol className="process-list">
            {processSteps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></li>)}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container facility-grid">
          <img className="rounded-media rounded-media--portrait" src={assetUrl('/uploads/hayked/013-warehouse-story-1800x2400.webp')} alt="Warehouse aisle between stacked coffee sacks" loading="lazy" />
          <div>
            <SectionHeading eyebrow="Warehousing environment" title="See the operation behind the service." text="Hayked’s facility supports organized storage and service coordination. Contact the team for current capacity, handling requirements and availability." />
            <ul className="clean-list">
              <li><Icon name="check" /> Coffee-focused warehouse environment</li>
              <li><Icon name="check" /> Lot identification and storage coordination</li>
              <li><Icon name="check" /> Direct service enquiry and follow-up</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
