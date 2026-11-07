<script lang="ts">
	let { label }: { label: string } = $props();
</script>

<li
	class="rounded-full border border-line px-[18px] py-2.5 text-[15px] text-foreground transition-colors duration-150 hover:border-accent-text hover:bg-accent-text hover:text-white"
>
	{label}
</li>
