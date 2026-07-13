import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';

export function ButtonLink({
  to,
  children,
  variant = 'primary',
  external = false,
  className = '',
}: {
  to: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'light' | 'outline' | 'text';
  external?: boolean;
  className?: string;
}) {
  const classes = `button button--${variant} ${className}`.trim();
  const content = <>{children}<Icon name="arrow" /></>;
  if (external) return <a className={classes} href={to} target="_blank" rel="noreferrer">{content}</a>;
  return <Link className={classes} to={to}>{content}</Link>;
}
