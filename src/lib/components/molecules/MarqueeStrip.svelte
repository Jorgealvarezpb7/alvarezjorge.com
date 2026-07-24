<script lang="ts">
	import type { Component } from 'svelte';

	type TechItem = { name: string; icon: Component };

	let { items }: { items: TechItem[] } = $props();
</script>

<div class="marquee-fade w-full overflow-hidden">
	<div class="marquee-track flex w-max items-center gap-10">
		{#each [0, 1] as copy (copy)}
			<div class="flex shrink-0 items-center gap-8 py-4" aria-hidden={copy === 1}>
				{#each items as item (item.name)}
					{@const Icon = item.icon}
					<span
						role="img"
						aria-label={item.name}
						class="inline-flex h-12 w-12 shrink-0 items-center justify-center transition-transform duration-200 hover:scale-150"
					>
						<Icon class="h-10 w-10" aria-hidden="true" />
					</span>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.marquee-fade {
		/* Fade the edges instead of hard-cutting the items at the rounded border. */
		mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
		-webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
	}

	.marquee-track {
		animation: marquee 30s linear infinite;
	}

	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee-track {
			animation-play-state: paused;
		}
	}
</style>
