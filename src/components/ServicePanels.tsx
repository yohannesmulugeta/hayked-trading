import { useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../lib/assets';
import { content } from '../lib/content';
import { Icon } from './Icon';

const panels = [
  { id: 'coffees', title: 'Our coffees', text: 'Begin with Ethiopian Arabica. Share your preferred origin, preparation and buying requirements with our team.', image: content.home.heroSlides[0].image, alt: 'Fresh Ethiopian coffee cherries', colour: '#153b30', to: '/coffees' },
  { id: 'processing', title: 'Coffee processing', text: content.services.find((service) => service.slug === 'processing')!.summary, image: '/uploads/hayked/017-processing-hero-2560x1440.webp', alt: 'Coffee processing equipment inside Hayked’s facility', colour: '#8d3d2c', to: '/services' },
  { id: 'warehousing', title: 'Warehousing', text: content.services.find((service) => service.slug === 'warehousing')!.summary, image: '/uploads/hayked/009-warehousing-feature-2400x1800.webp', alt: 'Coffee sacks stored inside Hayked’s warehouse', colour: '#18374c', to: '/services' },
  { id: 'quality', title: 'Quality control', text: content.services.find((service) => service.slug === 'quality')!.summary, image: '/uploads/hayked/007-quality-control-2400x1600.webp', alt: 'Green coffee beans prepared for quality review', colour: '#9c7937', to: '/quality' },
  { id: 'export', title: 'Export coordination', text: content.services.find((service) => service.slug === 'export')!.summary, image: '/uploads/hayked/012-facility-overview-2400x1800.webp', alt: 'The Hayked facility behind its coffee trading services', colour: '#455b4b', to: '/contact?type=export' },
];

export function ServicePanels() {
  const [active, setActive] = useState(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
    if (!direction && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? panels.length - 1 : (index + direction + panels.length) % panels.length;
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <section className="service-stories" aria-labelledby="service-stories-title">
      <div className="container service-stories__heading">
        <div><span className="eyebrow">The Hayked journey</span><h2 id="service-stories-title">Coffee. Care. Connection.</h2></div>
        <p>Explore the people, preparation and infrastructure behind your next coffee requirement.</p>
      </div>
      <div className="story-panels">
        {panels.map((panel, index) => {
          const expanded = index === active;
          return (
            <article key={panel.id} className={`story-panel${expanded ? ' story-panel--active' : ''}`} style={{ '--panel-colour': panel.colour } as CSSProperties} onPointerEnter={(event) => { if (event.pointerType === 'mouse') setActive(index); }}>
              <img className="story-panel__image" src={assetUrl(panel.image)} alt={panel.alt} aria-hidden={!expanded} loading="lazy" decoding="async" />
              <div className="story-panel__shade" aria-hidden="true" />
              <button ref={(node) => { buttons.current[index] = node; }} className="story-panel__trigger" type="button" aria-label={panel.title} aria-expanded={expanded} aria-controls={`story-${panel.id}`} onFocus={() => setActive(index)} onClick={() => setActive(index)} onKeyDown={(event) => moveFocus(event, index)}>
                <span className="story-panel__number" aria-hidden="true">0{index + 1}</span>
                <span className="story-panel__vertical" aria-hidden="true">{panel.title}</span>
              </button>
              <div id={`story-${panel.id}`} className="story-panel__content" aria-hidden={!expanded} inert={!expanded}>
                <div><h3>{panel.title}</h3><p>{panel.text}</p></div>
                <Link className="story-panel__explore" to={panel.to} aria-label={`Explore ${panel.title.toLowerCase()}`}><span>Explore</span><Icon name="arrow" /></Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
