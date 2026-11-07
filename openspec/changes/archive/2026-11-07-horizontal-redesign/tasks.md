# Tasks

The project has no unit test runner, so tasks are verified with `npm run check` (svelte-check), `npm run lint`, `npm run build`, and observable behavior in `npm run dev` / `npm run preview`. "Compare with reference" means opening `horizontal-scroll-reference.html` and the page side by side at the stated viewport.

## 1. Foundation: tokens, registry, data

- [x] 1.1 Replace the `@theme` block in `src/routes/layout.css` with the D1 palette and the three font-family tokens, remove `scroll-padding-top`, and add a `no-scrollbar` `@utility`. Verify: `npm run check` passes and `grep -rn "googleapis" src` returns nothing.
- [x] 1.2 Add the seven `@font-face` rules from D1 to `layout.css` (`font-display: swap`, relative `url()` into `src/lib/fonts/`). Verify: `npm run build` emits seven hashed `.woff2` assets, and in dev the browser's network panel loads them from the local origin while computed styles show Inter, Space Grotesk and Instrument Serif in use.
- [x] 1.3 Create `src/lib/data/sections.ts` with the ordered `{ id, label }` registry (`hero, about, projects, experience, formation, contact`). Verify: `npm run check` passes.
- [x] 1.4 Create `src/lib/data/projects.ts` by moving the project array out of `ProjectsSection.svelte`, adding a `Project` type and the `slug` and `badge` fields. Verify: `npm run check` passes and `ProjectsSection.svelte` imports the data from the new module.

## 2. Navigation module

- [x] 2.1 Create `src/lib/navigation/section-nav.svelte.ts` with the `SectionNav` class (`active`, `progress`, `horizontal` from `MediaQuery('min-width: 768px')`, `goTo`, `next`, `prev`, `attach`) and `setSectionNav` / `getSectionNav` context helpers, per D3. Verify: `npm run check` passes.
- [x] 2.2 Implement the horizontal-mode listeners in `attach`: rAF-throttled scroll tracking of `active` and `progress`, the wheel handler with ctrl/horizontal/inner-scroll/edge bail-outs (D4), and the ArrowLeft/Right and PageUp/Down handler that ignores editable targets. Verify in dev at 1440x900: wheel-down on the hero moves the track, ArrowRight advances one panel, and wheel at the last panel does nothing.
- [x] 2.3 Implement vertical-mode tracking with an `IntersectionObserver` (`rootMargin '-50% 0px -50% 0px'`), and swap listeners when `horizontal` changes. Verify in dev: resizing from 1200px to 600px switches layout and active-section tracking without a reload.
- [x] 2.4 Implement hash sync and restore per D5: `replaceState` from `$app/navigation`, the programmatic-scroll guard with `scrollend` plus an 800 ms fallback, instant positioning on mount and on `hashchange`, unknown hash mapped to `hero`, and `behavior: 'auto'` under `prefers-reduced-motion`. Verify in dev: scrolling to experience shows `/#experience`, browser back doesn't step through sections, and opening `/#projects` at 1440px shows the projects panel while `/#nope` shows the hero.

## 3. Shell: page track and header

- [x] 3.1 Rebuild `src/routes/+page.svelte` as the shell from D7: a root that is `h-dvh flex flex-col` on `md`+, `Header`, and a `<main>` track using `bind:this`, which creates `SectionNav`, provides it via context, and calls `attach`. Remove the `TechnologiesSection` and standalone `Footer` usages. Verify: at 1440x900 the document has no vertical scrollbar, and at 390px the sections stack and scroll vertically.
- [x] 3.2 Rewrite `atoms/Logo.svelte` as the `JA.` mark linking to `#hero`, and restyle `atoms/NavLink.svelte` with the active state. Verify: `npm run check` passes and the logo matches the reference header.
- [x] 3.3 Rewrite `molecules/Header.svelte` per D8 for `md`+: nav links from the registry, the `NN / NN` counter, prev/next buttons (`~icons/lucide/chevron-left` and `chevron-right`), the progress bar, and anchor interception calling `goTo`. Verify at 1440x900: scrolling to projects shows `02 / 05` with "Proyectos" active, the arrows move one panel, the progress bar is empty at the start and full at the end, and the logo returns to the hero. Compare with reference.
- [x] 3.4 Create `molecules/MobileMenu.svelte` and wire the hamburger toggle into `Header` (sticky below `md`, `aria-expanded`/`aria-controls`, labels "Abrir menú"/"Cerrar menú"; closes on link, Escape, outside pointerdown, and on switching to `md`; focus returns to the toggle). Verify at 390px: tapping "Experiencia" closes the sheet and scrolls to the section, Escape closes it with focus on the button, and the counter, arrows and progress bar are hidden.

## 4. Sections

- [x] 4.1 Update `atoms/SectionHeading.svelte` (`index`, `title`, `tone`) and create `atoms/Chip.svelte`. Verify: `npm run check` passes.
- [x] 4.2 Restyle `organisms/HeroSection.svelte`: badge, "Hola, soy", the `h1` name, role and location row, `profilepic.png` in the arch frame with alt text, and a "Desliza para explorar" button visible only on `md`+ calling `nav.next()`. Root is `<section id="hero" data-panel>`. Verify: the page has exactly one `h1`. Compare with reference at 1440x900 and 390px.
- [x] 4.3 Restyle `organisms/AboutSection.svelte` with the statement and the reference technology list as `Chip`s. Delete `organisms/TechnologiesSection.svelte` and `molecules/MarqueeStrip.svelte`. Verify: `npm run check` passes with no dangling imports. Compare with reference.
- [x] 4.4 Rewrite `molecules/ProjectCard.svelte` as the summary card (badge, period, title, role, summary, "Ver detalle" link to `/proyectos/{slug}`, GitHub link) and restyle `organisms/ProjectsSection.svelte` on the forest panel. Verify: the Notely card links to `/proyectos/notely` and to its repo, and has no expandable content. Compare with reference.
- [x] 4.5 Rewrite `molecules/TimelineEntry.svelte` (marker by `kind`, card, optional `href`) and restyle `organisms/ExperienceSection.svelte` as the wide panel (`md:w-[max(100%,1640px)]`, line hidden and entries stacked below `md`). Verify: the MELIT entry renders no link, the track scrolls through the wide panel at 1280px, and the layout stacks at 390px. Compare with reference.
- [x] 4.6 Rewrite `molecules/FormationRow.svelte` as the degree row, create `molecules/ReadingCard.svelte`, restyle `organisms/FormationSection.svelte` with the "Títulos" and "Lecturas" columns, and delete `atoms/TechIcon.svelte`. Verify: `npm run check` passes and both degrees and both books are in their columns. Compare with reference.
- [x] 4.7 Rewrite `molecules/ContactCard.svelte` as the pill link, restyle `molecules/Footer.svelte`, and restyle `organisms/ContactSection.svelte` with the title, LinkedIn/GitHub/e-mail pills (`mailto:jorgealvarezpb7@gmail.com`) and the footer including "Volver al inicio". Verify: no `[TU EMAIL]` in `src`, and "Volver al inicio" shows the hero in both layouts. Compare with reference.

## 5. Project detail pages

- [x] 5.1 Create `src/routes/proyectos/[slug]/+page.ts` with `prerender = true`, `entries` from `projects`, and a `load` that calls `error(404)` for unknown slugs. Verify: `npm run build` outputs prerendered pages for `/proyectos/notely` and `/proyectos/suni`.
- [x] 5.2 Create `src/routes/proyectos/[slug]/+page.svelte` per D9 (top bar with `JA.` and "Volver" to `/#projects`, title block, story, highlights, tag chips, repo and live links). Verify in preview: `/proyectos/suni` shows every highlight and links to the repo and `https://suniglobal.org/`, and `/proyectos/does-not-exist` returns 404.
- [x] 5.3 Verify the return flow at 1440x900: from the projects panel, open Notely's detail, then activate "Volver". The projects panel shows with `02 / 05`. Repeat with the browser back button, and once more at 390px.

## 6. Integration checks

- [x] 6.1 Run `npm run check`, `npm run lint` and `npm run build`, and confirm that all three pass with no warnings introduced by this change.
- [x] 6.2 In `npm run preview`, check the full horizontal flow at 1440x900 and 1280x720: wheel, trackpad swipe, keyboard, header controls, and inner panel scroll on any panel that overflows at 720px. Confirm the network panel shows no requests to Google Fonts.
- [x] 6.3 Do a final side-by-side comparison of every section against `horizontal-scroll-reference.html` at 1440x900 and 390px, using the same fonts in both, and fix any visual drift.
