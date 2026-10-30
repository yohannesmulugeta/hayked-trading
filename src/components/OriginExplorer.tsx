import { memo, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import countries from '../data/world-map.json';
import { Icon } from './Icon';

// Orientation markers for coffee trade areas, not administrative boundaries,
// individual farms, current stock or claims of Hayked sourcing.
const origins = [
  { name: 'Yirgacheffe', region: 'Southern Ethiopia', lat: 6.16, lon: 38.20, description: 'A celebrated Ethiopian coffee origin. Discuss the preparation and profile you are looking for with the Hayked team.' },
  { name: 'Sidama', region: 'Southern Ethiopia', lat: 6.70, lon: 38.45, description: 'Explore Sidama as a starting point for your coffee enquiry, with process, grade and sample requirements confirmed individually.' },
  { name: 'Guji', region: 'Southern Ethiopia', lat: 5.85, lon: 39.05, description: 'Tell us your Guji coffee requirements so our team can discuss current offers, preparation and sample options.' },
  { name: 'Jimma', region: 'Southwestern Ethiopia', lat: 7.67, lon: 36.83, description: 'An established Ethiopian coffee origin. Share the volume, preparation and destination your buying programme requires.' },
  { name: 'Harar', region: 'Eastern Ethiopia', lat: 9.31, lon: 42.13, description: 'Explore this eastern Ethiopian coffee origin and discuss the specifications and commercial requirements for your enquiry.' },
];
const project = (lon: number, lat: number) => [(lon + 180) / 360 * 1200, (90 - lat) / 180 * 600 + 25];
const clamp = (value: number) => Math.min(1, Math.max(0, value));
const WorldShapes = memo(function WorldShapes() {
  return <g aria-hidden="true">{countries.map((country) => <path key={country.id} d={country.path} className={`origin-map__country${country.id === 'ETH' ? ' origin-map__country--ethiopia' : ''}`} vectorEffect="non-scaling-stroke" />)}</g>;
});

export function OriginExplorer() {
  const rootRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [compact, setCompact] = useState(false);
  const [manualView, setManualView] = useState<'world' | 'ethiopia' | null>(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let frame = 0;
    const mobile = window.matchMedia('(max-width: 760px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      setCompact(mobile.matches);
      setProgress(mobile.matches || reduced.matches ? 1 : clamp(-rect.top / Math.max(root.offsetHeight - window.innerHeight, 1)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    mobile.addEventListener('change', schedule);
    reduced.addEventListener('change', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      mobile.removeEventListener('change', schedule);
      reduced.removeEventListener('change', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const zoom = manualView === 'world' ? 0 : manualView === 'ethiopia' ? 1 : progress * progress * (3 - 2 * progress);
  const scale = 1 + zoom * (compact ? 17 : 8);
  const [ethiopiaX, ethiopiaY] = project(40.5, 9);
  const targetX = compact ? 600 : 500;
  const targetY = compact ? 335 : 340;
  const x = (targetX - ethiopiaX) * zoom - ethiopiaX * (scale - 1);
  const y = (targetY - ethiopiaY) * zoom - ethiopiaY * (scale - 1);
  const zoomed = zoom > .88;
  const origin = origins[selected];

  const selectOrigin = (index: number) => { setSelected(index); setManualView('ethiopia'); };

  return (
    <section ref={rootRef} className="origin-journey" aria-labelledby="origins-title">
      <div className="origin-map">
        <div className="origin-map__heading"><span className="eyebrow">A sense of origin</span><h2 id="origins-title">Explore Ethiopia’s coffee origins.</h2><p>From a place on the map to a conversation about coffee.</p></div>
        <div className="origin-map__canvas">
          <div className="origin-map__views" aria-label="Map view">
            <button type="button" aria-pressed={!zoomed} onClick={() => setManualView('world')}>World view</button>
            <button type="button" aria-pressed={zoomed} onClick={() => setManualView('ethiopia')}>Explore Ethiopia <Icon name="arrow" /></button>
          </div>
          <svg className="origin-map__svg" viewBox="0 0 1200 650" role="group" aria-label="World map zooming into Ethiopia, with approximate coffee origin locations">
            <defs><pattern id="ethiopia-hatch" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M0 7L7 0" stroke="#16b8bc" strokeWidth=".7" opacity=".35" /></pattern></defs>
            <g className={`origin-map__geography${manualView ? ' origin-map__geography--manual' : ''}`} transform={`translate(${x} ${y}) scale(${scale})`}>
              <WorldShapes />
              {!zoomed && <g aria-hidden="true"><circle cx={ethiopiaX} cy={ethiopiaY} r={6 / scale} className="origin-map__locator" /><text x={ethiopiaX + 10 / scale} y={ethiopiaY - 10 / scale} fontSize={15 / scale} className="origin-map__country-label">Ethiopia</text></g>}
              {zoomed && origins.map((place, index) => {
                const [px, py] = project(place.lon, place.lat);
                return <g key={place.name} role="button" tabIndex={0} aria-label={`Explore ${place.name}`} aria-pressed={selected === index} className={`origin-map__pin${selected === index ? ' origin-map__pin--selected' : ''}`} transform={`translate(${px} ${py}) scale(${(compact ? 3.5 : 1) / scale})`} onClick={() => selectOrigin(index)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectOrigin(index); } }}>
                  <title>{place.name}</title><circle r="18" className="origin-map__hit" /><path d="M0 8L-7-6H7Z" className="origin-map__triangle" /><circle r="13" className="origin-map__focus" />
                </g>;
              })}
            </g>
          </svg>
          <span className="origin-map__orientation" aria-hidden="true">N <span>↑</span></span>
        </div>
        <aside className="origin-map__card" aria-label="Coffee origin details">
          {zoomed ? <>
            <span className="eyebrow">Select an origin</span>
            <div className="origin-map__choices">{origins.map((place, index) => <button key={place.name} type="button" aria-pressed={selected === index} onClick={() => selectOrigin(index)}>{place.name}</button>)}</div>
            <div className="origin-map__detail" aria-live="polite"><span className="origin-map__region">{origin.region}</span><h3>{origin.name}</h3><p>{origin.description}</p></div>
            <Link className="text-link" to={`/request-sample?coffee=${encodeURIComponent(origin.name)}`}>Discuss this origin <Icon name="arrow" /></Link>
          </> : <>
            <span className="eyebrow">Ethiopia · East Africa</span><h3>Every coffee has a place.</h3><p>Move closer to Ethiopia and explore some of its established coffee origins.</p>
            <button className="text-link origin-map__zoom-button" type="button" onClick={() => setManualView('ethiopia')}>Explore the origins <Icon name="arrow" /></button>
          </>}
          <p className="origin-map__availability">Origin locations are approximate. Current availability and specifications are confirmed by the Hayked team.</p>
        </aside>
        <a className="origin-map__credit" href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer">Map: Natural Earth</a>
      </div>
    </section>
  );
}
