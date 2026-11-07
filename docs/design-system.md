# Forma design system

## Project-local skills
Installed from https://github.com/elayadesign/ai-design-skills on 2026-11-07. These are project rules, not a runtime dependency or a global personal-skill installation.

- `.agents/skills/landing-page-design/SKILL.md`: upstream blob `519a6f2cd6c942c2fb36a906b8ef7d11f78ba6d1`. Applied to code, content, spacing, states and responsive UI.
- `.agents/skills/figma-designer/SKILL.md`: upstream blob `d9aba588919e3dccee89355df8fa8501c2e92eae`. Installed for future Figma work; no Figma file was requested or created.
- MIT license is included beside the skills. `AGENTS.md` records when to read each skill.

## Audit and changes
The existing studio mixed low-contrast mauve/green metadata, dense 12px form fields, inconsistent text sizes, a cramped icon-only mobile sidebar and numerous similar panels. The catalog did not expose its existing style filter.

The update preserves the warm paper and plum identity, uses one typeface per site, approved text and spacing scales, a restrained neutral surface hierarchy, 44px/48px actions and visible keyboard focus. Catalog previews use real bundled sample imagery; counts come from the existing template and language catalogs. A dedicated style filter and quick niche controls make discovery faster. A native full-height mobile dialog provides focus containment, Escape dismissal and clearly labelled routes. The sidebar remains on desktop.

`app/design-system.css` contains shared tokens and named text styles plus scoped studio and catalog rules. Customer brand values are retained; only targeted readability and motion changes are shared with customer templates. Old template, menu, booking, review, QR, language and authenticated ownership logic remain in place.

## Verification
Run TypeScript, `node tests/backend.mjs` and the Sites production build. Inspect the deployed catalog at desktop and 390px widths, including all restaurant editions, style/niche/search combinations, no-results/reset, favorites, preview close and keyboard focus. Verify no horizontal overflow, loaded hero assets and navigation destinations. The local browser preview route may be unavailable in this environment; use the successful native deployment followed by live browser QA in that case.

Live QA: catalog hero assets loaded; desktop page width equalled scroll width; niche + style filtering selected the Japanese edition; no-result state and reset restored all 27 templates; restaurant phone preview measured 390px with no horizontal overflow. Checks run against actual API handlers continued to pass. Authenticated dashboard rendering was checked by TypeScript/build rather than a signed-in browser session.
