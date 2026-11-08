<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { getSectionNav } from '$lib/navigation/section-nav.svelte';

	let { name = 'Jorge Alvarez' }: { name?: string } = $props();
	const year = 2026;
	const nav = getSectionNav();
</script>

<footer
	class="flex flex-wrap justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground"
>
	<span>{i18n.t.common.location}</span>
	<span>&copy;{year} | {name}</span>
	<a
		href="#hero"
		onclick={(event) => nav.handleAnchorClick(event, 'hero')}
		class="font-semibold text-accent-text hover:text-link-hover"
	>
		{i18n.t.contact.backToTop}
	</a>
</footer>
