<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { delocalizePath, htmlLang, i18n, locales, localizePath } from '$lib/i18n';

	let { class: className = '' }: { class?: string } = $props();

	// Same page in the other language; error pages fall back to the home page.
	const routePath = $derived(delocalizePath(page.url.pathname) ?? '/');
</script>

<nav aria-label={i18n.t.common.language} class="flex items-center gap-1.5 {className}">
	{#each locales as locale, i (locale)}
		{#if i > 0}<span aria-hidden="true">/</span>{/if}
		<a
			href={resolve(localizePath(routePath, locale))}
			hreflang={htmlLang[locale]}
			lang={htmlLang[locale]}
			aria-current={locale === i18n.locale ? 'true' : undefined}
			onclick={(event) => {
				// Keep the current section (#projects…) when switching language.
				event.currentTarget.hash = location.hash;
			}}
			class="inline-flex min-h-11 items-center px-1 uppercase transition-opacity hover:opacity-70 {locale ===
			i18n.locale
				? 'font-semibold text-foreground'
				: 'text-muted-foreground'}"
		>
			{locale}
		</a>
	{/each}
</nav>
