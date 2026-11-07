<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<div class="min">
	{@render children()}
</div>
