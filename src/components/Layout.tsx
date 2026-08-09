import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { ScrollToTop } from './ScrollToTop';
import { Seo } from './Seo';

export function Layout({ children }: { children: ReactNode }) {
  return <>
    <ScrollToTop />
    <Seo />
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <Header />
    <main id="main-content" tabIndex={-1}>{children}</main>
    <Footer />
    <FloatingWhatsApp />
  </>;
}
