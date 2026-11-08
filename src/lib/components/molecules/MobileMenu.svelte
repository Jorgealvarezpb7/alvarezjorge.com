<script lang="ts">
	import LanguageSwitch from '$lib/components/atoms/LanguageSwitch.svelte';
	import { navSections } from '$lib/data/sections';
	import { i18n } from '$lib/i18n';

	let { id, activeId, onnavigate }: { id: string; activeId: string; onnavigate: () => void } =
		$props();

	const t = $derived(i18n.t);
</script>

<nav
	{id}
	aria-label={t.header.sectionsNav}
	class="absolute inset-x-0 top-full border-b border-border bg-background px-12 pb-6 md:hidden"
>
	<ul class="flex flex-col">
		{#each navSections as section (section.id)}
			<li class="border-t border-border first:border-t-0">
				<a
					href="#{section.id}"
					onclick={onnavigate}
					aria-current={activeId === section.id ? 'location' : undefined}
					class="flex min-h-11 items-center justify-between py-4 font-display text-3xl font-medium tracking-[-0.02em] {activeId ===
					section.id
						? 'text-accent-text'
						: 'text-foreground'}"
				>
					{t.sections[section.id]}
					<span aria-hidden="true" class="text-xl text-faint">→</span>
				</a>
			</li>
		{/each}
	</ul>
	<LanguageSwitch
		class="border-t border-border pt-4 font-display text-[15px] text-muted-foreground"
	/>
</nav>
