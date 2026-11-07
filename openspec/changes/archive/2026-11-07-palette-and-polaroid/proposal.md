# Proposal

## Why

The portfolio's green palette no longer fits the owner's identity. It moves to ice blue (#BFDFEE), deep night blue (#142B3F) and purple. At the same time the hero's arch-framed photo becomes a taped polaroid, a more personal look built as a reusable component.

## What Changes

- Replace every color token in the Tailwind `@theme` block with the new palette. Only colors change: layout, spacing, type and shapes stay as they are.
- Rename tokens so names describe a role instead of the old green. **BREAKING** for component classes: today `accent` is the dark green surface and also colors purple-destined text and graphics, so each usage is reassigned by role (`surface-inverse`, `on-inverse*`, `accent-on-inverse`, `link-hover`, `tag`, new `accent` and `accent-text`).
- Introduce two purples for light backgrounds: `accent` #8B5CF6 for large text and graphics, `accent-text` #6D28D9 for small text (passes WCAG AA on every light background, including the Formación ice blue). Use #C4B5FD (`accent-on-inverse`) on dark panels and for the polaroid tape.
- Chip hover uses #6D28D9 with white text (7.1:1) instead of the 4.23:1 white-on-#8B5CF6 pairing from the brief.
- Keep the green "Disponible" status dot (#2F9E6B).
- Add `molecules/PolaroidPhoto.svelte` (Svelte 5 runes): a white-framed, tilted `<figure>` with a decorative tape strip and an eagerly loaded photo, no caption.
- Replace the hero's arch-framed photo with `PolaroidPhoto` using `profile.webp`.
- Remove all hardcoded colors from old palette values; components read tokens only.

Out of scope: i18n (the polaroid `alt` is a plain prop for now; the hero passes the Spanish text), a dark theme, any layout or typography change.

## Capabilities

### New Capabilities

- `visual-theme`: the site's color tokens, their roles, the rule that components use tokens instead of hardcoded colors, and the contrast floor for text and graphics.

### Modified Capabilities

- `portfolio-sections`: "Visual design matches the reference" now takes its palette from `visual-theme` instead of the reference file; "Hero section" shows the profile photo as a taped polaroid instead of an arch-shaped frame.

## Impact

- `src/routes/layout.css` (`@theme` tokens)
- Atoms: `Chip`, `Logo`, `SectionHeading`
- Molecules: `ContactCard`, `Footer`, `Header`, `MobileMenu`, `ProjectCard`, `ReadingCard`, `TimelineEntry`, new `PolaroidPhoto`
- Organisms: `AboutSection`, `ContactSection`, `ExperienceSection`, `FormationSection`, `HeroSection`, `ProjectsSection`
- Route: `src/routes/proyectos/[slug]/+page.svelte`, plus any other file the token audit finds
- No new dependencies, no API changes.
