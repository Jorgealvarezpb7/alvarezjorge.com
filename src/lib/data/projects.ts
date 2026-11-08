import notelyIcon from '$lib/assets/icon notely 2.png';
import suniLogo from '$lib/assets/suni-logo.svg';

import type { Messages } from '$lib/i18n';

export type ProjectSlug = keyof Messages['projectContent'];

/** Language-neutral project data; the copy lives in `projectContent.<slug>` of each dictionary. */
export type ProjectBase = {
	slug: ProjectSlug;
	icon?: string;
	title: string;
	/** Category pill style: lime highlight or neutral paper. */
	badge: 'highlight' | 'neutral';
	tags: string[];
	repo?: string;
	link?: string;
	background?: string;
};

export type Project = ProjectBase & Messages['projectContent'][ProjectSlug];

export const projects: ProjectBase[] = [
	{
		slug: 'notely',
		icon: notelyIcon,
		title: 'Notely',
		badge: 'highlight',
		tags: ['Swift', 'SwiftUI', 'AppKit', 'SQLite', 'GitHub API', 'OpenSpec'],
		repo: 'https://github.com/Jorgealvarezpb7/Notely'
	},
	{
		slug: 'suni',
		icon: suniLogo,
		title: 'Suni',
		badge: 'neutral',
		tags: ['SvelteKit', 'TypeScript', 'Rust', 'Axum', 'PostgreSQL', 'Tailwind CSS'],
		repo: 'https://github.com/whizzes/suniglobal.org',
		link: 'https://suniglobal.org/',
		background: '#F77C2C'
	}
];

export function findProject(slug: string): ProjectBase | undefined {
	return projects.find((project) => project.slug === slug);
}

/** A project merged with its copy in the given dictionary. */
export function localizeProject(project: ProjectBase, t: Messages): Project {
	return { ...project, ...t.projectContent[project.slug] };
}
