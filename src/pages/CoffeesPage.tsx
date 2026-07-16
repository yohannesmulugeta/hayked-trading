import { useMemo, useState } from 'react';
import { ButtonLink } from '../components/ButtonLink';
import { CoffeeCard } from '../components/CoffeeCard';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { assetUrl, content } from '../lib/content';

export function CoffeesPage() {
  const filters = useMemo(() => ['All', ...Array.from(new Set(content.coffees.map((coffee) => coffee.process)))], []);
  const [filter, setFilter] = useState('All');
  const coffees = filter === 'All' ? content.coffees : content.coffees.filter((coffee) => coffee.process === filter);

  return (
    <>
      <PageHero eyebrow="Our coffees" title="A clear catalogue for current Ethiopian coffee offers." text="The catalogue is managed through individual content files so Hayked can update listings without editing page code." image={assetUrl('/uploads/green-coffee-beans.webp')}>
        <ButtonLink to="/request-sample" variant="primary">Request a sample</ButtonLink>
      </PageHero>

      <section className="section section--soft">
        <div className="container">
          <div className="section-topline">
            <SectionHeading eyebrow="Coffee catalogue" title="Explore coffee enquiry options." text="Coffee specifications, origin, crop information and availability are confirmed directly through the current offer list." />
          </div>
          <div className="filter-bar" role="group" aria-label="Filter coffees">
            {filters.map((item) => <button key={item} type="button" className={filter === item ? 'filter-chip filter-chip--active' : 'filter-chip'} onClick={() => setFilter(item)}>{item}</button>)}
          </div>
          <div className="coffee-grid coffee-grid--catalogue">
            {coffees.map((coffee) => <CoffeeCard key={coffee.slug} coffee={coffee} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container buyer-note">
          <div><span className="eyebrow">For coffee buyers</span><h2>Need a specific origin, process or preparation?</h2></div>
          <div><p>Send the destination, approximate volume, shipment timing and required specification. Choose email or WhatsApp to send a structured enquiry directly to the team.</p><ButtonLink to="/contact?type=offer" variant="secondary">Request current offers</ButtonLink></div>
        </div>
      </section>
    </>
  );
}
