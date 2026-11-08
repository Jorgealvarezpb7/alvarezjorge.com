import { error } from '@sveltejs/kit';
import { findProject, projects } from '$lib/data/projects';
import { localeFromPath, messages } from '$lib/i18n';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

// Spanish URLs; the English ones (/en/projects/<slug>) are found by the crawler via the
// language switcher and rerouted onto this route by `src/hooks.ts`.
export const entries: EntryGenerator = () => projects.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params, url }) => {
	const project = findProject(params.slug);
	if (!project) error(404, messages[localeFromPath(url.pathname)].project.notFound);
	return { project };
};
