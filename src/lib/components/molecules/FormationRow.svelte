<script lang="ts">
	import TechIcon from '$lib/components/atoms/TechIcon.svelte';

	type Tech = 'html' | 'css' | 'js' | 'figma' | 'git';

	let {
		techs,
		title,
		provider,
		duration
	}: { techs: Tech[]; title: string; provider: string; duration: string } = $props();
</script>

<div class="flex items-center justify-between gap-4 border-b border-border py-6 last:border-none">
	<div class="flex items-center gap-4">
		<div class="flex -space-x-3">
			{#each techs as tech (tech)}
				<TechIcon {tech} size="sm" />
			{/each}
		</div>
		<span class="font-bold text-foreground">{title}</span>
	</div>
	<div class="shrink-0 text-sm text-muted-foreground">
		<span class="text-foreground">{provider}</span>
		{duration}
	</div>
</div>
