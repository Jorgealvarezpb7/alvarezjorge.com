import type { Locale } from '$lib/i18n/config';

/**
 * Site-wide SEO constants. Per-locale copy (title, description, job title, OG image alt)
 * lives in the i18n dictionaries under `meta`.
 */
export const SITE_URL = 'https://alvarezjorge.com';

export const PERSON_NAME = 'Jorge Álvarez';

export const SAME_AS = [
	'https://github.com/jorgealvarezpb7',
	'https://www.linkedin.com/in/jorgealvarezpb7/'
];

export const OG_IMAGES: Record<Locale, string> = {
	es: '/ogimages/og-image-es.png',
	en: '/ogimages/og-image-en.png'
};

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

/** Absolute URL on the production origin for a site-relative path. */
export function absoluteUrl(path: string): string {
	return new URL(path, SITE_URL).href;
}

/** Serialises JSON-LD safely for inlining inside a <script> tag. */
export function jsonLd(data: unknown): string {
	return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}
