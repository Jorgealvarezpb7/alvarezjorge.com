/**
 * Ordered registry of home page sections. Panel ids, header links, the mobile menu,
 * the previous/next controls and hash validation all read from this list. Labels live in the
 * i18n dictionaries under `sections.<id>`.
 */
export const sections = [
	{ id: 'hero' },
	{ id: 'about' },
	{ id: 'projects' },
	{ id: 'experience' },
	{ id: 'formation' },
	{ id: 'contact' }
] as const;

export type SectionId = (typeof sections)[number]['id'];

/** Sections shown as navigation links (everything except the hero). */
export const navSections = sections.slice(1);

export function sectionIndex(id: string): number {
	return sections.findIndex((section) => section.id === id);
}
