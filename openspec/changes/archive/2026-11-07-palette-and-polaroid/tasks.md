# Tasks

## 1. Theme tokens

- [x] 1.1 Rewrite the `@theme` color block in `src/routes/layout.css` with the role-based tokens and values from specs/visual-theme (rename `accent-hover`, `accent-raised`, `on-accent*` and `highlight`; add `tag`, `surface-inverse`, `accent-text`; give `accent` #8B5CF6). Update the comment above the block to list the role names. Verify every token in the spec table is present with its exact value.

## 2. Reassign color usages by role

- [x] 2.1 Atoms: `Chip` hover becomes `bg-accent-text border-accent-text text-white`. `Logo` dot uses `text-accent`. `SectionHeading` uses `text-accent-text` (light) and `text-accent-on-inverse`/`text-on-inverse-muted` (dark). `NavLink` active uses `text-accent-text`. Verify with `bun run check` and a visual check of the header and about chips.
- [x] 2.2 Header and menu: the progress fill uses `bg-accent`; the next button uses `bg-accent text-white`; `MobileMenu` active uses `text-accent-text`. Verify the next-button icon is white on purple in the browser.
- [x] 2.3 Dark surfaces: `ProjectsSection` panel, `ProjectCard` (`surface-inverse-raised`, `on-inverse*`, `accent-on-inverse` links), the badge mapping (`highlight` to `accent-on-inverse`, `neutral` to `surface-muted`, both `text-foreground`), `ReadingCard` dark tone (`surface-inverse`, `on-inverse*`) and light-tone title (`accent`), and `ContactCard` hover (`surface-inverse`/`on-inverse`). Verify the Projects panel is night blue, not purple.
- [x] 2.4 Large accent text: "Hola, soy" (`HeroSection`), "diseño" (`AboutSection`) and "o sigue mis redes" (`ContactSection`) use `text-accent`. Verify visually in each section.
- [x] 2.5 Timeline: `TimelineEntry` markers use `outline-accent` ring, `bg-accent` for work, `bg-background` for projects; the role line and link use `text-accent-text hover:text-link-hover`; the tag pill uses `bg-tag`. `ExperienceSection` line stays `bg-line`. Verify the first two markers are filled purple.
- [x] 2.6 `Footer` "Volver al inicio" uses `text-accent-text hover:text-link-hover`. `FormationSection` keeps `bg-surface-muted` (now ice blue). Verify "04" reads #6D28D9 on #BFDFEE.
- [x] 2.7 Project detail page `src/routes/proyectos/[slug]/+page.svelte`: dark block uses `surface-inverse`/`on-inverse*`; badges match 2.3; links use `text-accent-text hover:text-link-hover`. Verify by loading `/proyectos/notely` and `/proyectos/suni`.

## 3. PolaroidPhoto molecule

- [x] 3.1 Create `src/lib/components/molecules/PolaroidPhoto.svelte` per design.md: `$props` with `src`, `alt` (required), `rotate = 3`, `tapeColor` defaulting to `color-mix(in srgb, var(--color-accent-on-inverse) 75%, transparent)`, `class` passthrough; `<figure>` with a decorative tape `<div aria-hidden="true">` (z-index above the image) and an `<img loading="eager" fetchpriority="high">`; no figcaption; the brief's exact sizes with shadow `color-mix(in srgb, var(--color-foreground) 18%, transparent)` and image background `var(--color-surface-inverse)`. Verify with `bun run check` and `bun run lint`.
- [x] 3.2 In `HeroSection.svelte`, replace the arch-framed `div`/`img` with `<PolaroidPhoto src={photo} alt="Foto de Jorge Alvarez" />`, keeping the column wrapper and "Desliza para explorar" button. Verify in the browser that the tape is fully visible, the face is not cropped, and the photo request is not lazy.

## 4. Audit and review

- [x] 4.1 Grep `src` and `static` case-insensitively for every old hex value listed in specs/visual-theme plus their rgb()/rgba() forms, and for any remaining `accent-hover`, `accent-raised`, `on-accent` or `highlight` classes. Verify there are zero matches and save the grep output for the summary.
- [x] 4.2 Run `bun run check`, `bun run lint` and `bun run build`. Verify all pass.
- [x] 4.3 Screenshot at 1440x900 every home section (Hero, Sobre mí, Proyectos, Experiencia, Formación, Contacto) and `/proyectos/notely` and `/proyectos/suni`, using Playwright against the preview build. Verify the files exist and report their absolute paths with the list of changed files.
