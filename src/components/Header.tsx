import { useEffect, useState } from 'react';
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
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    let frame = 0;

    const updateHeader = () => {
      frame = 0;

      if (!isHome) {
        setSolid(true);
        return;
      }

      const hero = document.querySelector<HTMLElement>('.hero--simple');
      const headerHeight = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 90;
      setSolid(!hero || hero.getBoundingClientRect().bottom <= headerHeight);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeader);
    };

    updateHeader();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [isHome]);

  const useLightBrand = isHome && !solid && !open;
  const headerClassName = [
    'site-header',
    'site-header--koffera-style',
    solid ? 'site-header--solid' : 'site-header--over-hero',
    open ? 'site-header--menu-open' : '',
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClassName}>
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
          <Brand inverted={useLightBrand} />
          <nav id="main-navigation" className={`nav ${open ? 'nav--open' : ''}`} aria-label="Main navigation">
            {navItems.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
                {label}
              </NavLink>
            ))}
            <NavLink to="/request-sample" className="nav__cta">Request a Sample</NavLink>
          </nav>
          <button className="menu-button" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((value) => !value)}>
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      {open && <button className="nav-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />}
    </header>
  );
}
