# Tasks

## 1. Error page

- [x] 1.1 Create `src/routes/+error.svelte` per design.md. Read `page` from `$app/state`. Add a pure `customReason(status, message)` function that returns `null` for framework default texts (`Internal Error`, `Unknown Error`, `` `Error: ${status}` ``, `Not Found`, `Method Not Allowed`, `Forbidden`, `Bad Request`, `Unauthorized`, empty). Derive title, text and reason line from status and reason per the design's copy table. Verify with `bun run check`.
- [x] 1.2 Render the header (`Logo inPage={false}`, `border-b border-border`, no "Volver") and the main block: status code (`font-display`, bold, large, `text-accent`), title (`font-display`, `text-foreground`), text (`text-muted-foreground`), reason line (small, `text-muted-foreground`), "Ir al inicio" link (`resolve('/')`, `ArrowRight` icon, `text-accent-text hover:text-link-hover`, `min-h-11`). Use theme tokens only. Verify `bun run lint` passes and grep the file for `#` color literals with zero matches.
- [x] 1.3 Set `<svelte:head><title>` to "Página no encontrada — Jorge Alvarez" for 404 and "Error <status> — Jorge Alvarez" otherwise. Verify in dev that `/no-existe` shows the 404 title in the tab.

## 2. Verification

- [x] 2.1 In `bun run dev`, open `/no-existe` and `/proyectos/does-not-exist`. Verify both return status 404 (`curl -s -o /dev/null -w '%{http_code}'`). Verify both show "404", "Página no encontrada", the explanation and "Ir al inicio". Verify the slug page also shows "Proyecto no encontrado" below. Verify "Ir al inicio" and the logo open `/`.
- [x] 2.2 Check the generic view: temporarily throw `error(403, 'Acceso restringido')` and then a plain `throw new Error('x')` from a scratch route. Verify "403" + "Acceso restringido" and "500" + "Algo salió mal" + fallback text, with no "Internal Error" text and the title "Error 500 — Jorge Alvarez". Remove the scratch route and verify `git status` shows no leftover file.
- [x] 2.3 Run `bun run check`, `bun run lint` and `bun run build`. Verify all pass. Then run `bun run preview` and open `/proyectos/does-not-exist`. Verify status 404 and the 404 view. Record in the summary whether the "Proyecto no encontrado" line appears in the production build (design.md risk).
- [x] 2.4 Screenshot the 404 view at 1440x900 and at 390x844, and the 500 view at 1440x900. Verify the text has no horizontal overflow on mobile, and report the absolute file paths.
