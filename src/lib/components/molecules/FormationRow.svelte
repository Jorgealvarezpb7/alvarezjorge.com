<script lang="ts">
	let {
		title,
		provider,
		duration
	}: {
		/** Title lines; each line break is kept as in the design. */
		title: string[];
		provider: string;
		duration: string;
	} = $props();
</script>

<div class="flex flex-wrap justify-between gap-4 border-t border-line py-7 last:border-b">
	<div class="flex flex-col gap-1.5">
		<p class="m-0 font-display text-[32px] leading-[1.15] font-medium tracking-[-0.02em]">
			{#each title as line, i (i)}
				{#if i > 0}<br />{/if}{line}
			{/each}
		</p>
		<p class="m-0 text-[15px] text-muted-foreground">{provider}</p>
	</div>
	<span class="text-[15px] text-foreground-soft">{duration}</span>
</div>
