<script lang="ts">
	import Icon from '$lib/components/atoms/Icon.svelte';

	type IconName = 'linkedin' | 'instagram' | 'github' | 'mail';

	let { icon, label, href }: { icon: IconName; label: string; href: string } = $props();
</script>

<a
	{href}
	target="_blank"
	rel="noreferrer"
	class="flex items-center justify-between rounded-xl border border-border px-6 py-4 transition-colors hover:border-accent"
>
	<span class="flex items-center gap-3 font-medium text-foreground">
		<Icon name={icon} class="h-5 w-5" />
		{label}
	</span>
	<Icon name="arrow-up-right" class="h-4 w-4 text-accent" />
</a>
