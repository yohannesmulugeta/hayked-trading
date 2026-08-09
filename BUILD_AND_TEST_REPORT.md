# Build and Test Report

## Current implementation

- Six approved Hayked photographs optimized and mapped to their production layouts
- Source-first Vite build with generated root assets removed
- Separate clean-URL custom-domain and hash-routed GitHub Pages deployments
- Public coffee catalogue limited to explicitly published entries
- Route-specific SEO metadata, canonical URLs, sitemap, robots and Organization data
- Accessible skip navigation, focus states, mobile-menu Escape handling and gallery focus management
- Validated enquiry form with email and WhatsApp fallback
- Optional Cloudflare Pages Function for direct delivery through Resend
- Content-reference validation included in CI

## Verified builds

- `npm test`: passed
- Custom-domain Vite production build: passed
- GitHub Pages `/hayked-trading/` build with hash routing: passed
- TypeScript strict check: passed
- Content JSON and local media references: passed
- Git whitespace/error check: passed

The direct enquiry endpoint becomes active only after its deployment variables and Resend sender domain are configured. See `README.md` and `.env.example`.
