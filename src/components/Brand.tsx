import { Link } from 'react-router-dom';
import { content } from '../lib/content';

export function Brand({ inverted = false, compact = false }: { inverted?: boolean; compact?: boolean }) {
  const source = inverted ? content.site.logoLight : content.site.logoDark;
  return (
    <Link to="/" className={`brand ${compact ? 'brand--compact' : ''}`} aria-label={`${content.site.companyName} home`}>
      <img src={compact ? content.site.logoIcon : source} alt={content.site.companyName} />
    </Link>
  );
}
