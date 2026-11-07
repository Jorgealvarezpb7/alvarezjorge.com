<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		class: className = '',
		children
	}: {
		/** Layout classes for the wide breakpoint (e.g. `wide:flex wide:flex-col wide:gap-12`). */
		class?: string;
		children: Snippet;
	} = $props();
</script>

<!--
	From the `wide` breakpoint (1250px) up, a full-width box with `--container-pad` side padding;
	inside a panel the panel itself caps the width, elsewhere pass `wide:mx-auto wide:max-w-(--panel-max)`.
	Below `wide` the wrapper is `display: contents`, so the parent's layout is unchanged.
-->
<div class="container-wide {className}">
	{@render children()}
</div>
