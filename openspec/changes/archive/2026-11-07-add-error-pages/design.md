# Design

## Context

The app is SvelteKit 2 with Svelte 5 runes on `adapter-cloudflare`. The root layout (`src/routes/+layout.svelte`) imports `layout.css` (fonts and `@theme` tokens) and renders children. No `+error.svelte` or `src/error.html` exists. The only explicit error today is `error(404, 'Proyecto no encontrado')` in `src/routes/proyectos/[slug]/+page.ts`, a route with `prerender = true` and generated `entries`. The detail page header (`border-b border-border`, `Logo inPage={false}`) is the closest existing pattern for a non-home page. See proposal.md for motivation and specs/error-pages for behavior.

## Goals / Non-Goals

**Goals:**

- One error component that serves both views and reads `page.status` and `page.error`.
- Decide in one place whether an error message is a custom reason or framework default text.

**Non-Goals:**

- No `handleError` hook or custom `App.Error` shape.
- No change to how the project detail route raises its 404.
- No `src/error.html`.

## Decisions

### One root `+error.svelte`, branch on status

SvelteKit sends every error under the root layout to the nearest `+error.svelte`. A single `src/routes/+error.svelte` renders inside the root layout, so fonts and tokens load without extra imports. It reads `page` from `$app/state`. A `status === 404` branch picks the not-found copy; any other status uses the generic branch.

Alternative considered: one component per view (for example a `NotFound` molecule and a `GenericError` molecule). Rejected: the two views share layout, code display and link, and differ only in three strings. A small copy object derived from status and reason is enough.

### Detecting a custom reason

SvelteKit fills `page.error.message` with framework text when no reason is given:

- Unmatched routes and other framework errors: the HTTP status text, such as `Not Found` or `Method Not Allowed`.
- Unexpected thrown errors: `Internal Error`.
- `error(status)` with no message: `Error: <status>`.
- Non-object bodies: `Unknown Error`.

A message counts as a custom reason only when it is non-empty and matches none of these. The check is: not `Internal Error`, not `Unknown Error`, not `` `Error: ${status}` ``, and not one of the HTTP status texts SvelteKit uses (`Not Found`, `Method Not Allowed`, `Forbidden`, `Bad Request`, `Unauthorized`). It lives as a small pure function inside the component script. It moves to `src/lib/` only if another place ever needs it.

Alternative considered: a `handleError` hook that returns Spanish messages. Rejected because it covers only unexpected errors and adds a hooks file for one string.

### Copy

| Status | Title                              | Text                                                                              | Reason line           |
| ------ | ---------------------------------- | --------------------------------------------------------------------------------- | --------------------- |
| 404    | Página no encontrada               | La página que buscas no existe o fue movida. Verifica la URL o regresa al inicio. | custom reason, if any |
| other  | custom reason, else Algo salió mal | fallback text shown only when there is no custom reason                           | none                  |

For other statuses with a reason, the reason is the title and no fallback text is shown.

### Layout and tokens

```
+--------------------------------------------------+
| JA.                                              |  header: border-b border-border, bg-background
+--------------------------------------------------+
|                                                  |
|   404            font-display bold, very large, text-accent
|   Página no encontrada   font-display, text-foreground
|   Explanation    text-lg, text-muted-foreground, max ~560px
|   Proyecto no encontrado   text-sm, text-muted-foreground (reason line)
|   Ir al inicio ->   font-semibold text-accent-text, hover:text-link-hover
|                                                  |
+--------------------------------------------------+
```

- `main` fills the remaining viewport height (`min-h-[calc(100dvh-header)]` or flex column on a full-height wrapper) and centers content vertically, left-aligned text like the rest of the site.
- Code size scales with viewport (around 96px on mobile, up to around 200px on desktop) with the hero's tight tracking (`tracking-[-0.05em]`, `leading-none`).
- "Ir al inicio" uses `resolve('/')` and the `ArrowRight` lucide icon, sized `min-h-11` for touch, matching the detail page's "Volver" link.
- The reason line uses `muted-foreground`, not `faint`: `faint` (#8EA6B8 on #F3F8FB) is below 4.5:1, which the visual-theme contrast floor forbids for small text.

### Title

`<svelte:head><title>` is set from status: "Página no encontrada — Jorge Alvarez" for 404, "Error <status> — Jorge Alvarez" otherwise.

## Risks / Trade-offs

- [Unknown slug never reaches `load` in production] `/proyectos/[slug]` is prerendered with fixed entries, so on Cloudflare an unknown slug may resolve as an unmatched route. The visitor then sees the plain 404 view without "Proyecto no encontrado". → Acceptable: the spec for that route requires only the 404 page, not the reason. Verify with `vite build && vite preview` and note the observed behavior.
- [Default-text list drifts] A future SvelteKit version could add new framework texts that would show as a reason. → The list is short and lives in one function. An English status text showing up is visible and cheap to fix.
- [Crash in the root layout] Without `src/error.html`, a failure in `+layout.svelte` itself falls back to SvelteKit's built-in static page. → Accepted per scope; the layout is trivial.
