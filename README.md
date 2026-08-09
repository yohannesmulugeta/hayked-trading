# Hayked General Trading PLC

Production-source website for [haykedtrading.com](https://haykedtrading.com), built with React, Vite and TypeScript. The same source also deploys to the GitHub Pages preview.

## Local development

Requires Node.js 20.19 or later.

```bash
npm ci
npm run dev
```

Quality checks and production build:

```bash
npm test
npm run preview
```

`npm test` validates content references, runs TypeScript and creates the production bundle.

## Content and approved photography

Editable content lives in `src/content`. Pages CMS reads `.pages.yml` and uploads media to `public/uploads`.

The approved, optimized Hayked photography is in `public/uploads/hayked`:

- 011: homepage, coffee and sustainability hero
- 009: facility feature and contact hero
- 007: quality control, coffee offer and sample-request hero
- 012: about-page hero
- 013: warehouse/facility story
- 017: services/processing hero

Coffee entries are visible only when their `published` field is `true`. This prevents incomplete catalogue records from leaking into the public build.

## Deployment

### GitHub Pages preview

`.github/workflows/deploy.yml` builds with `/hayked-trading/` as the asset base and hash routing, then deploys the `dist` artifact using GitHub Pages Actions. Do not commit generated `dist` files to the repository root.

### Cloudflare Pages / custom domain

Use these project settings:

```text
Build command: npm run build
Build output directory: dist
Node version: 22
```

`public/_redirects` provides SPA routing on Cloudflare Pages. The custom domain build uses normal clean URLs.

## Enquiry form

Without configuration, enquiries open the visitor’s email application or WhatsApp with a structured message. To enable direct submission:

1. Copy the public setting from `.env.example` into the Cloudflare build variables:

   ```text
   VITE_ENQUIRY_ENDPOINT=/api/enquiry
   ```

2. Add these Cloudflare Pages Function secrets/variables:

   ```text
   RESEND_API_KEY
   ENQUIRY_TO_EMAIL
   ENQUIRY_FROM_EMAIL
   ```

3. Verify the sender domain in Resend. The function validates and limits all input, uses a honeypot, and sets the visitor’s address as the reply-to address.

If the endpoint is unavailable, the interface keeps the email and WhatsApp fallback visible.

## SEO and routing

Route-specific titles, descriptions, canonical links and social metadata are managed by `src/components/Seo.tsx`. `public/sitemap.xml`, `public/robots.txt` and Organization structured data are included for the custom domain.

## Contact content

Company name, email, both phone numbers, WhatsApp, location and opening hours are maintained in `src/content/site.json`.
