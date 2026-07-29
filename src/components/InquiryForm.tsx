import { type FormEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { content } from '../lib/content';
import { Icon } from './Icon';

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  interest: string;
  coffee: string;
  volume: string;
  destination: string;
  message: string;
};

export function InquiryForm({ mode = 'general' }: { mode?: 'general' | 'sample' }) {
  const [params] = useSearchParams();
  const queryCoffee = params.get('coffee') ?? '';
  const queryType = params.get('type') ?? '';
  const initialInterest = mode === 'sample' || queryCoffee
    ? 'Coffee sample request'
    : queryType === 'offer'
      ? 'Current coffee offer'
      : queryType === 'services'
        ? 'Processing or warehousing service'
        : queryType
          ? `${queryType.charAt(0).toUpperCase()}${queryType.slice(1)} service`
          : 'General coffee inquiry';

  const [form, setForm] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    interest: initialInterest,
    coffee: queryCoffee,
    volume: '',
    destination: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const plainMessage = useMemo(() => [
    `Name: ${form.name}`,
    `Company: ${form.company}`,
    `Business email: ${form.email}`,
    `Phone / WhatsApp: ${form.phone || 'Not provided'}`,
    `Country: ${form.country}`,
    `Requirement: ${form.interest}`,
    `Coffee: ${form.coffee || 'Not specified'}`,
    `Estimated volume: ${form.volume || 'Not specified'}`,
    `Destination: ${form.destination || 'Not specified'}`,
    '',
    `Message: ${form.message || 'No additional message'}`,
  ].join('\n'), [form]);

  const emailHref = useMemo(() => {
    const subject = encodeURIComponent(`Website enquiry — ${form.interest || 'Hayked Trading'}`);
    return `mailto:${content.site.email}?subject=${subject}&body=${encodeURIComponent(plainMessage)}`;
  }, [form.interest, plainMessage]);

  const whatsappHref = useMemo(() => `https://wa.me/${content.site.whatsapp}?text=${encodeURIComponent(`Hello Hayked Trading,\n\n${plainMessage}`)}`, [plainMessage]);

  function validate() {
    if (!form.name || !form.company || !form.email || !form.country || !form.interest) {
      setStatus('Please complete the required fields before preparing the enquiry.');
      return false;
    }
    setStatus('');
    return true;
  }

  function submitEmail(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setStatus('Your email application should open with the enquiry prepared.');
    window.location.href = emailHref;
  }

  function openWhatsApp() {
    if (!validate()) return;
    setStatus('WhatsApp should open with the enquiry prepared.');
    window.open(whatsappHref, '_blank', 'noopener,noreferrer');
  }

  const set = (key: keyof FormData, value: string) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <form className="inquiry-form" onSubmit={submitEmail} noValidate>
      <div className="form-heading">
        <span className="eyebrow">Structured enquiry</span>
        <h2>{mode === 'sample' ? 'Request a coffee sample' : 'Tell us what you need'}</h2>
        <p>Required fields are marked with an asterisk.</p>
      </div>
      <div className="form-grid">
        <label>Full name *<input required value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Your name" autoComplete="name" /></label>
        <label>Company *<input required value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Company name" autoComplete="organization" /></label>
        <label>Business email *<input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="name@company.com" autoComplete="email" /></label>
        <label>Phone / WhatsApp<input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="Include country code" autoComplete="tel" /></label>
        <label>Country *<input required value={form.country} onChange={(e) => set('country', e.target.value)} placeholder="Your country" autoComplete="country-name" /></label>
        <label>Requirement *<select required value={form.interest} onChange={(e) => set('interest', e.target.value)}>
          <option>Coffee sample request</option>
          <option>Current coffee offer</option>
          <option>Commercial coffee inquiry</option>
          <option>Specialty coffee inquiry</option>
          <option>Processing or warehousing service</option>
          <option>General coffee inquiry</option>
        </select></label>
        <label>Coffee or origin<input value={form.coffee} onChange={(e) => set('coffee', e.target.value)} placeholder="Coffee, origin or process" /></label>
        <label>Estimated volume<input value={form.volume} onChange={(e) => set('volume', e.target.value)} placeholder="Example: 1 container" /></label>
        <label className="form-grid__wide">Destination / port<input value={form.destination} onChange={(e) => set('destination', e.target.value)} placeholder="Destination country or port" /></label>
      </div>
      <label>Additional requirements<textarea rows={5} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Grade, process, crop timing, packaging, documents, sample courier details, or service requirements" /></label>
      <div className="form-actions">
        <button className="button button--primary" type="submit">Prepare email <Icon name="mail" /></button>
        <button className="button button--whatsapp" type="button" onClick={openWhatsApp}>Prepare WhatsApp <Icon name="whatsapp" /></button>
      </div>
      <p className="form-note"><Icon name="shield" /> This static website does not save the form. It prepares a message in your email or WhatsApp application.</p>
      {status && <p className="form-status" role="status">{status}</p>}
    </form>
  );
}
