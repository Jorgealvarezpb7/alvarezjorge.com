<script lang="ts">
	let { name = 'Jorge Alvarez' }: { name?: string } = $props();
	const year = 2026;
</script>

<footer class="border-t border-border py-8 text-center">
	<p class="text-sm text-muted-foreground">&copy;{year} | {name}</p>
</footer>
