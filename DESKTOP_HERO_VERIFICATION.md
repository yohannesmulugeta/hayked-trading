# Desktop hero logo transition

Verified on 30 October 2026 in Chromium using real 1280px and 1440px frame viewports at 900px high. Additional checks covered a 1280 × 720 desktop and the existing 390 × 844 mobile layout.

## Behaviour

- The existing header Brand link and its image remain the same DOM nodes during scrolling. No hero logo copy is rendered.
- Opening geometry uses the hero's measured centre and the SVG's original proportions. The symbol, lettering and colours are preserved; the outer navy background rectangle has been removed for transparency.
- During the first 480px of scrolling at a 900px viewport height, the logo shrinks and moves left below the navigation before rising into its reserved header slot.
- The logo has full opacity throughout; it returns to the same opening coordinates on reverse scrolling.
- Desktop header backgrounds remain transparent until the hero's bottom reaches the viewport top, then the existing normal header colours apply.
- The desktop hero now contains the brand and a scroll control. The headline, introduction and coffee/sample actions are in a separate section below the hero.
- The existing mobile menu and navigation remain available, with a compact photographic opening and the introduction below. Reduced-motion users receive the static docked logo.

## Browser results

| Viewport | Opening logo width | Opening centre error | Halfway | Docked | Return to top |
| --- | ---: | ---: | --- | --- | --- |
| 1280 × 900 | 784.3px | <0.001px | Visible, no nav overlap | 218px wide, visible | Original geometry restored |
| 1440 × 900 | 880px | <0.001px | Visible, no nav overlap | 218px wide, visible | Original geometry restored |

The automated browser sweep checked nine positions in each direction at both desktop widths, plus the header immediately before and after the hero ends. There were no duplicate header brand elements, hidden logos, offscreen logos or navigation intersections. Visual checks also covered opening, halfway, docked and returned positions. The mobile menu opened, navigated to About, closed on navigation and returned home correctly.

## Project checks

- `npm test`: passed, including lint, content validation, TypeScript checking and the Vite production build.
- `git diff --check`: passed.
- Oxlint was added because the project did not previously define a lint script. The TypeScript compiler version was preserved.

## Recovery

The `backup/before-desktop-hero-logo` branch preserves the original site at checkpoint commit `1c069465986060f09eb3581ccc3d4baec304284a`. Revert the implementation commit to roll back through normal Git history; no force push is needed.

The follow-up hero polish has its own recovery branch, `backup/before-transparent-hero-logo`, at `b8fc35b58e1470e35ff5145c62628fd904199a21`. It removes the logo's outer background rectangle and adds stronger photographic contrast.

## Homepage discovery update

Recovery branch: `backup/before-home-discovery`, at `cfbf90d31ae8aec79174f13ea57fda506ebe62f6`.

- Logo-only desktop opening, retaining the existing single-element scroll transition. All hero copy and action buttons now sit below it.
- Five expanding photographic panels for coffee, processing, warehousing, quality and export coordination. Mouse hover, touch/click, keyboard focus, arrow keys, Home and End are supported. Only the expanded panel's content is interactive.
- Locally bundled Natural Earth geography with a scroll-driven world-to-Ethiopia zoom, manual view controls and five selectable coffee-origin markers. Selected origins carry into the existing sample form; a Guji enquiry was verified to prefill correctly.
- The map loads in a separate chunk when its section approaches the viewport. The main application remains approximately 91 kB gzipped; map geography is a separate approximately 59 kB gzipped chunk.
- Mobile panels become a vertical accordion; the mobile map uses view buttons and a separate details card. Reduced-motion users receive static map positioning and no panel transitions.
- A back-to-top control sits above the existing WhatsApp action.
- Origin locations are approximate and availability is explicitly subject to confirmation. Unverified origin examples were not converted into confirmed offers or stock.
