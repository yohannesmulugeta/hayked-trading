import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ButtonLink } from '../components/ButtonLink';
import { CoffeeCard } from '../components/CoffeeCard';
import { GalleryGrid } from '../components/GalleryGrid';
import { HeroSlider } from '../components/HeroSlider';
import { Icon } from '../components/Icon';
import { SectionHeading } from '../components/SectionHeading';
import { assetUrl } from '../lib/assets';
import { content, processSteps } from '../lib/content';

const heroCopy = [
  {
    eyebrow: 'Ethiopian origin · Global trade',
    title: 'Ethiopian coffee, prepared for global markets.',
    intro: 'Connect with Hayked for Ethiopian Arabica coffee, professional preparation, organized storage and responsive export coordination.',
  },
  {
    eyebrow: 'Careful preparation · Consistent handling',
    title: 'Coffee prepared with care at every stage.',
    intro: 'From drying and sorting to processing support, each step is organized around buyer requirements and clear lot handling.',
  },
  {
    eyebrow: 'Quality review · Buyer confidence',
    title: 'Quality information buyers can act on.',
    intro: 'Green coffee inspection, representative sampling and clear specification communication help buyers make informed decisions.',
  },
  {
    eyebrow: 'Export readiness · Global coordination',
    title: 'Prepared for shipment and international delivery.',
    intro: 'Hayked coordinates offer enquiries, documentation, organized storage and dispatch preparation for global coffee buyers.',
  },
] as const;

export function HomePage() {
  const featured = content.coffees.filter((coffee) => coffee.featured).slice(0, 3);
  const serviceIcons = content.services;
  const [activeHero, setActiveHero] = useState(0);
  const currentHero = heroCopy[Math.min(activeHero, heroCopy.length - 1)];

  return (
    <>
      <section className="hero hero--scroll">
        <div className="hero__sticky">
          <HeroSlider slides={content.home.heroSlides} onActiveChange={setActiveHero} />
          <div className="hero__overlay" />
          <div className="container hero__grid">
            <div className="hero__content">
              <div className="hero__copy" key={activeHero}>
                <span className="hero__kicker">{currentHero.eyebrow}</span>
                <h1>{currentHero.title}</h1>
                <p>{currentHero.intro}</p>
              </div>
              <div className="button-row">
                <ButtonLink to="/coffees" variant="primary">{content.home.primaryCta}</ButtonLink>
                <ButtonLink to="/request-sample" variant="outline">{content.home.secondaryCta}</ButtonLink>
              </div>
              <div className="hero__assurance" aria-label="Hayked capabilities">
                <span><Icon name="coffee" /> Ethiopian Arabica</span>
                <span><Icon name="warehouse" /> Processing & warehousing</span>
                <span><Icon name="globe" /> Export coordination</span>
              </div>
              <div className="hero__scroll-hint" aria-hidden="true"><span /> Scroll to explore the coffee journey</div>
            </div>
            <aside className="hero__card reveal-up reveal-delay-1">
              <span className="hero__card-label">Integrated coffee services</span>
              <h2>From requirement review to shipment coordination.</h2>
              <div className="hero__card-list">
                {['Coffee and origin information', 'Processing and storage capability', 'Sample and offer enquiries'].map((item, index) => (
                  <div key={item}><span>0{index + 1}</span><p>{item}</p></div>
                ))}
              </div>
              <Link className="text-link text-link--light" to="/services">See the operational journey <Icon name="arrow" /></Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="capability-strip" aria-label="Core capabilities">
        <div className="container capability-strip__grid">
          {serviceIcons.map((service) => (
            <div key={service.slug}>
              <Icon name={service.icon} />
              <span><strong>{service.title}</strong>{service.summary.split('.')[0]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container intro-grid">
          <div className="intro-copy">
            <SectionHeading eyebrow={content.home.aboutEyebrow} title={content.home.aboutTitle} text={content.home.aboutText} />
            <div className="feature-list">
              <div><Icon name="check" /><span>Clear buyer information</span></div>
              <div><Icon name="check" /><span>Editable coffee catalogue</span></div>
              <div><Icon name="check" /><span>Direct email and WhatsApp enquiries</span></div>
            </div>
            <ButtonLink to="/about" variant="text">Learn about Hayked</ButtonLink>
          </div>
          <div className="editorial-media">
            <img src={assetUrl(content.home.aboutImage)} alt="Coffee warehouse operations in Ethiopia" loading="lazy" />
            <div className="editorial-media__note"><strong>Clear buyer communication</strong><span>Relevant information from origin enquiry to export coordination.</span></div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-topline">
            <SectionHeading eyebrow="Our coffees" title={content.home.coffeeTitle} text={content.home.coffeeText} />
            <ButtonLink to="/coffees" variant="text">View all coffees</ButtonLink>
          </div>
          <div className="coffee-grid">
            {featured.map((coffee) => <CoffeeCard key={coffee.slug} coffee={coffee} />)}
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <div className="section-topline">
            <SectionHeading light eyebrow="Coffee origins" title="Build confidence through verified origin information." text="Contact the export team to confirm current origin availability, process, grade and shipment timing." />
          </div>
          <div className="origin-grid">
            {content.origins.map((origin) => (
              <article className="origin-card" key={origin.slug}>
                <img src={assetUrl(origin.image)} alt={`${origin.name} coffee origin example`} loading="lazy" />
                <div className="origin-card__overlay" />
                <div className="origin-card__content">
                  {!origin.verified && <span className="status-badge status-badge--demo">Confirm availability</span>}
                  <small>{origin.region}</small>
                  <h3>{origin.name}</h3>
                  <p>{origin.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading centered eyebrow="Connected services" title={content.home.serviceTitle} text={content.home.serviceText} />
          <div className="service-grid service-grid--home">
            {content.services.map((service) => (
              <article className="service-card" key={service.slug}>
                <div className="service-card__top"><span>{service.number}</span><Icon name={service.icon} /></div>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container process-layout">
          <div className="process-layout__intro">
            <SectionHeading eyebrow="Operational journey" title="A structured path from buyer requirement to release." text="The final wording should be aligned with Hayked’s real operating procedure before publication." />
            <ButtonLink to="/services" variant="secondary">Explore processing & warehousing</ButtonLink>
          </div>
          <ol className="process-list">
            {processSteps.map((step, index) => (
              <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--quality">
        <div className="container quality-feature">
          <div className="quality-feature__image"><img src={assetUrl(content.home.qualityImage)} alt="Green coffee quality inspection" loading="lazy" /></div>
          <div className="quality-feature__content">
            <SectionHeading light eyebrow="Quality communication" title={content.home.qualityTitle} text={content.home.qualityText} />
            <ul className="clean-list clean-list--light">
              <li><Icon name="check" /> Representative sampling</li>
              <li><Icon name="check" /> Clear lot and specification records</li>
              <li><Icon name="check" /> Buyer approval coordination</li>
            </ul>
            <ButtonLink to="/quality" variant="light">See the quality workflow</ButtonLink>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading centered eyebrow="Inside the value chain" title="A visual story built for serious coffee buyers." text="Explore coffee sourcing, preparation, storage, quality review and export handling." />
          <GalleryGrid items={content.gallery} />
        </div>
      </section>
    </>
  );
}
