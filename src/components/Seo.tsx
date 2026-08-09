import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { content } from '../lib/content';

const pages: Record<string, { title: string; description: string }> = {
  '/': { title: 'Ethiopian Coffee Export & Processing', description: content.site.description },
  '/about': { title: 'About Hayked Trading', description: 'Learn about Hayked General Trading PLC and its Ethiopian coffee preparation, warehousing and export coordination capabilities.' },
  '/coffees': { title: 'Ethiopian Coffees', description: 'Explore Ethiopian Arabica coffee programmes available from Hayked Trading for international buyers.' },
  '/services': { title: 'Coffee Processing & Warehousing', description: 'Coffee cleaning, sorting, preparation, warehousing and export coordination services in Ethiopia.' },
  '/quality': { title: 'Coffee Quality Control', description: 'See how Hayked coordinates coffee sampling, preparation, lot control and buyer approvals.' },
  '/sustainability': { title: 'Responsible Coffee Trade', description: 'Hayked’s practical approach to traceability, responsible operations and long-term coffee trade relationships.' },
  '/contact': { title: 'Contact Hayked Trading', description: 'Contact Hayked Trading about Ethiopian coffee, processing, warehousing or export requirements.' },
  '/request-sample': { title: 'Request a Coffee Sample', description: 'Send Hayked Trading a qualified Ethiopian coffee sample request.' },
};

function setMeta(selector: string, attribute: 'name' | 'property', key: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = value;
}

export function Seo() {
  const location = useLocation();

  useEffect(() => {
    const cleanPath = location.pathname.replace(/\/$/, '') || '/';
    const coffeeSlug = cleanPath.match(/^\/coffees\/([^/]+)$/)?.[1];
    const coffee = coffeeSlug ? content.coffees.find((item) => item.slug === coffeeSlug) : undefined;
    const page = coffee
      ? { title: `${coffee.name} Coffee`, description: coffee.summary }
      : pages[cleanPath] ?? { title: 'Page Not Found', description: content.site.description };
    const title = `${page.title} | ${content.site.companyName}`;
    const canonical = `https://haykedtrading.com${cleanPath === '/' ? '' : cleanPath}`;
    const image = `https://haykedtrading.com/uploads/hayked/011-coffee-hero-2560x1440.webp`;

    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', page.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', page.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    setMeta('meta[property="og:image"]', 'property', 'og:image', image);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [location.pathname]);

  return null;
}
