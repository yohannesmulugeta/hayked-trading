import { ButtonLink } from '../components/ButtonLink';
import { Icon } from '../components/Icon';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { content, processSteps } from '../lib/content';

export function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Processing & warehousing" title="Connected support across preparation, storage and export coordination." text="Discuss coffee preparation, organized storage, quality requirements and export coordination with the Hayked team." image="https://images.pexels.com/photos/4820660/pexels-photo-4820660.jpeg?auto=compress&cs=tinysrgb&w=1920">
        <ButtonLink to="/contact?type=services" variant="primary">Discuss a service requirement</ButtonLink>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading centered eyebrow="Service areas" title="Present every capability with verified operational detail." text="Contact Hayked for current facility, service-scope and operational information." />
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
            <SectionHeading eyebrow="Working process" title="A logical journey buyers and service clients can follow." text="The exact service scope and operating sequence are confirmed for each requirement." />
          </div>
          <ol className="process-list">
            {processSteps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></li>)}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container facility-grid">
          <img className="rounded-media" src="https://images.pexels.com/photos/19052801/pexels-photo-19052801.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Coffee sacks being prepared for transport" loading="lazy" />
          <div>
            <SectionHeading eyebrow="Facility information" title="Show real infrastructure instead of relying on generic statements." text="Request current facility information, available services and operational requirements directly from the team." />
            <ul className="clean-list">
              <li><Icon name="check" /> Approved facility and warehouse photography</li>
              <li><Icon name="check" /> Verified equipment and process descriptions</li>
              <li><Icon name="check" /> Clear service enquiry and response path</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
