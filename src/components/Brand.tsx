import type { Ref } from 'react';
import { Link } from 'react-router-dom';
import { content } from '../lib/content';
import { assetUrl } from '../lib/assets';

export function Brand({ inverted = false, compact = false, ref }: { inverted?: boolean; compact?: boolean; ref?: Ref<HTMLAnchorElement> }) {
  const source = inverted ? content.site.logoLight : content.site.logoDark;
  return (
    <Link ref={ref} to="/" className={`brand ${compact ? 'brand--compact' : ''}`} aria-label={`${content.site.companyName} home`}>
      <img src={assetUrl(compact ? content.site.logoIcon : source)} alt={content.site.companyName} />
    </Link>
  );
}
