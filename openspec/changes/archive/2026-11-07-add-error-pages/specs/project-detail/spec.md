# Spec Delta

## MODIFIED Requirements

### Requirement: Unknown project returns not found

A request for `/proyectos/<slug>` where the slug matches no project SHALL respond with a 404 not-found page.

#### Scenario: Unknown slug

- **WHEN** a visitor opens `/proyectos/does-not-exist`
- **THEN** the response status is 404
- **AND** the site's not-found error page is shown, with "404", "Página no encontrada" and an "Ir al inicio" link
