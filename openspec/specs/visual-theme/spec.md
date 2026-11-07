# visual-theme Specification

## Purpose

Defines the site's color palette as named, role-based tokens, the rule that every component draws its colors from those tokens, and the contrast floor every text and graphic pairing must meet.

## Requirements

### Requirement: Role-based color tokens

The site SHALL define its colors as named tokens whose names describe a role, not a hue, with the values listed in the token-values scenario.

#### Scenario: Token values

- **WHEN** the theme's color tokens are inspected
- **THEN** each token below exists with exactly that value:

| Token            | Value   | Token                  | Value   |
| ---------------- | ------- | ---------------------- | ------- |
| background       | #F3F8FB | surface-inverse        | #142B3F |
| foreground       | #142B3F | surface-inverse-raised | #1E3A53 |
| foreground-soft  | #2B4257 | on-inverse             | #F3F8FB |
| muted-foreground | #4A5F72 | on-inverse-body        | #DCEBF3 |
| faint            | #8EA6B8 | on-inverse-muted       | #A7C4D8 |
| border           | #D3E4EE | accent-on-inverse      | #C4B5FD |
| border-strong    | #B5D2E2 | accent                 | #8B5CF6 |
| line             | #A9C9DB | accent-text            | #6D28D9 |
| surface          | #FFFFFF | link-hover             | #142B3F |
| surface-muted    | #BFDFEE | status                 | #2F9E6B |
| tag              | #DCEDF5 |                        |         |

- **AND** no token name refers to green or another hue

### Requirement: Components use tokens only

Components and pages SHALL take every color from a theme token, directly or mixed with transparency. They SHALL NOT contain hardcoded color literals, except pure white for text and icons on purple and dark fills. No value from the previous green palette SHALL remain anywhere in the source.

#### Scenario: No old palette values

- **WHEN** the source tree is searched case-insensitively for #173F35, #ECEFE8, #11201B, #C9F06B, #1F4C41, #E2E8E0, #0E2A23, #A9BDB4, #DCE5DF, #4A5A53, #2E3F38, #8C9A93, #D3DAD2, #C4CDC3, #B9C4BA and their rgb()/rgba() forms
- **THEN** no match is found

### Requirement: Accent roles by background

Purple SHALL be applied by size and background. On light backgrounds, large text and graphics SHALL use `accent` and small text SHALL use `accent-text`. On dark surfaces, accents SHALL use `accent-on-inverse`.

#### Scenario: Large accent text and graphics

- **WHEN** a visitor views the home page
- **THEN** "Hola, soy", "full stack" (Sobre mí), "o sigue mis redes", the logo dot, the progress bar fill, the next-section button fill, the filled timeline markers and every timeline marker ring use `accent`

#### Scenario: Small accent text

- **WHEN** a visitor views the home page
- **THEN** section indexes 01, 03, 04 and 05, the active navigation item, experience role lines, links on light backgrounds and "Volver al inicio" use `accent-text`

#### Scenario: Accents on dark panels

- **WHEN** a visitor views the projects panel
- **THEN** the "02" index, the "Ver en GitHub" links and the "Open source" badge background use `accent-on-inverse`, and the badge text uses `foreground`

### Requirement: Interactive and badge colors

Technology chips on hover SHALL use `accent-text` for background and border with white text. The "Plataforma de voluntariado" badge SHALL use `surface-muted` with `foreground` text. Outlined timeline markers SHALL be filled with `background`. The availability dot SHALL stay `status` green.

#### Scenario: Chip hover

- **WHEN** a visitor hovers a technology chip
- **THEN** its background and border are #6D28D9 and its text is white

### Requirement: Contrast floor

Every text color SHALL reach at least 4.5:1 contrast against its background, and text at 24px or larger, or 18.67px bold or larger, at least 3:1. Graphics that convey meaning SHALL reach at least 3:1. Decorative elements are exempt.

#### Scenario: Small accent text on ice blue

- **WHEN** the "04" index is shown on the Formación background
- **THEN** its contrast is at least 4.5:1 (#6D28D9 on #BFDFEE is 5.08:1)

#### Scenario: Chip hover text

- **WHEN** a chip is hovered
- **THEN** its text contrast is at least 4.5:1 (white on #6D28D9 is 7.1:1)
