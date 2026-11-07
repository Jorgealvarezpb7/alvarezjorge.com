# error-pages Specification

## Purpose

Defines what visitors see when a page is not found or a request fails: the status code, Spanish copy per status, an optional custom reason, and a way back to the home page, in the site's visual language.

## Requirements

### Requirement: Error page for every route

Any request that ends in an error status SHALL show the site's error page, in the same fonts and color tokens as the rest of the site, with the response keeping that error status.

#### Scenario: Unknown URL

- **WHEN** a visitor opens `/no-existe`
- **THEN** the response status is 404
- **AND** the site's error page is shown, not the framework's default page

### Requirement: Status code shown

The error page SHALL show the HTTP status code as its most prominent element, in the display typeface and the `accent` color.

#### Scenario: Code on not-found

- **WHEN** a visitor opens an unknown URL
- **THEN** the page shows "404" in large display type in `accent`

#### Scenario: Code on server error

- **WHEN** a request fails with status 500
- **THEN** the page shows "500" in large display type in `accent`

### Requirement: Not-found copy

For status 404 the page SHALL show the title "Página no encontrada" and the text "La página que buscas no existe o fue movida. Verifica la URL o regresa al inicio.", whatever reason the error carries.

#### Scenario: Plain not-found

- **WHEN** a visitor opens an unknown URL and the error has no custom reason
- **THEN** the page shows "Página no encontrada" and the explanation text
- **AND** no reason line is shown

### Requirement: Custom reason on not-found

When a 404 error carries a custom reason, the page SHALL show that reason as a small line below the not-found copy. A reason equal to the framework's default text for the status SHALL count as no custom reason.

#### Scenario: Not-found with reason

- **WHEN** a 404 error is raised with the reason "Proyecto no encontrado"
- **THEN** the page shows the not-found title and text
- **AND** shows "Proyecto no encontrado" as a small line below them

#### Scenario: Default text is not a reason

- **WHEN** a 404 error carries only the framework default text "Not Found"
- **THEN** no reason line is shown

### Requirement: Other status copy

For any status other than 404, the page SHALL show the error's custom reason as its message. When the error has no custom reason, the page SHALL show the title "Algo salió mal" and the text "Ocurrió un error inesperado. Intenta de nuevo o regresa al inicio.".

#### Scenario: Error with reason

- **WHEN** a request fails with status 403 and the reason "Acceso restringido"
- **THEN** the page shows "403" and "Acceso restringido"

#### Scenario: Unexpected error

- **WHEN** an unexpected error produces status 500 with the framework default text "Internal Error"
- **THEN** the page shows "500", "Algo salió mal" and the fallback text
- **AND** the text "Internal Error" is not shown

### Requirement: Way back home

The error page SHALL offer an "Ir al inicio" link to the home page in `accent-text`, and a header with the site logo linking to the home page.

#### Scenario: Return home

- **WHEN** a visitor on the error page activates "Ir al inicio"
- **THEN** the home page opens

#### Scenario: Logo link

- **WHEN** a visitor on the error page activates the "JA." logo
- **THEN** the home page opens

### Requirement: Error page title

The browser tab title SHALL be "Página no encontrada — Jorge Alvarez" for 404, and "Error <status> — Jorge Alvarez" for any other status.

#### Scenario: Not-found title

- **WHEN** a visitor opens an unknown URL
- **THEN** the document title is "Página no encontrada — Jorge Alvarez"

#### Scenario: Server error title

- **WHEN** a request fails with status 500
- **THEN** the document title is "Error 500 — Jorge Alvarez"
