<script lang="ts">
	import Container from '$lib/components/atoms/Container.svelte';
	import Chip from '$lib/components/atoms/Chip.svelte';
	import SectionHeading from '$lib/components/atoms/SectionHeading.svelte';

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
</script>

<section
	id="about"
	data-panel
	aria-label="Sobre mí"
	class="flex panel flex-col justify-center gap-12 border-l border-border p-16 wide:px-0"
>
	<Container class="wide:flex wide:flex-col wide:gap-12">
		<SectionHeading index="01" title="Sobre mí" />
		<p
			class="m-0 max-w-[1080px] font-display text-[30px] leading-[1.12] font-medium tracking-[-0.025em] md:text-[52px]"
		>
			Soy desarrollador <span class="font-serif font-normal text-accent italic">full stack</span> y me
			gusta construir software que la gente entienda a la primera: herramientas que conecten los procesos
			de una empresa y hagan el día a día más fácil, no más complicado.
		</p>
		<div class="flex flex-col gap-4">
			<h3 class="m-0 text-[15px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
				Tecnologías
			</h3>
			<ul class="m-0 flex max-w-[1080px] list-none flex-wrap gap-2.5 p-0">
				{#each technologies as technology (technology)}
					<Chip label={technology} />
				{/each}
			</ul>
		</div>
	</Container>
</section>
