import { useEffect, useRef } from 'react';
import { ButtonLink } from '../components/ButtonLink';
import { CoffeeCard } from '../components/CoffeeCard';
import { GalleryGrid } from '../components/GalleryGrid';
import { Icon } from '../components/Icon';
import { SectionHeading } from '../components/SectionHeading';
import { assetUrl } from '../lib/assets';
import { content } from '../lib/content';

export function HomePage() {
  const featured = content.coffees.filter((coffee) => coffee.featured).slice(0, 3);
  const serviceIcons = content.services;
  const heroRef = useRef<HTMLElement>(null);
  const heroImage = content.home.heroSlides[0];

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let frame = 0;
    const updateHeroProgress = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      const maxShift = window.innerWidth <= 640 ? 34 : 70;
      hero.style.setProperty('--hero-shift', `${Math.round(progress * maxShift)}px`);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeroProgress);
    };

    updateHeroProgress();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <section ref={heroRef} className="hero hero--simple">
        {heroImage && (
          <img
            className="hero__image hero__image--parallax"
            src={assetUrl(heroImage.image)}
            alt={heroImage.alt}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        )}
        <div className="hero__overlay" />
        <div className="container hero__grid">
          <div className="hero__content reveal-up">
            <span className="hero__kicker">{content.home.eyebrow}</span>
            <h1>{content.home.title}</h1>
            <p>{content.home.intro}</p>
            <div className="button-row">
              <ButtonLink to="/coffees" variant="primary">{content.home.primaryCta}</ButtonLink>
              <ButtonLink to="/request-sample" variant="outline">{content.home.secondaryCta}</ButtonLink>
            </div>
            <div className="hero__assurance" aria-label="Hayked capabilities">
              <span><Icon name="coffee" /> Ethiopian Arabica</span>
              <span><Icon name="warehouse" /> Processing & warehousing</span>
              <span><Icon name="globe" /> Export coordination</span>
            </div>
            <div className="hero__scroll-hint" aria-hidden="true"><span /> Scroll to discover Hayked</div>
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
              <div><Icon name="check" /><span>Real processing and warehousing infrastructure</span></div>
              <div><Icon name="check" /><span>Direct sample and offer enquiries</span></div>
              <div><Icon name="check" /><span>Current information confirmed by the export team</span></div>
            </div>
            <ButtonLink to="/about" variant="text">Learn about Hayked</ButtonLink>
          </div>
          <div className="editorial-media">
            <img src={assetUrl(content.home.aboutImage)} alt="Coffee warehouse operations in Ethiopia" loading="lazy" />
            <div className="editorial-media__note"><strong>Hayked facility</strong><span>Real warehousing and processing infrastructure in Ethiopia.</span></div>
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
