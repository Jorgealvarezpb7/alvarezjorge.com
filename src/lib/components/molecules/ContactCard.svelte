<script lang="ts">
	let { label, href }: { label: string; href: string } = $props();

	const opensNewTab = $derived(href.startsWith('http'));
</script>

<!-- Always an external destination (profile, repository, live site or mailto:). -->
<a
	{href}
	target={opensNewTab ? '_blank' : undefined}
	rel="external noreferrer"
	class="flex flex-[1_1_240px] items-center justify-between rounded-full border border-foreground px-7 py-6 font-display text-2xl font-medium text-foreground transition-colors duration-150 hover:bg-surface-inverse hover:text-on-inverse"
>
	{label}
	<span aria-hidden="true">↗</span>
</a>
