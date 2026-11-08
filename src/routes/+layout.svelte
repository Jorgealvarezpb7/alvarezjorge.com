<script lang="ts">
	import './layout.css';
	import { htmlLang, i18n } from '$lib/i18n';

	let { children } = $props();

	// SSR sets <html lang> (hooks.server.ts); keep it right after client-side language switches.
	$effect(() => {
		document.documentElement.lang = htmlLang[i18n.locale];
	});
</script>

<div class="min">
	{@render children()}
</div>
