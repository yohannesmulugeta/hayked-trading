import { useEffect, useRef, useState } from 'react';
import type { GalleryItem } from '../lib/content';
import { assetUrl } from '../lib/assets';
import { Icon } from './Icon';

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'Tab') {
        event.preventDefault();
        closeButton.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      opener.current?.focus();
    };
  }, [active]);

  return <>
    <div className="gallery-grid">
      {items.map((item, index) => <button key={item.title} type="button" className={`gallery-card gallery-card--${(index % 5) + 1}`} onClick={(event) => { opener.current = event.currentTarget; setActive(item); }}>
        <img src={assetUrl(item.image)} alt={item.alt} loading="lazy" />
        <span><strong>{item.title}</strong><small>{item.caption}</small></span>
      </button>)}
    </div>
    {active && <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}>
      <button ref={closeButton} type="button" className="lightbox__close" onClick={() => setActive(null)} aria-label="Close image"><Icon name="close" /></button>
      <figure onClick={(event) => event.stopPropagation()}>
        <img src={assetUrl(active.image)} alt={active.alt} />
        <figcaption><strong>{active.title}</strong><span>{active.caption}</span></figcaption>
      </figure>
    </div>}
  </>;
}
