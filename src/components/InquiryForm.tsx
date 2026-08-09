import { type FormEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { content } from '../lib/content';
import { Icon } from './Icon';

type FormData = {
  name: string; company: string; email: string; phone: string; country: string;
  interest: string; coffee: string; volume: string; destination: string; message: string; website: string;
};

type RequiredField = 'name' | 'company' | 'email' | 'country' | 'interest';

export function InquiryForm({ mode = 'general' }: { mode?: 'general' | 'sample' }) {
  const [params] = useSearchParams();
  const queryCoffee = params.get('coffee') ?? '';
  const queryType = params.get('type') ?? '';
  const initialInterest = mode === 'sample' || queryCoffee
    ? 'Coffee sample request'
    : queryType === 'offer' ? 'Current coffee offer'
      : queryType === 'services' ? 'Processing or warehousing service'
        : queryType ? `${queryType.charAt(0).toUpperCase()}${queryType.slice(1)} service`
          : 'General coffee inquiry';

  const [form, setForm] = useState<FormData>({
    name: '', company: '', email: '', phone: '', country: '', interest: initialInterest,
    coffee: queryCoffee, volume: '', destination: '', message: '', website: '',
  });
  const [errors, setErrors] = useState<Partial<Record<RequiredField, string>>>({});
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined;

  const plainMessage = useMemo(() => [
    `Name: ${form.name}`, `Company: ${form.company}`, `Business email: ${form.email}`,
    `Phone / WhatsApp: ${form.phone || 'Not provided'}`, `Country: ${form.country}`,
    `Requirement: ${form.interest}`, `Coffee: ${form.coffee || 'Not specified'}`,
    `Estimated volume: ${form.volume || 'Not specified'}`, `Destination: ${form.destination || 'Not specified'}`,
    '', `Message: ${form.message || 'No additional message'}`,
  ].join('\n'), [form]);

  const emailHref = useMemo(() => {
    const subject = encodeURIComponent(`Website enquiry — ${form.interest || 'Hayked Trading'}`);
    return `mailto:${content.site.email}?subject=${subject}&body=${encodeURIComponent(plainMessage)}`;
  }, [form.interest, plainMessage]);
  const whatsappHref = useMemo(() => `https://wa.me/${content.site.whatsapp}?text=${encodeURIComponent(`Hello Hayked Trading,\n\n${plainMessage}`)}`, [plainMessage]);

  function validate() {
    const next: Partial<Record<RequiredField, string>> = {};
    if (!form.name.trim()) next.name = 'Enter your full name.';
    if (!form.company.trim()) next.company = 'Enter your company name.';
    if (!form.email.trim()) next.email = 'Enter your business email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.country.trim()) next.country = 'Enter your country.';
    if (!form.interest) next.interest = 'Choose a requirement.';
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus('Please correct the highlighted fields.');
      return false;
    }
    setStatus('');
    return true;
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    if (!endpoint) {
      setStatus('Your email application should open with the enquiry prepared.');
      window.location.href = emailHref;
      return;
    }
    setSubmitting(true);
    setStatus('Sending your enquiry…');
    try {
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('Thank you. Your enquiry was sent to the Hayked team.');
      setForm((current) => ({ ...current, name: '', company: '', email: '', phone: '', country: '', coffee: '', volume: '', destination: '', message: '', website: '' }));
    } catch {
      setStatus(`We could not send the form. Please use email or WhatsApp below.`);
    } finally {
      setSubmitting(false);
    }
  }

  function openWhatsApp() {
    if (!validate()) return;
    setStatus('WhatsApp should open with the enquiry prepared.');
    window.open(whatsappHref, '_blank', 'noopener,noreferrer');
  }

  const set = (key: keyof FormData, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (key in errors) setErrors((current) => ({ ...current, [key]: undefined }));
  };
  const fieldError = (key: RequiredField) => errors[key] ? <span className="field-error" id={`${key}-error`}>{errors[key]}</span> : null;

  return (
    <form className="inquiry-form" onSubmit={submit} noValidate>
      <div className="form-heading">
        <span className="eyebrow">Structured enquiry</span>
        <h2>{mode === 'sample' ? 'Request a coffee sample' : 'Tell us what you need'}</h2>
        <p>Required fields are marked with an asterisk.</p>
      </div>
      <div className="form-grid">
        <label>Full name *<input required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />{fieldError('name')}</label>
        <label>Company *<input required aria-invalid={!!errors.company} aria-describedby={errors.company ? 'company-error' : undefined} value={form.company} onChange={(e) => set('company', e.target.value)} autoComplete="organization" />{fieldError('company')}</label>
        <label>Business email *<input required type="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} value={form.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" />{fieldError('email')}</label>
        <label>Phone / WhatsApp<input value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="Include country code" autoComplete="tel" /></label>
        <label>Country *<input required aria-invalid={!!errors.country} aria-describedby={errors.country ? 'country-error' : undefined} value={form.country} onChange={(e) => set('country', e.target.value)} autoComplete="country-name" />{fieldError('country')}</label>
        <label>Requirement *<select required aria-invalid={!!errors.interest} aria-describedby={errors.interest ? 'interest-error' : undefined} value={form.interest} onChange={(e) => set('interest', e.target.value)}>
          <option>Coffee sample request</option><option>Current coffee offer</option><option>Commercial coffee inquiry</option>
          <option>Specialty coffee inquiry</option><option>Processing or warehousing service</option><option>General coffee inquiry</option>
        </select>{fieldError('interest')}</label>
        <label>Coffee or origin<input value={form.coffee} onChange={(e) => set('coffee', e.target.value)} placeholder="Coffee, origin or process" /></label>
        <label>Estimated volume<input value={form.volume} onChange={(e) => set('volume', e.target.value)} placeholder="Example: 1 container" /></label>
        <label className="form-grid__wide">Destination / port<input value={form.destination} onChange={(e) => set('destination', e.target.value)} placeholder="Destination country or port" /></label>
      </div>
      <label className="form-honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set('website', e.target.value)} /></label>
      <label>Additional requirements<textarea rows={5} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Grade, process, crop timing, packaging, documents, sample courier details, or service requirements" /></label>
      <div className="form-actions">
        <button className="button button--primary" type="submit" disabled={submitting}>{submitting ? 'Sending…' : endpoint ? 'Send enquiry' : 'Prepare email'} <Icon name="mail" /></button>
        <button className="button button--whatsapp" type="button" onClick={openWhatsApp}>Prepare WhatsApp <Icon name="whatsapp" /></button>
      </div>
      <p className="form-note"><Icon name="shield" /> {endpoint ? 'Your details are used only to respond to this enquiry.' : 'This website does not save this form. It prepares a message in your email or WhatsApp application.'}</p>
      {status && <p className="form-status" role="status" aria-live="polite">{status}</p>}
    </form>
  );
}
