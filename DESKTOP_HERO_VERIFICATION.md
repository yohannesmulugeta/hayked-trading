# Desktop hero logo transition

Verified on 30 October 2026 in Chromium using real 1280px and 1440px frame viewports at 900px high. Additional checks covered a 1280 × 720 desktop and the existing 390 × 844 mobile layout.

## Behaviour

- The existing header Brand link and its image remain the same DOM nodes during scrolling. No hero logo copy is rendered.
- Opening geometry uses the hero's measured centre and the SVG's original proportions. The brand artwork is unchanged.
- During the first 480px of scrolling at a 900px viewport height, the logo shrinks and moves left below the navigation before rising into its reserved header slot.
- The logo has full opacity throughout; it returns to the same opening coordinates on reverse scrolling.
- Desktop header backgrounds remain transparent until the hero's bottom reaches the viewport top, then the existing normal header colours apply.
- The existing mobile breakpoint, menu, hero copy and navigation remain available. Reduced-motion users receive the static docked logo.

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
