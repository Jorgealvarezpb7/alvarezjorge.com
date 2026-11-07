<script lang="ts">
	let {
		kind,
		period,
		title,
		role,
		description,
		tag,
		href,
		linkLabel
	}: {
		/** Work entries get a filled marker, personal projects an outlined one. */
		kind: 'work' | 'project';
		period: string;
		title: string;
		role: string;
		description: string;
		tag: string;
		href?: string;
		linkLabel?: string;
	} = $props();
</script>

<li class="flex min-w-0 flex-col gap-5 md:flex-1 md:basis-0">
	<span
		aria-hidden="true"
		class="size-[15px] rounded-full border-[3px] border-background outline outline-1 outline-accent {kind ===
		'work'
			? 'bg-accent'
			: 'bg-background'}"
	></span>
	<div class="flex min-h-[340px] flex-col gap-3 rounded-[20px] border border-border bg-surface p-7">
		<span class="text-[13px] tracking-[0.06em] text-muted-foreground uppercase">{period}</span>
		<h3 class="m-0 font-display text-[28px] leading-[1.1] font-bold tracking-[-0.02em]">
			{title}
		</h3>
		<p class="m-0 text-sm font-semibold text-accent-text">{role}</p>
		<p class="m-0 text-[15px] leading-[1.55] text-foreground-soft">{description}</p>
		<div class="mt-auto flex flex-wrap items-center justify-between gap-2">
			<span class="rounded-full bg-tag px-3 py-[5px] text-[13px] text-foreground">
				{tag}
			</span>
			{#if href}
				<a
					{href}
					target="_blank"
					rel="external noreferrer"
					class="py-2.5 text-sm font-semibold text-accent-text hover:text-link-hover"
				>
					{linkLabel ?? 'Ver'} ↗
				</a>
			{/if}
		</div>
	</div>
</li>
