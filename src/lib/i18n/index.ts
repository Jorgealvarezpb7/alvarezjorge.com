import { page } from '$app/state';
import type { Pathname } from '$app/types';
import { localeFromPath, localizePath, type Locale } from './config';
import en from './messages/en';
import es, { type Messages } from './messages/es';

export * from './config';
export type { Messages };

export const messages: Record<Locale, Messages> = { es, en };

/**
 * Current locale and copy, derived from the URL. Reading these in a component (or a
 * `$derived`) keeps it in sync when client-side navigation switches language.
 */
export const i18n = {
	get locale(): Locale {
		return localeFromPath(page.url.pathname);
	},
	get t(): Messages {
		return messages[this.locale];
	},
	/** Route path (`/proyectos/notely`) as a URL in the current locale. */
	path(routePath: string): Pathname {
		return localizePath(routePath, this.locale);
	}
};
