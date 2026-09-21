<script lang="ts">
	let { href, label, active = false }: { href: string; label: string; active?: boolean } = $props();
</script>

<a
	{href}
	class="border-b-2 pb-1 text-sm font-medium transition-colors {active
		? 'border-accent text-foreground'
		: 'border-transparent text-muted-foreground hover:text-foreground'}"
>
	{label}
</a>
