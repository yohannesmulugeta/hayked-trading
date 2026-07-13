import { Icon } from './Icon';
import { content } from '../lib/content';

export function FloatingWhatsApp() {
  const href = `https://wa.me/${content.site.whatsapp}?text=${encodeURIComponent('Hello Hayked Trading, I would like to discuss Ethiopian coffee.')}`;
  return <a className="floating-whatsapp" href={href} target="_blank" rel="noreferrer" aria-label="Contact Hayked on WhatsApp">
    <Icon name="whatsapp" /><span>WhatsApp</span>
  </a>;
}
