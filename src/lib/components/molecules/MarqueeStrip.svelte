<script lang="ts">
	let { items }: { items: string[] } = $props();
</script>

<div class="overflow-hidden border-y border-border py-6">
	<div class="marquee-track flex w-max items-center gap-8">
		{#each [0, 1] as copy (copy)}
			<div class="flex shrink-0 items-center gap-8" aria-hidden={copy === 1}>
				{#each items as item (item)}
					<span class="text-sm font-bold tracking-widest text-muted-foreground">
						{item}
					</span>
					<span class="text-accent">/</span>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.marquee-track {
		animation: marquee 25s linear infinite;
	}

	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}
</style>
