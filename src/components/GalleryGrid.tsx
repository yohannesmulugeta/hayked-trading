import { useEffect, useState } from 'react';
import type { GalleryItem } from '../lib/content';
import { Icon } from './Icon';

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);
  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return <>
    <div className="gallery-grid">
      {items.map((item, index) => <button key={item.title} type="button" className={`gallery-card gallery-card--${(index % 5) + 1}`} onClick={() => setActive(item)}>
        <img src={item.image} alt={item.alt} loading="lazy" />
        <span><strong>{item.title}</strong><small>{item.caption}</small></span>
      </button>)}
    </div>
    {active && <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}>
      <button type="button" className="lightbox__close" onClick={() => setActive(null)} aria-label="Close image"><Icon name="close" /></button>
      <figure onClick={(event) => event.stopPropagation()}>
        <img src={active.image} alt={active.alt} />
        <figcaption><strong>{active.title}</strong><span>{active.caption}</span></figcaption>
      </figure>
    </div>}
  </>;
}
