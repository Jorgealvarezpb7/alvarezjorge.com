<script lang="ts">
	import Container from '$lib/components/atoms/Container.svelte';
	import Chip from '$lib/components/atoms/Chip.svelte';
	import SectionHeading from '$lib/components/atoms/SectionHeading.svelte';
	import { i18n } from '$lib/i18n';

	// Adding/removing a technology only means editing this list.
	const technologies = [
		'Svelte',
		'TypeScript',
		'JavaScript',
		'React',
		'Angular',
		'Spring Boot',
		'Java',
		'TailwindCSS',
		'Sass',
		'HTML5',
		'CSS3',
		'MySQL',
		'PostgreSQL',
		'Docker',
		'Git',
		'Shopify'
	];

	const t = $derived(i18n.t);
</script>

<section
	id="about"
	data-panel
	aria-label={t.sections.about}
	class="flex panel flex-col justify-center gap-12 border-l border-border p-16 wide:px-0"
>
	<Container class="wide:flex wide:flex-col wide:gap-12">
		<SectionHeading index="01" title={t.sections.about} />
		<p
			class="m-0 max-w-[1080px] font-display text-[30px] leading-[1.12] font-medium tracking-[-0.025em] md:text-[52px]"
		>
			{t.about.introBefore}<span class="font-serif font-normal text-accent italic"
				>{t.about.introHighlight}</span
			>{t.about.introAfter}
		</p>
		<div class="flex flex-col gap-4">
			<h3 class="m-0 text-[15px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
				{t.common.technologies}
			</h3>
			<ul class="m-0 flex max-w-[1080px] list-none flex-wrap gap-2.5 p-0">
				{#each technologies as technology (technology)}
					<Chip label={technology} />
				{/each}
			</ul>
		</div>
	</Container>
</section>
