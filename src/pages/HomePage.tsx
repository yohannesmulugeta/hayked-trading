import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ButtonLink } from '../components/ButtonLink';
import { CoffeeCard } from '../components/CoffeeCard';
import { GalleryGrid } from '../components/GalleryGrid';
import { Icon } from '../components/Icon';
import { SectionHeading } from '../components/SectionHeading';
import { ServicePanels } from '../components/ServicePanels';
import { assetUrl } from '../lib/assets';
import { content } from '../lib/content';

const OriginExplorer = lazy(() => import('../components/OriginExplorer').then((module) => ({ default: module.OriginExplorer })));

function OriginDiscovery() {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { setReady(true); observer.disconnect(); }
    }, { rootMargin: '800px' });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  const placeholder = <section className="origin-map-loading" aria-busy="true"><span className="eyebrow">A sense of origin</span><h2>Explore Ethiopia’s coffee origins.</h2><p>Loading the map…</p></section>;
  return <div ref={root}>{ready ? <Suspense fallback={placeholder}><OriginExplorer /></Suspense> : placeholder}</div>;
}

export function HomePage() {
  const featured = content.coffees.filter((coffee) => coffee.featured).slice(0, 3);
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
      <section ref={heroRef} className="hero hero--simple" aria-label="Hayked General Trading PLC — Ethiopian coffee">
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
        <button className="hero-discover" type="button" aria-label="Scroll to discover Hayked" onClick={() => document.getElementById('discover-hayked')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}><span>Scroll</span><span className="hero-discover__line" aria-hidden="true" /></button>
      </section>

      <section id="discover-hayked" className="home-welcome" aria-labelledby="home-title">
        <div className="container">
          <span className="eyebrow">{content.home.eyebrow}</span>
          <h1 id="home-title">{content.home.title}</h1>
          <p>{content.home.intro}</p>
          <div className="button-row">
            <ButtonLink to="/coffees" variant="primary">{content.home.primaryCta}</ButtonLink>
            <ButtonLink to="/request-sample" variant="secondary">{content.home.secondaryCta}</ButtonLink>
          </div>
        </div>
      </section>

      <ServicePanels />

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

      <OriginDiscovery />

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
          <SectionHeading centered eyebrow="Inside the value chain" title="Inside Hayked’s operation." text="Explore coffee preparation, storage, quality review and export handling." />
          <GalleryGrid items={content.gallery} />
        </div>
      </section>
    </>
  );
}
