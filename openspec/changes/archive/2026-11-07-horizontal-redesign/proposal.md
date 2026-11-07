# Proposal

## Why

The portfolio is a generic vertical one-pager (white and teal, centered sections). A new visual direction exists in `horizontal-scroll-reference.html`: a sage and forest-green editorial layout where sections are full-viewport panels on a horizontal track. That reference was written as standalone HTML with inline styles and a vanilla script, without knowing the project's stack. This change rebuilds the site to match that look exactly, using the existing SvelteKit / Svelte 5 / Tailwind 4 stack and component architecture.

## What Changes

- Replace the visual design with the reference: palette, typography scale, panel layouts, chips, cards, timeline, contact pills. The reference is the visual source of truth; content can be adjusted later.
- Present sections as full-viewport panels on a horizontal track at `md` (768px) and up, with a header showing section nav, a `NN / NN` counter, prev/next buttons and a progress bar. Vertical wheel input scrolls the track horizontally.
- Below `md`, sections stack and scroll vertically. Nav links are replaced by a hamburger button that opens a drop-down sheet under a sticky header. The counter, arrows and progress bar are hidden.
- Keep the URL hash in sync with the active section (`replaceState`), and restore the section from the hash on load in both modes.
- Section order becomes: Hero, About (with technologies as chips), Projects, Experience (horizontal timeline in a wide panel), Formation (degrees and readings), Contact (with footer).
- Projects panel shows summary cards only. Each project gets a prerendered detail page at `/proyectos/[slug]` with the full story, highlights and tags. Its back link returns to `/#projects`.
- Move project data out of `ProjectsSection.svelte` into `src/lib/data/projects.ts`, shared by the panel and the detail route.
- **BREAKING (visual)**: remove the technologies marquee (`TechnologiesSection.svelte`, `MarqueeStrip.svelte`) and the expandable accordion in `ProjectCard.svelte`. The standalone `Footer` is folded into the Contact panel.
- Self-host the reference fonts from `src/lib/fonts/` with `@font-face` rules (Inter 400/500/600, Space Grotesk 400/500/700, Instrument Serif italic 400) and declare them as theme tokens with system fallbacks. Nothing is loaded from Google Fonts.
- Do not carry over the reference's defects: the malformed `id="progress; ..."` attribute, the `mailto:[TU EMAIL]` placeholder, and the MELIT `href="#"` link.

## Capabilities

### New Capabilities

- `section-navigation`: How visitors move between portfolio sections: horizontal track on `md`+, vertical scroll with hamburger sheet on small screens, header counter / arrows / progress, wheel and keyboard input, and URL hash sync.
- `portfolio-sections`: The sections the home page presents, their order and the content each one shows (hero, about with technology chips, project summary cards, experience timeline, formation, contact).
- `project-detail`: A dedicated, prerendered page per project with its full description, reachable from the project summary card and returning to the projects section.

### Modified Capabilities

<!-- None: the project has no existing specs. -->

## Impact

- **Routes**: `src/routes/+page.svelte` (rebuilt as the track shell), new `src/routes/proyectos/[slug]/+page.ts` and `+page.svelte`.
- **Styles**: `src/routes/layout.css` `@theme` tokens replaced with the reference palette and font families, plus `@font-face` rules for the self-hosted fonts.
- **Components**: all organisms restyled; `Header`, `ProjectCard`, `TimelineEntry`, `FormationRow`, `ContactCard`, `SectionHeading`, `NavLink`, `Logo`, `Icon` reworked or replaced; `TechnologiesSection`, `MarqueeStrip`, `Footer` and likely `TechIcon` removed.
- **Data**: new `src/lib/data/projects.ts`.
- **Dependencies**: none added. Uses existing Svelte 5 runes, Tailwind 4, unplugin-icons and `adapter-cloudflare` with prerendering.
- **Assets**: `src/lib/assets/profilepic.png` used as the hero photo; the seven `.woff2` files in `src/lib/fonts/` (already added).
- **Out of scope**: i18n of content via Paraglide, dark theme, content rewrites.
