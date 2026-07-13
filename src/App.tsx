import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { CoffeeDetailPage } from './pages/CoffeeDetailPage';
import { CoffeesPage } from './pages/CoffeesPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { QualityPage } from './pages/QualityPage';
import { RequestSamplePage } from './pages/RequestSamplePage';
import { ServicesPage } from './pages/ServicesPage';
import { SustainabilityPage } from './pages/SustainabilityPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/coffees" element={<CoffeesPage />} />
        <Route path="/coffees/:slug" element={<CoffeeDetailPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/quality" element={<QualityPage />} />
        <Route path="/sustainability" element={<SustainabilityPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/request-sample" element={<RequestSamplePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
