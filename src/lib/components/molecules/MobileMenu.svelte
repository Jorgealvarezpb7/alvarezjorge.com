<script lang="ts">
	import { navSections } from '$lib/data/sections';

	let { id, activeId, onnavigate }: { id: string; activeId: string; onnavigate: () => void } =
		$props();
</script>

<nav
	{id}
	aria-label="Secciones"
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
					{section.label}
					<span aria-hidden="true" class="text-xl text-faint">→</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>
