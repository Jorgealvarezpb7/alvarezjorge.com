# Design

## Context

See proposal.md (Why) for motivation and the specs for required behavior. This section covers only what shapes the approach.

- Stack: SvelteKit 2.63, Svelte 5.57 in forced runes mode, Tailwind 4 configured through `@theme` in `src/routes/layout.css`, `unplugin-icons` with the full `@iconify/json` set, and `adapter-cloudflare`.
- Components use an atoms / molecules / organisms layout. `+page.svelte` composes `Header`, seven organisms and `Footer`. Each organism holds its own content as inline arrays.
- `layout.css` already defines semantic color tokens and states that components must read tokens instead of hardcoded colors.
- Self-hosted fonts are already in `src/lib/fonts/`, one folder per family, Latin subset, `.woff2` only.
- `horizontal-scroll-reference.html` is the visual source of truth. Its implementation (inline `style` attributes, global `querySelector` script, a 760px media query) is not reused. It has a defect that breaks its script: the progress bar's `id` attribute is malformed, so `getElementById('progress')` returns `null` and `update()` throws.

## Goals / Non-Goals

**Goals:**

- Reproduce the reference look exactly, using Tailwind utilities on top of theme tokens.
- Put all section-navigation behavior (active index, scroll mode, hash, wheel, keys) in one module that the header, the track and the sections share.
- Keep anchors as real links so navigation still works where scripts don't apply (small screens, before hydration).

**Non-Goals:**

- Preloading font files or subsetting beyond the provided Latin files.
- Scroll snapping, scroll-linked animations, or other motion beyond smooth scrolling.
- Changing the projects' wording or the experience data, apart from fixing the reference's placeholders.

## Decisions

### D1. Theme tokens map the reference palette

Replace the `@theme` block with the reference colors. Existing token names are kept where they mean the same thing, so the change touches fewer class names:

| Token              | Value     | Use                              |
| ------------------ | --------- | -------------------------------- |
| `background`       | `#ECEFE8` | page background                  |
| `foreground`       | `#11201B` | primary text                     |
| `foreground-soft`  | `#2E3F38` | body copy                        |
| `muted-foreground` | `#4A5A53` | labels, nav                      |
| `faint`            | `#8C9A93` | hero divider                     |
| `border`           | `#D3DAD2` | rules, header line               |
| `border-strong`    | `#C4CDC3` | badge, prev button               |
| `line`             | `#B9C4BA` | chips, timeline, formation rules |
| `surface`          | `#FFFFFF` | experience and reading cards     |
| `surface-muted`    | `#E2E8E0` | formation panel, tags            |
| `accent`           | `#173F35` | forest green, projects panel     |
| `accent-hover`     | `#0E2A23` | link hover                       |
| `accent-raised`    | `#1F4C41` | project cards                    |
| `on-accent`        | `#ECEFE8` | text on forest                   |
| `on-accent-body`   | `#DCE5DF` | body text on forest              |
| `on-accent-muted`  | `#A9BDB4` | labels on forest                 |
| `highlight`        | `#C9F06B` | lime badge, links on forest      |
| `status`           | `#2F9E6B` | availability dot                 |

The fonts are declared as `--font-sans: Inter, system-ui, sans-serif`, `--font-display: 'Space Grotesk', system-ui, sans-serif`, and `--font-serif: 'Instrument Serif', Georgia, serif`. Tailwind then generates `font-display` and `font-serif`.

`layout.css` gets one `@font-face` per file, each with `font-display: swap` and a `url()` relative to the stylesheet. Vite resolves these URLs, hashes the files and copies them into the build:

| Family           | `font-weight` / `font-style` | File (`src/lib/fonts/...`)                                      |
| ---------------- | ---------------------------- | --------------------------------------------------------------- |
| Inter            | 400 normal                   | `inter-v20-latin/inter-v20-latin-regular.woff2`                 |
| Inter            | 500 normal                   | `inter-v20-latin/inter-v20-latin-500.woff2`                     |
| Inter            | 600 normal                   | `inter-v20-latin/inter-v20-latin-600.woff2`                     |
| Space Grotesk    | 400 normal                   | `space-grotesk-v22-latin/space-grotesk-v22-latin-regular.woff2` |
| Space Grotesk    | 500 normal                   | `space-grotesk-v22-latin/space-grotesk-v22-latin-500.woff2`     |
| Space Grotesk    | 700 normal                   | `space-grotesk-v22-latin/space-grotesk-v22-latin-700.woff2`     |
| Instrument Serif | 400 italic                   | `instrument-serif-v5/instrument-serif-v5-latin-italic.woff2`    |

No `<link>` tag and no third-party host.

- _Alternative:_ move the files to `static/fonts/` and reference `/fonts/...`. Rejected because files in `static/` are served without content hashes, so they can't be cached long-term safely. Bundling through Vite gives hashed, immutable URLs.

Pixel sizes the Tailwind scale doesn't cover (`168px` name, `120px` contact title, `0.86` line height, `-0.05em` tracking) use arbitrary values in place. They each appear once, so making them tokens would add nothing.

- _Alternative:_ copy the hex values into arbitrary classes (`bg-[#173F35]`). Rejected because it breaks the token rule in `layout.css` and blocks a later dark theme.

### D2. A single section registry

`src/lib/data/sections.ts` exports the ordered list `{ id, label }` for `hero, about, projects, experience, formation, contact`. The header links, the mobile sheet, the counter, the hash validation and the panel ids all read from it, so the order is defined in one place.

### D3. Navigation state in a runes class, shared through context

`src/lib/navigation/section-nav.svelte.ts` exports a `SectionNav` class:

- State: `active` (index), `progress` (0 to 1), and `horizontal`, read from `new MediaQuery('min-width: 768px')` (`svelte/reactivity`).
- Methods: `attach(trackEl)`, which returns a cleanup function, plus `goTo(i | id)`, `next()` and `prev()`.

`+page.svelte` creates one instance and provides it with `setContext`. `Header`, the hero's "Desliza para explorar" and the contact footer's "Volver al inicio" read it through a `getSectionNav()` helper.

`attach` sets up and tears down listeners in an `$effect` that depends on `horizontal`, so crossing the breakpoint swaps behavior without a reload:

```
horizontal = true                         horizontal = false
-----------------------------------       -----------------------------------
track 'scroll' (rAF-throttled):           IntersectionObserver on panels,
  progress = scrollLeft / max               rootMargin '-50% 0px -50% 0px'
  active = last panel with                  -> active = intersecting panel
    offsetLeft <= scrollLeft + w/2
track 'wheel' (passive:false)             (none: native vertical scroll)
window 'keydown' (arrows / PageUp/Down)
```

`goTo` on `md` and up calls `track.scrollTo({ left: panel.offsetLeft, behavior })`. On small screens it calls `panel.scrollIntoView({ block: 'start', behavior })`. `behavior` is `'auto'` when `prefers-reduced-motion: reduce` matches and `'smooth'` otherwise.

- _Alternative:_ keep logic inside `Header` or `+page.svelte`. Rejected because three separate components need `goTo`, and the wheel and observer code would get mixed into markup.
- _Alternative:_ use `getComputedStyle(track).flexDirection` the way the reference does. Rejected because it reads styles on every event and duplicates the breakpoint. `MediaQuery` is reactive and matches the Tailwind `md` value.

### D4. Wheel handling respects inner scroll

The wheel handler returns without acting when `ctrlKey` is held (zoom) or when `|deltaX| >= |deltaY|` (native horizontal gesture). It then finds `event.target.closest('[data-panel]')`. If that panel can still scroll vertically in the direction of `deltaY` (`scrollTop > 0` going up, `scrollTop + clientHeight < scrollHeight` going down), the handler returns and the panel scrolls itself. If the track is already at the edge in that direction, it also returns. Otherwise it calls `preventDefault()` and adds `deltaY` to `scrollLeft`.

This covers the "panel taller than viewport" scenario, which the reference ignores.

### D5. Hash sync with SvelteKit's `replaceState`

When `active` changes, and it wasn't caused by a programmatic scroll still in progress, call `replaceState('#' + id, page.state)` from `$app/navigation`. Calling `history.replaceState` directly would conflict with SvelteKit's router and trigger its dev warning.

Guard: `goTo` sets `programmatic = true` and writes the target hash immediately. The flag clears on the track's `scrollend` event, or after an 800 ms timeout as a fallback where `scrollend` is missing. This stops intermediate panels from flashing through the hash during a smooth scroll.

Restore: on mount, and on `hashchange`, look up the hash in the registry. On `md` and up, set `track.scrollLeft = panel.offsetLeft` with no animation. On small screens, rely on the browser's native anchor scroll; SvelteKit also scrolls to the hash after client navigation. An unknown hash maps to `hero`.

Returning from a detail page works without extra state. The URL entry for `/` already holds `#projects` because of `replaceState` before the visitor left, so both browser back and the "Volver" link to `/#projects` land on the projects panel.

### D6. Real anchors with progressive interception

Header links, sheet links, the logo and "Volver al inicio" are `<a href="#id">` elements. On `md` and up, the click handler calls `preventDefault()` and `nav.goTo(id)`. On small screens, the native jump is kept, and the sheet only closes. The prev and next arrows and "Desliza para explorar" are `<button>`s because they have no fixed target.

### D7. Layout through utilities, one track element

```
+page.svelte
  <Header/>                                sticky top-0 on sm; static on md+
  <main data-track bind:this>              flex flex-col
                                           md:h-[calc(100dvh-header)] md:flex-row
                                           md:overflow-x-auto md:overflow-y-hidden
                                           no-scrollbar
    <HeroSection/> ... <ContactSection/>   each root: <section id data-panel>
                                           md:h-full md:shrink-0 md:basis-full
                                           md:overflow-y-auto
                                           experience: md:w-[max(100%,1640px)]
```

The root on `md` and up is `h-dvh flex flex-col`, so the track takes the remaining height via `flex-1 min-h-0`. That avoids hardcoding the header height. A `no-scrollbar` utility is added once in `layout.css` with `@utility`.

### D8. Header and mobile sheet

`Header` (molecule) renders:

- The logo `JA.` as an anchor to `#hero`.
- On `md` and up: nav links, the counter, prev/next buttons and the progress bar (`hidden md:flex`). The counter and progress bar read `nav.active` and `nav.progress`.
- Below `md`: a hamburger button (`md:hidden`) that toggles a `MobileMenu` molecule.

`MobileMenu` is a full-width sheet positioned `absolute top-full` under the sticky header, styled with background, border and display font. It closes on link click, on Escape (`<svelte:window onkeydown>`), and on pointerdown outside the header. When it closes, focus returns to the toggle. It also closes when `nav.horizontal` becomes true.

The toggle exposes `aria-expanded`, `aria-controls`, and a label that switches between "Abrir menú" and "Cerrar menú". Menu and close icons come from `~icons/lucide/menu` and `~icons/lucide/x`. The chevrons and arrows use `~icons/lucide/*` as well, so no new hand-written SVG branches are added to `Icon.svelte`. Existing `Icon` names (`github`, `arrow-up-right`) stay where they're already used.

### D9. Project data and detail route

`src/lib/data/projects.ts` exports a `Project` type and a `projects` array. The current fields are kept (`icon`, `title`, `category`, `role`, `period`, `summary`, `story`, `highlights`, `tags`, `repo`, `link`, `background`). Two fields are added:

- `slug` (`notely`, `suni`)
- `badge: 'highlight' | 'neutral'`, for the lime or paper category pill in the reference

`src/routes/proyectos/[slug]/+page.ts` sets:

- `prerender = true`
- `entries = () => projects.map(p => ({ slug: p.slug }))`, which is explicit and doesn't depend on crawler discovery
- `load` calls `error(404)` when no project matches

The page itself uses the same tokens and fonts. It has a compact top bar with `JA.` and "Volver" to `/#projects`, a forest-colored title block, the story, the highlights as a list, the tags as chips, and the repo and live links. It scrolls vertically at every width and doesn't use `SectionNav`.

Experience and formation data stay inline in their organisms. Only projects have a second consumer.

### D10. Component changes

| Component                       | Action                                                                                                     |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| atoms/`Logo`                    | Rewrite as the `JA.` text mark. The profile-photo dialog is dropped; the photo moves to the hero.          |
| atoms/`NavLink`                 | Restyle: `muted-foreground`, and `accent` with semibold when active                                        |
| atoms/`SectionHeading`          | Props `index`, `title`, optional `tone: 'light' \| 'dark'` for the projects panel                          |
| atoms/`Chip`                    | New: pill with a `line` border and hover that inverts to `accent`                                          |
| atoms/`TechIcon`                | Delete (only `FormationRow` uses it)                                                                       |
| molecules/`Header`              | Rewrite (D8)                                                                                               |
| molecules/`MobileMenu`          | New (D8)                                                                                                   |
| molecules/`ProjectCard`         | Rewrite as the summary card, with "Ver detalle" and a GitHub link. The accordion is removed.               |
| molecules/`TimelineEntry`       | Rewrite as a marker plus a card. `kind: 'work' \| 'project'` controls the marker fill. `href` is optional. |
| molecules/`FormationRow`        | Rewrite as a degree row. Add a new `ReadingCard` (`tone: 'dark' \| 'light'`).                              |
| molecules/`ContactCard`         | Rewrite as a large pill link                                                                               |
| molecules/`Footer`              | Restyle and render inside `ContactSection`                                                                 |
| molecules/`MarqueeStrip`        | Delete                                                                                                     |
| organisms/`TechnologiesSection` | Delete. Its list becomes chips inside `AboutSection`, using the reference's technologies.                  |
| organisms (others)              | Restyle per reference. Root becomes `<section id data-panel>`.                                             |

## Risks / Trade-offs

- [Wheel capture conflicts with assistive tools or unusual input devices] → Capture only predominantly vertical, non-zoom wheel events while the track can still move. Keyboard and header controls give equivalent navigation.
- [Panels overflow vertically on short laptop viewports (for example 1280x720)] → Panels use `md:overflow-y-auto` and D4 scrolls their content before the track. Check at 1280x720 during verification.
- [`scrollend` support differs between browsers] → An 800 ms timeout clears the programmatic flag as a fallback.
- [Deep link on `md` and up briefly renders the hero before jumping to the panel] → Position the track on mount with no animation. A one-frame flash is accepted; hiding the track until positioned isn't worth the extra complexity.
- [With `font-display: swap`, the large hero and contact type briefly shows in the fallback font, then shifts] → Accepted for a small static site. Fallback stacks are chosen to keep metrics close. Preloading is a possible follow-up.
- [Only Latin subsets are provided, so accented Spanish characters must be covered] → The Latin subset includes á, é, í, ó, ú, ñ and ¿. Verify "Formación" and "Escríbeme" render in the self-hosted fonts.
- [Fixed `1640px` minimum width of the experience panel doesn't scale with entry count] → Keep the reference value. If entries are added later, the timeline items get a `min-w` instead.
- [Removing the marquee, accordion and photo dialog drops existing behavior] → Accepted in the proposal as a visual breaking change. Highlights move to the detail pages.

## Migration Plan

Static site deployed through `adapter-cloudflare`. Merge `redesign` into `main` and deploy. To roll back, redeploy the previous commit. No data or URL migrations are needed: the existing section anchors (`#about`, `#experience`, `#formation`, `#contact`) keep their ids.
