# project-detail Specification

## Purpose

TBD - created by archiving change horizontal-redesign. Update Purpose after archive.

## Requirements

### Requirement: Detail page per project

Each project shown in the projects section SHALL have a page at `/proyectos/<slug>` presenting its title, category, role, period, story, full list of highlights, technology tags, and links to its repository and live site when they exist. The page SHALL use the same visual language as the home page and SHALL scroll vertically at every viewport width.

#### Scenario: Open a project detail

- **WHEN** a visitor opens `/proyectos/suni`
- **THEN** the page shows Suni's story, all of its highlights and its tags
- **AND** links to the Suni repository and to `https://suniglobal.org/`

### Requirement: Unknown project returns not found

A request for `/proyectos/<slug>` where the slug matches no project SHALL respond with a 404 not-found page.

#### Scenario: Unknown slug

- **WHEN** a visitor opens `/proyectos/does-not-exist`
- **THEN** the response status is 404
- **AND** the site's not-found error page is shown, with "404", "Página no encontrada" and an "Ir al inicio" link

### Requirement: Detail pages are static

Every project detail page SHALL be generated at build time so it is served as static HTML without server-side rendering on request.

#### Scenario: Build output

- **WHEN** the site is built
- **THEN** the build output contains a prerendered page for every project slug

### Requirement: Return to the projects section

The detail page SHALL provide a "Volver" link to `/#projects`. Following it, or using the browser back button after arriving from the home page, SHALL show the projects section.

#### Scenario: Back from detail on desktop

- **WHEN** a desktop visitor opens Notely's detail from the projects panel and then activates "Volver"
- **THEN** the home page shows the projects panel with the counter reading `02 / 05`

#### Scenario: Browser back

- **WHEN** a visitor opens a detail page from the projects section and presses the browser back button
- **THEN** the home page shows the projects section
