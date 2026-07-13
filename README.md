# Hayked General Trading PLC — Dynamic Website Demo

A premium, content-managed React website for presenting Hayked's Ethiopian coffee, processing, warehousing, quality and export-coordination services.

## Technology

- React + Vite + TypeScript
- Tailwind CSS build pipeline with a custom responsive design system
- React Router
- Local JSON content
- Local WebP images
- Pages CMS configuration in `.pages.yml`
- Cloudflare Pages-ready SPA routing in `public/_redirects`
- No database, Supabase or paid service

## Run locally on Windows

### Requirements

Install an active Node.js LTS release. This project requires Node.js 20.19 or later.

Open PowerShell in the project folder and run:

```powershell
npm install
npm run dev
```

Open the local address shown by Vite, normally:

```text
http://localhost:5173
```

Keep PowerShell open while using the website. Press `Ctrl + C` to stop it.

### Production build

```powershell
npm run build
npm run preview
```

The deployable files are generated in `dist`.

### If npm is broken on Windows

Do not copy a `node_modules` folder from another computer. Delete it and reinstall:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
npm cache verify
npm install
npm run dev
```

If npm shows `Exit handler never called`, reinstall the current Node.js LTS version and open a new PowerShell window.

## Editable content structure

```text
src/content/
  site.json
  pages/
    home.json
    about.json
    quality.json
    sustainability.json
  coffees/
  origins/
  services/
  gallery/
```

Every coffee, origin, service and gallery item is an individual JSON file. The application loads these collections automatically during the build through `import.meta.glob`.

## Pages CMS setup

The project includes a root-level `.pages.yml` file. It defines:

- Site contact and brand settings
- Homepage, About, Quality and Sustainability content
- Coffee collection
- Origin collection
- Service collection
- Gallery collection
- Upload destination: `public/uploads`

Setup steps:

1. Push this project to a GitHub repository.
2. Sign in to Pages CMS using GitHub.
3. Authorize the Pages CMS GitHub application for the repository.
4. Open the repository and select the production branch, normally `main`.
5. Pages CMS reads `.pages.yml` automatically.
6. Edit content or upload images and publish the change.
7. Pages CMS commits the change to GitHub.
8. Cloudflare Pages rebuilds the website automatically.

Important: adding or deleting collection entries changes the repository and requires a new Cloudflare build. This is expected for a static content-managed website.

## Cloudflare Pages deployment

1. Push the clean source project to GitHub.
2. In Cloudflare, open **Workers & Pages**.
3. Select **Create application → Pages → Import an existing Git repository**.
4. Select the GitHub repository.
5. Use these build settings:

```text
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: /
```

6. Select **Save and Deploy**.
7. Cloudflare provides a free `pages.dev` address.
8. Every new commit to the selected branch automatically triggers a new deployment.

## Inquiry forms

The website remains database-free. The forms:

- Validate required fields in the browser
- Prepare a structured email using `mailto:`
- Prepare a structured WhatsApp message
- Do not store visitor information

Update the email, phone and WhatsApp values in:

```text
src/content/site.json
```

## Logo files

The refined vector logo family is in:

```text
public/brand/
  hayked-icon.svg
  hayked-logo-dark.svg
  hayked-logo-horizontal.svg
  hayked-logo-white.svg
  hayked-logo-stacked.svg
```

The favicon is `public/favicon.svg`.

## Images

All current photography is locally stored as optimized WebP files under `public/uploads`. These are illustrative free-use images, not claimed as Hayked facilities, staff or owned photography. See `public/uploads/IMAGE_CREDITS.md`.

Replace them with approved Hayked photos before a production launch.

## Content integrity

The website intentionally avoids inventing:

- Coffee grades or scores
- Crop years
- Export quantities
- Warehouse capacity
- Certifications
- Buyer names
- Countries served
- Technical machinery specifications

Coffee or origin entries still awaiting confirmation are visibly identified through content status fields.

## Quality commands

```powershell
npm run typecheck
npm run build
```

See `BUILD_AND_TEST_REPORT.md` for the completed verification summary.
