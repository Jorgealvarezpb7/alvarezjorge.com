import type { Messages } from '$lib/i18n';

export type SkillGroupId = keyof Messages['about']['skillGroups'];

/** A group of technologies; its label lives in `about.skillGroups.<id>` of each dictionary. */
export type SkillGroup = {
	id: SkillGroupId;
	/** Tech names, shown as-is in every language. */
	items: readonly string[];
};

/** Skills shown in the About section. Adding or moving a technology only means editing this list. */
export const skillGroups: readonly SkillGroup[] = [
	{ id: 'languages', items: ['TypeScript', 'JavaScript', 'Java', 'SQL'] },
	{
		id: 'frontend',
		items: ['Svelte', 'React', 'Angular', 'Tailwind CSS', 'HTML5 / CSS3', 'Sass']
	},
	{ id: 'backend', items: ['Spring Boot', 'PostgreSQL', 'MySQL'] },
	{ id: 'tools', items: ['Git', 'Docker', 'Cloudflare', 'Shopify'] }
];
