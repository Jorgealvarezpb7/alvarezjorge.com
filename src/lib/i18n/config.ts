/**
 * Locale routing. The default locale lives at the root (`/`, `/proyectos/notely`); every
 * other locale gets a path prefix and translated segments (`/en`, `/en/projects/notely`).
 *
 * Routes in `src/routes` use the default-locale (Spanish) paths. The `reroute` hook in
 * `src/hooks.ts` maps localized URLs onto them with `delocalizePath`, so adding a locale
 * means adding it to `locales`, its segments to `SEGMENTS` and a messages dictionary.
 */
import type { Pathname } from '$app/types';

export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

/** Value for `<html lang>` and `hreflang`. */
export const htmlLang: Record<Locale, string> = { es: 'es', en: 'en' };

/** Value for `og:locale`. */
export const ogLocale: Record<Locale, string> = { es: 'es_ES', en: 'en_US' };

/** Translated path segments, keyed by the route (Spanish) segment. */
const SEGMENTS: Record<string, Partial<Record<Locale, string>>> = {
	proyectos: { en: 'projects' }
};

function isLocale(value: string): value is Locale {
	return (locales as readonly string[]).includes(value);
}

function splitPath(pathname: string): string[] {
	return pathname.split('/').filter(Boolean);
}

/** Locale of a URL path: its prefix, or the default locale when it has none. */
export function localeFromPath(pathname: string): Locale {
	const [first] = splitPath(pathname);
	return first && first !== defaultLocale && isLocale(first) ? first : defaultLocale;
}

/**
 * Route path (`/proyectos/notely`) to its URL in `locale` (`/en/projects/notely`). Typed as
 * `Pathname` so links can go through `resolve()`: localized URLs are valid pathnames served
 * by the `reroute` hook, even though Kit's generated type only lists the route tree.
 */
export function localizePath(path: string, locale: Locale): Pathname {
	if (locale === defaultLocale) return path as Pathname;
	const segments = splitPath(path).map((segment) => SEGMENTS[segment]?.[locale] ?? segment);
	return `/${[locale, ...segments].join('/')}` as Pathname;
}

/**
 * Localized URL path back to its route path. Returns `null` when the path mixes languages
 * (`/en/proyectos/notely`, `/projects/notely`) so it 404s instead of duplicating a page.
 */
export function delocalizePath(pathname: string): string | null {
	const locale = localeFromPath(pathname);
	const segments = splitPath(pathname);
	if (locale !== defaultLocale) segments.shift();

	const routeSegments: string[] = [];
	for (const segment of segments) {
		const route = Object.keys(SEGMENTS).find((key) => SEGMENTS[key][locale] === segment);
		// A route segment that has a translation for this locale must use it.
		if (!route && SEGMENTS[segment]?.[locale]) return null;
		if (!route && isTranslatedElsewhere(segment)) return null;
		routeSegments.push(route ?? segment);
	}
	return `/${routeSegments.join('/')}`;
}

/** True when `segment` is another locale's translation of a route segment. */
function isTranslatedElsewhere(segment: string): boolean {
	return Object.values(SEGMENTS).some((translations) =>
		Object.values(translations).includes(segment)
	);
}
