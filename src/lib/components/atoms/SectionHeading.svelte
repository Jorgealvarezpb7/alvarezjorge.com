<script lang="ts">
	let {
		index,
		title,
		tone = 'light'
	}: { index: string; title: string; tone?: 'light' | 'dark' } = $props();
</script>

<div class="flex items-baseline gap-4 font-display">
	<span
		class="text-[15px] font-bold {tone === 'dark' ? 'text-accent-on-inverse' : 'text-accent-text'}"
	>
		{index}
	</span>
	<h2
		class="m-0 text-[15px] font-medium tracking-[0.12em] uppercase {tone === 'dark'
			? 'text-on-inverse-muted'
			: 'text-muted-foreground'}"
	>
		{title}
	</h2>
</div>
