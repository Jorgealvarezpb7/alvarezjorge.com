<script lang="ts">
	import Icon from '$lib/components/atoms/Icon.svelte';

	let {
		period,
		title,
		href,
		description
	}: { period: string; title: string; href: string; description: string } = $props();
</script>

<div class="grid gap-2 border-b border-border py-8 last:border-none sm:grid-cols-[180px_1fr]">
	<span class="text-sm font-semibold text-accent">{period}</span>
	<div>
		<a
			{href}
			target="_blank"
			rel="noreferrer"
			class="inline-flex items-center gap-1.5 text-lg font-bold text-foreground hover:text-accent"
		>
			{title}
			<Icon name="arrow-up-right" class="h-4 w-4" />
		</a>
		<p class="mt-3 max-w-2xl text-muted-foreground">{description}</p>
	</div>
</div>
