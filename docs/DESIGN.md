# Engineering field notes

The design uses warm paper, charcoal ink, burnt orange and monospace annotations.
The visual reference is an engineering notebook: indexed sections, trace lines,
signal rings and generous typesetting. Three projects get full narratives;
supporting experiments sit in a compact snapshot archive.

## React Bits references

Free components from [David Haz's official React Bits repository](https://github.com/DavidHDev/react-bits),
pinned to `3a1c7f2f9f94ed833934ab5c2635760b9e644583`:

- [SpotlightCard](https://github.com/DavidHDev/react-bits/blob/3a1c7f2f9f94ed833934ab5c2635760b9e644583/src/ts-default/Components/SpotlightCard/SpotlightCard.tsx):
  pointer-position CSS variables for a quiet light effect on the dark system panel.
- [Magnet](https://github.com/DavidHDev/react-bits/blob/3a1c7f2f9f94ed833934ab5c2635760b9e644583/src/ts-default/Animations/Magnet/Magnet.tsx):
  a small magnetic response on the decorative contact arrow.

Both are adapted, not represented as original components. The MIT + Commons
Clause notice is retained in `third-party/` and in the client bundle's linked
legal notice. No paid Pro assets or license keys are used.

## Interaction choices

- The browser model presents three authored states: identical retry, conflicting
  amount and unavailable upstream. It makes no HTTP/API requests. Inspect links
  lead to the corresponding unmerged backend PR, not a fictitious live endpoint.
- Content is rendered at build time. React hydrates the same HTML. With JavaScript
  disabled, case studies, disclosures, snapshots and contact links still work.
- Native buttons expose their selected state; result text uses a polite live
  region. Native details/summary controls avoid custom keyboard semantics.
- Reduced motion and coarse pointers disable decorative effects. A manual pause
  control is provided. No perpetual animation, scroll interception, WebGL, cursor
  replacement, automatically rotating text or hover-only information.
- Magnet uses local pointer events and refs, not a global listener or renders on
  every mouse move. Translation is capped at five pixels on the decorative arrow;
  the email link's hitbox and focus outline remain fixed.
- Local assets, no runtime CDN imports or external fonts. The build enforces a
  90 KiB gzip ceiling for the client bundle.

## Verification status

TypeScript and the static build pass; the 20 existing source/navigation tests and
all four DOM integration tests pass locally. DOM tests exercise the generated
production bundle, including hydration, scenario switching, source links, no
backend calls and motion preferences.

On September 20, 2026, the built site was also inspected in headless Chromium at
1440×1000, 390×844 and 844×390. All three viewports had zero page overflow,
clipped interactive elements, console/page errors or axe WCAG 2.0/2.1 A/AA
violations. Keyboard activation changed the scenario state, native details
opened from the keyboard, reduced/coarse-pointer motion stayed disabled and the
email control retained its `mailto:` destination. Launching a real mail client
was outside the browser sandbox, so only the handoff URL—not delivery—was
verified.

No hosting configuration is changed. Publication still needs an eligible zero-cost
route for a portfolio that mentions scoped projects.
