# Proposal

## Why

The site has no error page. A missing URL or a failed request shows SvelteKit's bare default page, in English, without the site's fonts, palette or a way back home. Visitors who land on a dead link get no help.

## What Changes

- Add one error page for every route. It renders inside the root layout, so it uses the site's fonts and color tokens.
- Both error views show the HTTP status code in large display type and a "Ir al inicio" link to the home page.
- **404 view**: fixed Spanish copy ("Página no encontrada" plus a short explanation). When the error carries a custom reason, the reason appears as a small line below the copy.
- **Other statuses**: the custom reason is the message. When there is no custom reason (only SvelteKit's default text, such as "Internal Error"), the page shows Spanish fallback copy.
- The page header shows only the logo, linking to the home page.
- The browser tab title names the error.
- Out of scope: a static `src/error.html` fallback for crashes in the root layout itself.

## Capabilities

### New Capabilities

- `error-pages`: what visitors see when a page is not found or a request fails: status code, copy per status, custom reason display, way back home and visual consistency with the rest of the site.

### Modified Capabilities

- `project-detail`: the unknown-slug requirement now also requires the 404 page to be shown, not only the 404 status.

## Impact

- New file: `src/routes/+error.svelte`.
- Reuses `Logo` (`src/lib/components/atoms/Logo.svelte`) and the theme tokens in `src/routes/layout.css`. No new dependencies.
- `src/routes/proyectos/[slug]/+page.ts` keeps its `error(404, 'Proyecto no encontrado')` call; its reason now shows on the 404 page when that load runs.
