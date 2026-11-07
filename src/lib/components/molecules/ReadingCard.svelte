<script lang="ts">
	let {
		title,
		meta,
		tone = 'light'
	}: { title: string; meta: string; tone?: 'light' | 'dark' } = $props();
</script>

<div
	class="flex flex-col gap-2 rounded-[20px] p-7 {tone === 'dark'
		? 'bg-accent text-on-accent'
		: 'border border-border-strong bg-surface'}"
>
	<p class="m-0 font-serif text-[34px] leading-[1.1] italic {tone === 'dark' ? '' : 'text-accent'}">
		{title}
	</p>
	<p class="m-0 text-sm {tone === 'dark' ? 'text-on-accent-muted' : 'text-muted-foreground'}">
		{meta}
	</p>
</div>
