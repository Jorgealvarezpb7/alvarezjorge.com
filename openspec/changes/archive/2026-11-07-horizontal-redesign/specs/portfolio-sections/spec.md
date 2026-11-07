## ADDED Requirements

### Requirement: Section order

The home page SHALL present exactly six sections in this order: Hero, Sobre mí, Proyectos, Experiencia, Formación, Contacto. Every section except the hero SHALL show a heading made of its two-digit index (01 to 05) and its uppercase title.

#### Scenario: Order and headings

- **WHEN** a visitor views the home page
- **THEN** the sections appear in the order Hero, Sobre mí, Proyectos, Experiencia, Formación, Contacto
- **AND** the projects section heading reads "02" followed by "Últimos proyectos"

### Requirement: Visual design matches the reference

The home page SHALL match the visual design of `horizontal-scroll-reference.html` (palette, type scale, spacing, shapes and per-section backgrounds) at both the horizontal and the stacked layouts. Display text SHALL declare Space Grotesk, accent text Instrument Serif italic, and body text Inter, each with a system fallback. The page SHALL NOT request fonts from third-party hosts.

#### Scenario: Side-by-side comparison

- **WHEN** the home page and the reference are opened side by side at 1440x900 and at 390px wide, with the same fonts available
- **THEN** each section matches the reference in colors, layout, sizes and shapes

#### Scenario: No third-party font requests

- **WHEN** the home page loads
- **THEN** no request is made to `fonts.googleapis.com` or `fonts.gstatic.com`

### Requirement: Hero section

The hero SHALL show an availability badge, the greeting "Hola, soy", the name "Jorge Alvarez" as the page's only level-one heading, the role "Full Stack Developer", the location "Madrid, España", and the profile photo in an arch-shaped frame. On viewports 768px or wider it SHALL also show a "Desliza para explorar" control that moves to the next panel.

#### Scenario: Hero content

- **WHEN** a visitor views the hero
- **THEN** the name is the only `h1` on the page and the profile photo is shown with descriptive alternative text

### Requirement: About section with technology chips

The about section SHALL show the profile statement and a "Tecnologías" list rendered as text chips, one per technology.

#### Scenario: Technologies as chips

- **WHEN** a visitor views the about section
- **THEN** each technology appears as a pill-shaped text chip
- **AND** no scrolling marquee or icon strip is shown

### Requirement: Projects section with summary cards

The projects section SHALL show one summary card per project with its category badge, period, title, role, one-line summary, a link to its source repository, and a "Ver detalle" link to that project's detail page.

#### Scenario: Card links

- **WHEN** a visitor views the Notely card
- **THEN** it links to `/proyectos/notely` for details and to the Notely GitHub repository
- **AND** the card shows no expandable highlights

### Requirement: Experience timeline

The experience section SHALL show each entry as a card on a horizontal timeline with a marker per entry, displaying period, title, role, description, a technology tag and an external link when one exists. Work entries SHALL use a filled marker and personal-project entries an outlined marker. On viewports narrower than 768px the entries SHALL stack vertically and the timeline line SHALL be hidden.

#### Scenario: Entry without a link

- **WHEN** an experience entry has no external URL
- **THEN** no link is rendered for it, rather than a link to `#`

### Requirement: Formation section

The formation section SHALL list degrees under "Títulos" with institution, location and period, and books under "Lecturas" as cards with title and authors.

#### Scenario: Degrees and readings separated

- **WHEN** a visitor views the formation section
- **THEN** the two UNIVERSAE degrees appear under "Títulos" and the two books appear under "Lecturas"

### Requirement: Contact section with footer

The contact section SHALL show a large "Escríbeme o sigue mis redes" title, pill links to LinkedIn, GitHub and e-mail, and a footer with location, copyright and a control that returns to the hero. The e-mail link SHALL use the owner's real address.

#### Scenario: Contact links

- **WHEN** a visitor views the contact section
- **THEN** the e-mail link targets `mailto:jorgealvarezpb7@gmail.com`
- **AND** LinkedIn and GitHub links open the owner's profiles

#### Scenario: Back to start

- **WHEN** the visitor activates "Volver al inicio"
- **THEN** the hero section is shown
