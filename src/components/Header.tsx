import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Brand } from './Brand';
import { Icon } from './Icon';
import { content } from '../lib/content';

const navItems = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/coffees', 'Our Coffees'],
  ['/services', 'Processing & Warehousing'],
  ['/quality', 'Quality Control'],
  ['/sustainability', 'Sustainability'],
  ['/contact', 'Contact'],
] as const;

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const route = location.pathname + location.search;
  const [menu, setMenu] = useState({ route, open: false });
  const open = menu.route === route && menu.open;
  // Reset route-specific menu state before painting the destination page.
  if (menu.route !== route) setMenu({ route, open: false });
  const [solid, setSolid] = useState(() => !isHome);
  const headerRef = useRef<HTMLElement>(null);
  const brandSlotRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenu((current) => ({ ...current, open: false }));
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', closeOnEscape); };
  }, [open]);

  useLayoutEffect(() => {
    let frame = 0;
    let active = true;
    const header = headerRef.current;
    const slot = brandSlotRef.current;
    const brand = brandRef.current;
    const hero = isHome ? document.querySelector<HTMLElement>('.hero--simple') : null;
    const heroCopy = hero?.querySelector<HTMLElement>('.hero__content');
    const desktop = window.matchMedia('(min-width: 1121px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const clearMotion = () => {
      header?.removeAttribute('data-hero-brand-motion');
      header?.removeAttribute('data-hero-brand-progress');
      brand?.style.removeProperty('transform');
      hero?.style.removeProperty('--hero-brand-height');
      hero?.style.removeProperty('--hero-copy-opacity');
      if (heroCopy) heroCopy.inert = false;
    };
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const smoothstep = (value: number) => value * value * (3 - 2 * value);

    const updateHeader = () => {
      frame = 0;

      if (!isHome || !hero || !header || !slot || !brand) {
        setSolid(true);
        clearMotion();
        return;
      }

      const heroRect = hero.getBoundingClientRect();
      // Desktop stays transparent until the hero has actually left the viewport.
      // Preserve the existing mobile header threshold and menu behaviour.
      setSolid(heroRect.bottom <= (desktop.matches ? 0 : header.offsetHeight));

      if (!desktop.matches) {
        clearMotion();
        return;
      }

      const slotRect = slot.getBoundingClientRect();
      const width = brand.offsetWidth;
      const height = Number.parseFloat(window.getComputedStyle(brand).height);
      if (!width || !height) return;

      // The slot never moves. Measure the untransformed dock, not the animated rect.
      const dockLeft = slotRect.left + brand.offsetLeft;
      const dockTop = slotRect.top + (slotRect.height - height) / 2;
      const heroTop = heroRect.top + window.scrollY;
      const openingWidth = Math.min(heroRect.width * .62, 880, heroRect.height * .24 * width / height);
      const openingScale = Math.max(1, openingWidth / width);
      const startX = heroRect.left + heroRect.width / 2 - width * openingScale / 2 - dockLeft;
      const startY = heroTop + heroRect.height / 2 - height * openingScale / 2 - dockTop;
      const distance = Math.min(480, Math.max(240, heroRect.height * .55));
      const progress = reducedMotion.matches ? 1 : clamp((window.scrollY - heroTop) / distance);

      // First shrink and travel left BELOW the nav. Only lift into the reserved
      // slot once header size has been reached, so no part crosses a nav link.
      const approach = smoothstep(clamp(progress / .72));
      const dock = smoothstep(clamp((progress - .72) / .28));
      const safeY = Math.max(0, header.getBoundingClientRect().bottom + 16 - dockTop);
      const x = startX * (1 - approach);
      const y = progress < .72 ? startY + (safeY - startY) * approach : safeY * (1 - dock);
      const scale = openingScale + (1 - openingScale) * approach;

      hero.style.setProperty('--hero-brand-height', `${height * openingScale}px`);
      // Keep the supporting text out of the transparent navigation's reading area.
      // This affects only the copy; the brand always remains at full opacity.
      if (heroCopy) {
        const copyOpacity = clamp((heroCopy.getBoundingClientRect().top - header.getBoundingClientRect().bottom - 24) / 100);
        hero.style.setProperty('--hero-copy-opacity', String(copyOpacity));
        heroCopy.inert = copyOpacity === 0;
      }
      brand.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      header.dataset.heroBrandMotion = 'true';
      header.dataset.heroBrandProgress = String(progress);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeader);
    };

    updateHeader();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    desktop.addEventListener('change', requestUpdate);
    reducedMotion.addEventListener('change', requestUpdate);
    const observer = new ResizeObserver(requestUpdate);
    if (hero) observer.observe(hero);
    if (slot) observer.observe(slot);
    if (header) observer.observe(header);
    void document.fonts.ready.then(() => { if (active) requestUpdate(); });

    return () => {
      active = false;
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      desktop.removeEventListener('change', requestUpdate);
      reducedMotion.removeEventListener('change', requestUpdate);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      clearMotion();
    };
  }, [isHome]);

  const headerIsSolid = !isHome || solid;
  const useLightBrand = !headerIsSolid && !open;
  const headerClassName = [
    'site-header',
    'site-header--koffera-style',
    isHome ? 'site-header--home' : '',
    headerIsSolid ? 'site-header--solid' : 'site-header--over-hero',
    open ? 'site-header--menu-open' : '',
  ].filter(Boolean).join(' ');

  return (
    <header ref={headerRef} className={headerClassName}>
      <div className="topbar">
        <div className="container topbar__inner">
          <span>{content.site.tagline}</span>
          <div className="topbar__links">
            <a href={`mailto:${content.site.email}`}><Icon name="mail" />{content.site.email}</a>
            <a href={`tel:${content.site.phonePrimary.replace(/\s/g, '')}`}><Icon name="phone" />{content.site.phonePrimary}</a>
          </div>
        </div>
      </div>
      <div className="nav-shell">
        <div className="container navbar">
          <div ref={brandSlotRef} className="brand-slot">
            <Brand ref={brandRef} inverted={useLightBrand} />
          </div>
          <nav id="main-navigation" className={`nav ${open ? 'nav--open' : ''}`} aria-label="Main navigation">
            {navItems.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
                {label}
              </NavLink>
            ))}
            <NavLink to="/request-sample" className="nav__cta">Request a Sample</NavLink>
          </nav>
          <button className="menu-button" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setMenu({ route, open: !open })}>
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      {open && <button className="nav-backdrop" aria-label="Close menu" onClick={() => setMenu({ route, open: false })} />}
    </header>
  );
}
