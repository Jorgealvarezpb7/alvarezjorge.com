import type { Reroute } from '@sveltejs/kit';
import { delocalizePath } from '$lib/i18n/config';

/** Serve localized URLs (`/en/projects/notely`) from the Spanish route tree. */
export const reroute: Reroute = ({ url }) => delocalizePath(url.pathname) ?? undefined;
