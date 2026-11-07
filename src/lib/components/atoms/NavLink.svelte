<script lang="ts">
	let {
		id,
		label,
		active = false,
		onclick
	}: {
		/** Id of the in-page section this link jumps to. */
		id: string;
		label: string;
		active?: boolean;
		onclick?: (event: MouseEvent) => void;
	} = $props();
</script>

<a
	href="#{id}"
	{onclick}
	aria-current={active ? 'location' : undefined}
	class="inline-flex min-h-11 items-center px-1 py-3 text-[15px] transition-opacity hover:opacity-70 {active
		? 'font-semibold text-accent'
		: 'font-normal text-muted-foreground'}"
>
	{label}
</a>
