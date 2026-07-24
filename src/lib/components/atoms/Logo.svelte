<script lang="ts">
	let { name = 'Dev' }: { name?: string } = $props();
</script>

<span class="text-xl font-extrabold tracking-tight text-foreground">
	{name}<span class="text-accent">/</span>
</span>
