<script lang="ts">
	import MarqueeStrip from '$lib/components/molecules/MarqueeStrip.svelte';

	const items = [
		'WEB',
		'PROGRAMACION',
		'DESARROLLO',
		'JAVASCRIPT',
		'CSS',
		'FIGMA',
		'GIT',
		'HTML'
	];
</script>

<MarqueeStrip {items} />
