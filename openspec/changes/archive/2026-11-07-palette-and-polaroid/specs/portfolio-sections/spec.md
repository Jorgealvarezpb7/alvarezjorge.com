# Spec Delta

## MODIFIED Requirements

### Requirement: Visual design matches the reference

The home page SHALL match the visual design of `horizontal-scroll-reference.html` (type scale, spacing, shapes and per-section backgrounds) at both the horizontal and the stacked layouts, with colors taken from the `visual-theme` palette instead of the reference's palette. Display text SHALL declare Space Grotesk, accent text Instrument Serif italic, and body text Inter, each with a system fallback. The page SHALL NOT request fonts from third-party hosts.

#### Scenario: Side-by-side comparison

- **WHEN** the home page and the reference are opened side by side at 1440x900 and at 390px wide, with the same fonts available
- **THEN** each section matches the reference in layout, sizes and shapes
- **AND** each section's colors follow the `visual-theme` token roles

#### Scenario: No third-party font requests

- **WHEN** the home page loads
- **THEN** no request is made to `fonts.googleapis.com` or `fonts.gstatic.com`

### Requirement: Hero section

The hero SHALL show an availability badge, the greeting "Hola, soy", the name "Jorge Alvarez" as the page's only level-one heading, the role "Full Stack Developer", the location "Madrid, España", and the profile photo as a taped polaroid. On viewports 768px or wider it SHALL also show a "Desliza para explorar" control that moves to the next panel.

#### Scenario: Hero content

- **WHEN** a visitor views the hero
- **THEN** the name is the only `h1` on the page and the profile photo is shown with descriptive alternative text

#### Scenario: Polaroid frame

- **WHEN** a visitor views the hero
- **THEN** the photo sits in a white frame with a thicker bottom border, tilted 3 degrees, at most 360px wide (from 1250px viewports up, `clamp(300px, 26vw, 400px)`), with a translucent lavender tape strip across its top edge
- **AND** the frame has no caption
- **AND** the photo is cropped to 4:5 from the top so the face stays visible

#### Scenario: Photo loads first

- **WHEN** the home page loads
- **THEN** the hero photo is requested eagerly with high fetch priority, not lazily

#### Scenario: Tape is hidden from assistive technology

- **WHEN** a screen reader reads the hero
- **THEN** it announces the photo's alternative text and nothing for the tape strip
