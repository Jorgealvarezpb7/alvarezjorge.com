import { projects } from '$lib/data/projects';
import { defaultLocale, htmlLang, locales, localizePath } from '$lib/i18n/config';
import { absoluteUrl } from '$lib/seo';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => {
	const routePaths = ['/', ...projects.map(({ slug }) => `/proyectos/${slug}`)];

	// One <url> per locale, each listing every language version (Google's hreflang format).
	const urls = routePaths.flatMap((path) => {
		const alternates = [
			...locales.map((l) => ({ hreflang: htmlLang[l], href: localizePath(path, l) })),
			{ hreflang: 'x-default', href: localizePath(path, defaultLocale) }
		]
			.map(
				({ hreflang, href }) =>
					`\t\t<xhtml:link rel="alternate" hreflang="${hreflang}" href="${absoluteUrl(href)}"/>`
			)
			.join('\n');
		return locales.map(
			(locale) =>
				`\t<url>\n\t\t<loc>${absoluteUrl(localizePath(path, locale))}</loc>\n${alternates}\n\t</url>`
		);
	});

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
};
