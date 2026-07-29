import { Link } from 'react-router-dom';
import type { Coffee } from '../lib/content';
import { Icon } from './Icon';

export function CoffeeCard({ coffee }: { coffee: Coffee }) {
  return <article className="coffee-card">
    <Link to={`/coffees/${coffee.slug}`} className="coffee-card__image-wrap" aria-label={`View ${coffee.name}`}>
      <img src={coffee.image} alt={coffee.name} loading="lazy" />
      <span className={`status-badge ${coffee.placeholder ? 'status-badge--demo' : ''}`}>{coffee.status}</span>
    </Link>
    <div className="coffee-card__body">
      <div className="coffee-card__meta"><span>{coffee.origin}</span><span>{coffee.process}</span></div>
      <h3><Link to={`/coffees/${coffee.slug}`}>{coffee.name}</Link></h3>
      <p>{coffee.summary}</p>
      <div className="coffee-card__actions">
        <Link to={`/coffees/${coffee.slug}`} className="text-link">View details <Icon name="arrow" /></Link>
        <Link to={`/request-sample?coffee=${encodeURIComponent(coffee.name)}`} className="text-link text-link--muted">Request sample</Link>
      </div>
    </div>
  </article>;
}
