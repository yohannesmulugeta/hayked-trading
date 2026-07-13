import { Navigate, useParams } from 'react-router-dom';
import { ButtonLink } from '../components/ButtonLink';
import { Icon } from '../components/Icon';
import { PageHero } from '../components/PageHero';
import { content } from '../lib/content';

export function CoffeeDetailPage() {
  const { slug } = useParams();
  const coffee = content.coffees.find((item) => item.slug === slug);
  if (!coffee) return <Navigate to="/coffees" replace />;

  return (
    <>
      <PageHero eyebrow={`${coffee.origin} · ${coffee.process}`} title={coffee.name} text={coffee.summary} image={coffee.image}>
        <ButtonLink to={`/request-sample?coffee=${encodeURIComponent(coffee.name)}`} variant="primary">Request this coffee</ButtonLink>
      </PageHero>
      <section className="section">
        <div className="container coffee-detail-grid">
          <div>
            <span className={`status-badge ${coffee.placeholder ? 'status-badge--demo' : ''}`}>{coffee.status}</span>
            <h2>Offer information</h2>
            <p>{coffee.placeholder ? 'Full origin, grade, crop, profile and availability information is confirmed through the current offer list.' : 'Availability and technical specifications are confirmed through the current offer list.'}</p>
          </div>
          <div className="spec-card">
            <dl>
              <div><dt>Origin</dt><dd>{coffee.origin}</dd></div>
              <div><dt>Region</dt><dd>{coffee.region}</dd></div>
              <div><dt>Process</dt><dd>{coffee.process}</dd></div>
              <div><dt>Availability</dt><dd>{coffee.status}</dd></div>
            </dl>
            <ul className="clean-list">
              {coffee.details.map((detail) => <li key={detail}><Icon name="check" />{detail}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container compact-cta"><div><span className="eyebrow">Buyer enquiry</span><h2>Confirm the current specification directly.</h2></div><ButtonLink to={`/request-sample?coffee=${encodeURIComponent(coffee.name)}`} variant="secondary">Prepare enquiry</ButtonLink></div>
      </section>
    </>
  );
}
