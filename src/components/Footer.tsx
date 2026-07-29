import { Link } from 'react-router-dom';
import { Brand } from './Brand';
import { Icon } from './Icon';
import { content } from '../lib/content';

export function Footer() {
  const whatsApp = `https://wa.me/${content.site.whatsapp}?text=${encodeURIComponent('Hello Hayked Trading, I would like to discuss Ethiopian coffee.')}`;
  return (
    <footer className="footer">
      <div className="container footer__lead">
        <div>
          <span className="eyebrow eyebrow--light">Coffee from Ethiopia</span>
          <h2>Start a clear buyer conversation.</h2>
        </div>
        <div className="button-row">
          <Link className="button button--light" to="/request-sample">Request a Sample <Icon name="arrow" /></Link>
          <a className="button button--outline-light" href={whatsApp} target="_blank" rel="noreferrer">WhatsApp <Icon name="whatsapp" /></a>
        </div>
      </div>
      <div className="container footer__grid">
        <div className="footer__brand">
          <Brand inverted />
          <p>{content.site.description}</p>
        </div>
        <div>
          <h3>Company</h3>
          <Link to="/about">About Hayked</Link>
          <Link to="/quality">Quality control</Link>
          <Link to="/sustainability">Sustainability</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h3>Trade</h3>
          <Link to="/coffees">Our coffees</Link>
          <Link to="/services">Processing & warehousing</Link>
          <Link to="/request-sample">Request a sample</Link>
          <Link to="/contact?type=offer">Request an offer</Link>
        </div>
        <div>
          <h3>Contact</h3>
          <a href={`mailto:${content.site.email}`}><Icon name="mail" />{content.site.email}</a>
          <a href={`tel:${content.site.phonePrimary.replace(/\s/g, '')}`}><Icon name="phone" />{content.site.phonePrimary}</a>
          <span><Icon name="pin" />{content.site.location}</span>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} {content.site.companyName}.</span>
        <span>Ethiopian coffee · Processing · Warehousing · Export coordination</span>
      </div>
    </footer>
  );
}
