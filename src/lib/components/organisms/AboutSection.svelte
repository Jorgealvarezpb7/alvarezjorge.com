<script lang="ts">
	import Container from '$lib/components/atoms/Container.svelte';
	import Chip from '$lib/components/atoms/Chip.svelte';
	import SectionHeading from '$lib/components/atoms/SectionHeading.svelte';
	import { skillGroups } from '$lib/data/skills';
	import { i18n } from '$lib/i18n';

	const t = $derived(i18n.t);
</script>

<section
	id="about"
	data-panel
	aria-label={t.sections.about}
	class="panel flex flex-col justify-center gap-12 border-l border-border p-16 wide:px-0 horizontal:gap-(--panel-gap) horizontal:py-(--panel-py)"
>
	<Container class="wide:flex wide:flex-col wide:gap-12 horizontal:wide:gap-(--panel-gap)">
		<SectionHeading index="01" title={t.sections.about} />
		<p
			class="m-0 max-w-[1080px] font-display text-[30px] leading-[1.12] font-medium tracking-[-0.025em] md:text-[52px] horizontal:text-[clamp(28px,min(3.6vw,6.2dvh),52px)]"
		>
			{t.about.introBefore}<span class="font-serif font-normal text-accent italic"
				>{t.about.introHighlight}</span
			>{t.about.introAfter}
		</p>
		<div class="flex flex-col gap-4">
			<h3 class="m-0 text-[15px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
				{t.common.technologies}
			</h3>
			<!-- 2x2 from lg: the `auto` column aligns Backend under Languages, Tools under Frontend. -->
			<div
				class="grid max-w-[1080px] grid-cols-1 gap-x-10 gap-y-5 lg:grid-cols-[auto_1fr] horizontal:short:gap-y-3"
			>
				{#each skillGroups as group (group.id)}
					<div class="flex flex-col gap-2.5">
						<h4 class="m-0 text-[13px] font-semibold tracking-[0.08em] text-foreground-soft">
							{t.about.skillGroups[group.id]}
						</h4>
						<ul class="m-0 flex list-none flex-wrap gap-2.5 p-0">
							{#each group.items as item (item)}
								<Chip label={item} />
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</Container>
</section>
