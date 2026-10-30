import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './header-contrast.css';
import './scroll-hero.css';
import './hero-brand.css';
import './home-discovery.css';

const application = <App />;
const routerMode = import.meta.env.VITE_ROUTER_MODE;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {routerMode === 'hash'
      ? <HashRouter>{application}</HashRouter>
      : <BrowserRouter basename={import.meta.env.BASE_URL}>{application}</BrowserRouter>}
  </React.StrictMode>,
);
