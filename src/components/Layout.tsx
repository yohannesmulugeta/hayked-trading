import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { ScrollToTop } from './ScrollToTop';

export function Layout({ children }: { children: ReactNode }) {
  return <>
    <ScrollToTop />
    <Header />
    <main>{children}</main>
    <Footer />
    <FloatingWhatsApp />
  </>;
}
