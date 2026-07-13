import { ButtonLink } from '../components/ButtonLink';

export function NotFoundPage() {
  return <section className="not-found"><div className="container"><span>404</span><h1>Page not found.</h1><p>The page may have moved or the address may be incorrect.</p><ButtonLink to="/" variant="primary">Return home</ButtonLink></div></section>;
}
