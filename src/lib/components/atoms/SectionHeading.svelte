<script lang="ts">
	let {
		index,
		title,
		tone = 'light'
	}: { index: string; title: string; tone?: 'light' | 'dark' } = $props();
</script>

<div class="flex items-baseline gap-4 font-display">
	<span class="text-[15px] font-bold {tone === 'dark' ? 'text-highlight' : 'text-accent'}">
		{index}
	</span>
	<h2
		class="m-0 text-[15px] font-medium tracking-[0.12em] uppercase {tone === 'dark'
			? 'text-on-accent-muted'
			: 'text-muted-foreground'}"
	>
		{title}
	</h2>
</div>
