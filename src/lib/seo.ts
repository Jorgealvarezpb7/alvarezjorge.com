/**
 * Site-wide SEO constants. The site is Spanish-only for now; the `en` entries are kept
 * ready for the upcoming i18n branch (titles, descriptions, OG image, hreflang).
 */
export const SITE_URL = 'https://alvarezjorge.com';

export const PERSON_NAME = 'Jorge Álvarez';

export const SAME_AS = [
	'https://github.com/jorgealvarezpb7',
	'https://www.linkedin.com/in/jorgealvarezpb7/'
];

export const seo = {
	es: {
		locale: 'es_ES',
		jobTitle: 'Desarrollador Full Stack',
		title: 'Jorge Álvarez — Desarrollador Full Stack',
		description:
			'Desarrollador full stack. Construyo software que la gente entiende a la primera: herramientas que conectan los procesos de una empresa y simplifican el día a día.',
		ogImage: '/ogimages/og-image-es.png',
		ogImageAlt: 'Jorge Álvarez — Desarrollador Full Stack en Madrid, España'
	},
	en: {
		locale: 'en_US',
		jobTitle: 'Full Stack Developer',
		title: 'Jorge Álvarez — Full Stack Developer',
		description:
			"Full stack developer. I build software people understand at first glance: tools that connect a company's processes and make everyday work easier, not harder.",
		ogImage: '/ogimages/og-image-en.png',
		ogImageAlt: 'Jorge Álvarez — Full Stack Developer in Madrid, Spain'
	}
} as const;

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

/** Absolute URL on the production origin for a site-relative path. */
export function absoluteUrl(path: string): string {
	return new URL(path, SITE_URL).href;
}

/** Serialises JSON-LD safely for inlining inside a <script> tag. */
export function jsonLd(data: unknown): string {
	return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}
