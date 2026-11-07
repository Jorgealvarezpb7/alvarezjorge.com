# Design

## Context

Colors live in the Tailwind v4 `@theme` block in `src/routes/layout.css`. No component hardcodes an old palette value today. The problem is meaning: `--color-accent` (#173F35) is used both as the dark surface (Projects panel, ReadingCard, chip and contact hover, hero photo backing) and as the accent for italic serif text, section indexes, nav state, links, the logo dot, the progress bar, the next button and timeline markers. The new palette splits those roles across different colors, so a value swap is not enough. See proposal.md for motivation and specs/visual-theme for the token table.

## Goals / Non-Goals

**Goals:**

- Every color class names a role, so a future dark theme is a value swap in `@theme`.
- Per-usage reassignment of `accent`, decided from the role each element plays.
- A reusable `PolaroidPhoto` molecule with no colors of its own beyond tokens.

**Non-Goals:**

- No i18n wiring. `alt` is a plain required prop.
- No hover or motion on the polaroid.
- No change to class names other than color utilities.

## Decisions

### Rename, then reassign

Old tokens map to new names as follows. Every usage is then checked against its role, because the old `accent` splits three ways.

| Old token                                        | New token(s)                                                                                         |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `accent` (#173F35)                               | `surface-inverse` for dark fills; `accent` for large text and graphics; `accent-text` for small text |
| `accent-hover`                                   | `link-hover`                                                                                         |
| `accent-raised`                                  | `surface-inverse-raised`                                                                             |
| `on-accent`, `on-accent-body`, `on-accent-muted` | `on-inverse`, `on-inverse-body`, `on-inverse-muted`                                                  |
| `highlight`                                      | `accent-on-inverse`                                                                                  |
| `surface-muted` (#E2E8E0)                        | `surface-muted` (#BFDFEE) for Formación; new `tag` (#DCEDF5) for experience tag pills                |
| others                                           | same name, new value                                                                                 |

Alternative considered: keep `accent` as the dark surface and add `purple`. Rejected because it keeps a hue name and leaves `accent` meaning "not an accent".

Reassignments of the old `accent`, by file:

- `surface-inverse`: `ProjectsSection` panel, `ProjectCard` panel, `ReadingCard` background, `[slug]` page dark block.
- `accent`: `HeroSection` "Hola, soy", `AboutSection` "diseño", `ContactSection` "o sigue mis redes", `Logo` dot, `Header` progress fill and next button (with `text-white`), `TimelineEntry` work-marker fill and every marker's outline ring.
- `accent-text`: `SectionHeading` light tone, `MobileMenu` and desktop nav active state, `TimelineEntry` role and link, `Footer` "Volver al inicio", `[slug]` page links.
- `Chip` hover: `bg-accent-text border-accent-text text-white`.
- `ContactCard` hover: `surface-inverse` background with `on-inverse` text (same dark look as today).
- `ReadingCard`: the dark tone ("Head First Java") uses `surface-inverse`. On the light tone, the 34px serif title uses `accent`, since it is large text.
- `NavLink` (atoms) active state uses `accent-text`.

Project badges: `badge: 'neutral'` (the Suni "Plataforma de voluntariado" badge) moves from `bg-on-accent` to `bg-surface-muted`. `badge: 'highlight'` ("Proyecto open source") uses `bg-accent-on-inverse`. Both keep `text-foreground`. This applies in `ProjectCard` and on the `[slug]` page. "Ver detalle" and "Ver en GitHub" links on the dark card use `accent-on-inverse`.

### Two light-background purples plus one for dark panels

`accent` #8B5CF6 is 3.96:1 on `background`, which passes only for large text and graphics. `accent-text` #6D28D9 is 6.64:1 on `background` and 5.08:1 on `surface-muted`, so one small-text purple works on every light section. The brief's #7C4DEB was rejected because it reaches only 3.64:1 on Formación's #BFDFEE. On dark panels #C4B5FD reaches 7.86:1. Chip hover uses #6D28D9, since white on #8B5CF6 is 4.23:1 at 15px.

### White as a literal

White text and icons on purple fills (next button, chip hover) use Tailwind's `text-white`. White frames use the existing `surface` token. This is the only allowed literal, as the visual-theme spec states.

### PolaroidPhoto molecule

`src/lib/components/molecules/PolaroidPhoto.svelte`, Svelte 5 runes only:

```ts
let {
	src,
	alt,
	rotate = 3,
	tapeColor = DEFAULT_TAPE,
	class: className = ''
}: { src: string; alt: string; rotate?: number; tapeColor?: string; class?: string } = $props();
```

- `DEFAULT_TAPE = 'color-mix(in srgb, var(--color-accent-on-inverse) 75%, transparent)'`. Using a token-based default keeps the "no hardcoded colors" rule while still accepting any CSS color through the prop.
- Root `<figure class={className}>` with `style:transform="rotate({rotate}deg)"` and `style:--tape={tapeColor}`.
- Styles use the brief's exact values in a scoped `<style>` block, since they are fixed pixel values that read clearer as CSS than as arbitrary Tailwind classes:
  - figure: margin 0; position relative; width 100%; max-width 360px; background `var(--color-surface)`; padding 16px 16px 64px; box-sizing border-box; box-shadow 0 18px 40px rgba(20, 43, 63, 0.18).
  - tape: position absolute; top -16px; left 50%; width 120px; height 34px; margin-left -60px; background `var(--tape)`; transform rotate(-4deg); z-index 1.
  - img: display block; width 100%; aspect-ratio 4 / 5; object-fit cover; object-position center top; background `var(--color-surface-inverse)`.
- The shadow's rgba is #142B3F at 18%. It could be written as `color-mix(in srgb, var(--color-foreground) 18%, transparent)` to avoid a literal; prefer that form.
- `<img loading="eager" fetchpriority="high" decoding="async">`.
- No hover effect, so no reduced-motion rule is needed. If one is added later, wrap it in `@media (prefers-reduced-motion: no-preference)`.

### Hero integration

In `HeroSection.svelte`, the arch `div` and its `img` are replaced by `<PolaroidPhoto src={photo} alt="Foto de Jorge Alvarez" />`. The column wrapper and "Desliza para explorar" button stay. The polaroid's tape overhangs the frame by 16px and the frame is rotated, so it needs vertical room; the column's existing `gap-6` and section padding should hold it. Check this in the screenshot.

## Risks / Trade-offs

- [A usage is reassigned to the wrong role, for example a dark fill turns purple] → Go through the reassignment list file by file, then compare screenshots of every section.
- [`color-mix()` support] → Supported in all current evergreen browsers. Tailwind v4 already depends on it for opacity modifiers.
- [The polaroid is narrower (360px) than the old arch (400px), which shifts hero balance] → Accepted by the brief. The layout classes stay the same.
- [The Suni badge reuses `surface-muted`, so a later Formación color change also changes the badge] → Acceptable; both are "soft ice-blue surface".

## Migration Plan

One commit set on the `redesign-adjustments` branch. Rollback is a revert. No data or API is involved.
