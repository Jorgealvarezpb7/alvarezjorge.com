import type { Handle } from '@sveltejs/kit';
import { htmlLang, localeFromPath } from '$lib/i18n/config';

/** Fill `<html lang="%lang%">` in app.html for the requested (or prerendered) locale. */
export const handle: Handle = ({ event, resolve }) => {
	const lang = htmlLang[localeFromPath(event.url.pathname)];
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
