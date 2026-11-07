# section-navigation Specification

## Purpose

TBD - created by archiving change horizontal-redesign. Update Purpose after archive.

## Requirements

### Requirement: Horizontal track on medium and larger viewports

On viewports 768px wide or wider, the home page SHALL present its sections as panels laid out side by side on a single horizontal track that fills the viewport height below the header. Each panel SHALL be at least the width of the viewport, and the page itself SHALL NOT scroll vertically.

#### Scenario: Desktop visitor opens the home page

- **WHEN** a visitor opens `/` on a 1440x900 viewport
- **THEN** the hero panel fills the area below the header
- **AND** the remaining sections are reachable by scrolling the track horizontally
- **AND** the document has no vertical scrollbar

#### Scenario: Wide experience panel

- **WHEN** the visitor reaches the experience section on a viewport narrower than its timeline
- **THEN** the experience panel is wider than the viewport and the track keeps scrolling horizontally through it

### Requirement: Vertical stacking on small viewports

On viewports narrower than 768px, the home page SHALL stack all sections vertically in the same order and scroll the document vertically, with no horizontal track.

#### Scenario: Mobile visitor opens the home page

- **WHEN** a visitor opens `/` on a 390px-wide viewport
- **THEN** sections appear one below another and the page scrolls vertically
- **AND** no content scrolls horizontally

#### Scenario: Viewport crosses the breakpoint

- **WHEN** a visitor resizes the window from 1200px to 600px wide
- **THEN** the layout switches to vertical stacking without a reload

### Requirement: Vertical wheel input scrolls the track

On viewports 768px or wider, a predominantly vertical wheel gesture over the track SHALL scroll the track horizontally. A panel whose content is taller than the viewport SHALL first scroll its own content vertically before the track moves. At either end of the track, the wheel input SHALL NOT be captured.

#### Scenario: Mouse wheel down on the hero

- **WHEN** a desktop visitor scrolls the mouse wheel down over the hero panel
- **THEN** the track moves horizontally toward the about panel

#### Scenario: Panel taller than viewport

- **WHEN** a panel's content overflows vertically on a short viewport and the visitor scrolls the wheel down inside it
- **THEN** the panel content scrolls vertically until its bottom is reached
- **AND** only then does further wheel input move the track horizontally

#### Scenario: Native horizontal gesture

- **WHEN** a trackpad user swipes horizontally
- **THEN** the track scrolls horizontally with native behavior

### Requirement: Header controls on medium and larger viewports

On viewports 768px or wider, the header SHALL show the logo, one link per non-hero section, a counter in the form `NN / NN` (active index / last index, zero-padded), a previous button, a next button, and a progress bar showing how far the track is scrolled. Selecting a section link, the logo, or a button SHALL smoothly scroll the track to the target panel.

#### Scenario: Counter and active link follow scrolling

- **WHEN** the visitor scrolls the track so the projects panel is past the viewport midpoint
- **THEN** the counter reads `02 / 05`
- **AND** the "Proyectos" link is shown in its active style

#### Scenario: Next and previous buttons

- **WHEN** the about panel is active and the visitor activates the next button
- **THEN** the track scrolls to the projects panel
- **WHEN** the visitor then activates the previous button
- **THEN** the track scrolls back to the about panel

#### Scenario: Progress bar

- **WHEN** the track is scrolled to its end
- **THEN** the progress bar is fully filled
- **AND** at the start of the track it is empty

#### Scenario: Logo returns to start

- **WHEN** the visitor activates the logo
- **THEN** the track scrolls to the hero panel

### Requirement: Keyboard navigation between panels

On viewports 768px or wider, when focus is not in a text input, ArrowRight and PageDown SHALL move to the next panel and ArrowLeft and PageUp SHALL move to the previous panel. All header controls SHALL be reachable and operable by keyboard.

#### Scenario: Arrow key navigation

- **WHEN** the hero panel is active and the visitor presses ArrowRight
- **THEN** the track scrolls to the about panel

### Requirement: Hamburger menu on small viewports

On viewports narrower than 768px, the header SHALL be sticky and SHALL show the logo and a hamburger button instead of section links, counter, arrows and progress bar. Activating the button SHALL open a drop-down sheet under the header listing every non-hero section.

#### Scenario: Open and navigate

- **WHEN** a mobile visitor taps the hamburger button
- **THEN** a sheet listing Sobre mí, Proyectos, Experiencia, Formación and Contacto opens below the header
- **WHEN** the visitor taps "Experiencia"
- **THEN** the sheet closes and the page scrolls to the experience section

#### Scenario: Dismiss the sheet

- **WHEN** the sheet is open and the visitor presses Escape or taps outside it
- **THEN** the sheet closes and focus returns to the hamburger button

#### Scenario: Accessible state

- **WHEN** the sheet is open
- **THEN** the hamburger button exposes an expanded state and identifies the sheet it controls
- **AND** its accessible label describes closing the menu

### Requirement: URL hash reflects the active section

As the visitor moves between sections in either layout, the URL hash SHALL be updated to the active section's id without adding browser history entries. Sections SHALL use the ids `hero`, `about`, `projects`, `experience`, `formation` and `contact`.

#### Scenario: Scrolling updates the hash

- **WHEN** the visitor scrolls until the experience section is active
- **THEN** the URL becomes `/#experience`
- **AND** pressing the browser back button does not step through previously visited sections

### Requirement: Hash restores the section on load

When the home page loads or the hash changes to a known section id, the page SHALL show that section: on viewports 768px or wider the track SHALL be positioned at that panel without a visible animation on initial load; on smaller viewports the page SHALL be scrolled to that section. An unknown or empty hash SHALL show the hero.

#### Scenario: Deep link on desktop

- **WHEN** a desktop visitor opens `/#projects`
- **THEN** the projects panel is shown and the counter reads `02 / 05`

#### Scenario: Deep link on mobile

- **WHEN** a mobile visitor opens `/#contact`
- **THEN** the page is scrolled to the contact section

#### Scenario: Unknown hash

- **WHEN** a visitor opens `/#nope`
- **THEN** the hero is shown
