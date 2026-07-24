<script lang="ts">
	import SectionHeading from '$lib/components/atoms/SectionHeading.svelte';
	import TimelineEntry from '$lib/components/molecules/TimelineEntry.svelte';

	const entries = [
		{
			period: 'Jun 2024 - Actualidad',
			title: 'Empresa Uno',
			href: '#',
			description:
				'Desarrollo de interfaces con Svelte y TypeScript, colaborando con diseno para llevar prototipos a producto en produccion.'
		},
		{
			period: 'Ene 2023 - May 2024',
			title: 'Empresa Dos',
			href: '#',
			description:
				'Mantenimiento y mejora de una plataforma web, foco en accesibilidad y en la optimizacion del rendimiento del frontend.'
		},
		{
			period: 'Ago 2021 - Dic 2022',
			title: 'Empresa Tres',
			href: '#',
			description:
				'Primeros pasos profesionales construyendo componentes reutilizables y maquetando interfaces a partir de disenos en Figma.'
		}
	];
</script>

<section id="experience" class="mx-auto max-w-6xl px-6 py-20">
	<div class="mb-12 text-center">
		<SectionHeading text="Experiencia" />
	</div>
	<div>
		{#each entries as entry (entry.title)}
			<TimelineEntry {...entry} />
		{/each}
	</div>
</section>
