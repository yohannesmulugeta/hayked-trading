export function SectionHeading({ eyebrow, title, text, centered = false, light = false }: { eyebrow: string; title: string; text?: string; centered?: boolean; light?: boolean }) {
  return <div className={`section-heading ${centered ? 'section-heading--centered' : ''} ${light ? 'section-heading--light' : ''}`}>
    <span className={`eyebrow ${light ? 'eyebrow--light' : ''}`}>{eyebrow}</span>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </div>;
}
