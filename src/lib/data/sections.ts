/**
 * Ordered registry of home page sections. Panel ids, header links, the mobile menu,
 * the `NN / NN` counter and hash validation all read from this list.
 */
export const sections = [
	{ id: 'hero', label: 'Inicio' },
	{ id: 'about', label: 'Sobre mí' },
	{ id: 'projects', label: 'Proyectos' },
	{ id: 'experience', label: 'Experiencia' },
	{ id: 'formation', label: 'Formación' },
	{ id: 'contact', label: 'Contacto' }
] as const;

export type SectionId = (typeof sections)[number]['id'];

/** Sections shown as navigation links (everything except the hero). */
export const navSections = sections.slice(1);

export function sectionIndex(id: string): number {
	return sections.findIndex((section) => section.id === id);
}
