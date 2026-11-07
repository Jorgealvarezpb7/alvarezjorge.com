import { error } from '@sveltejs/kit';
import { findProject, projects } from '$lib/data/projects';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => projects.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const project = findProject(params.slug);
	if (!project) error(404, 'Proyecto no encontrado');
	return { project };
};
