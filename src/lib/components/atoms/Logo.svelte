<script lang="ts">
	import { resolve } from '$app/paths';
	import { i18n } from '$lib/i18n';

	let {
		inPage = true,
		onclick,
		class: className = ''
	}: {
		/** On the home page the logo jumps to the hero; elsewhere it links to the home page. */
		inPage?: boolean;
		onclick?: (event: MouseEvent) => void;
		class?: string;
	} = $props();
</script>

<a
	href={inPage ? '#hero' : resolve(i18n.path('/'))}
	{onclick}
	aria-label={i18n.t.common.goHome}
	class="inline-flex min-h-11 items-center px-1 py-3 font-display text-[22px] font-bold tracking-[-0.02em] text-foreground transition-opacity hover:opacity-70 {className}"
>
	JA<span class="text-accent">.</span>
</a>
