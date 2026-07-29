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
  const [overHero, setOverHero] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    let frame = 0;

    const updateHeaderState = () => {
      frame = 0;
      if (location.pathname !== '/') {
        setOverHero(false);
        return;
      }

      const hero = document.querySelector('.hero--scroll') as HTMLElement | null;
      if (!hero) {
        setOverHero(window.scrollY < window.innerHeight);
        return;
      }

      const scrollFinish = hero.offsetTop + hero.offsetHeight - window.innerHeight;
      setOverHero(window.scrollY < scrollFinish - 2);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeaderState);
    };

    updateHeaderState();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`site-header ${overHero ? 'site-header--hero' : 'site-header--scrolled'}`}>
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
          <Brand inverted={overHero} />
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
