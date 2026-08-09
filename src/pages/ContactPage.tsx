import { Icon } from '../components/Icon';
import { InquiryForm } from '../components/InquiryForm';
import { PageHero } from '../components/PageHero';
import { content } from '../lib/content';

export function ContactPage() {
  const whatsapp = `https://wa.me/${content.site.whatsapp}?text=${encodeURIComponent('Hello Hayked Trading, I would like to discuss Ethiopian coffee.')}`;
  return (
    <>
      <PageHero eyebrow="Contact Hayked" title="Share your coffee or service requirement." text="Tell us what you need, where it is going and your expected volume. Our team can respond by email, phone or WhatsApp." image="/uploads/hayked/009-warehousing-feature-2400x1800.webp" />
      <section className="section section--soft">
        <div className="container contact-grid">
          <div className="contact-panel">
            <span className="eyebrow">Direct contact</span>
            <h2>Choose the fastest route for your enquiry.</h2>
            <div className="contact-methods">
              <a href={`mailto:${content.site.email}`}><Icon name="mail" /><span><small>Email</small><strong>{content.site.email}</strong></span></a>
              <a href={`tel:${content.site.phonePrimary.replace(/\s/g, '')}`}><Icon name="phone" /><span><small>Phone</small><strong>{content.site.phonePrimary}</strong></span></a>
              <a href={`tel:${content.site.phoneSecondary.replace(/\s/g, '')}`}><Icon name="phone" /><span><small>Alternative phone</small><strong>{content.site.phoneSecondary}</strong></span></a>
              <a href={whatsapp} target="_blank" rel="noreferrer"><Icon name="whatsapp" /><span><small>WhatsApp</small><strong>Start a chat</strong></span></a>
              <div><Icon name="pin" /><span><small>Location</small><strong>{content.site.location}</strong></span></div>
            </div>
            <p className="contact-hours">{content.site.hours}</p>
          </div>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
