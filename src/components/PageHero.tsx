import type { ReactNode } from 'react';
import { assetUrl } from '../lib/assets';

export function PageHero({ eyebrow, title, text, image, children }: { eyebrow: string; title: string; text: string; image: string; children?: ReactNode }) {
  return <section className="page-hero">
    <img className="page-hero__image" src={assetUrl(image)} alt="" aria-hidden="true" />
    <div className="page-hero__overlay" />
    <div className="container page-hero__content">
      <span className="eyebrow eyebrow--light">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
      {children && <div className="button-row">{children}</div>}
    </div>
  </section>;
}
