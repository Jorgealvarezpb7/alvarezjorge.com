<script lang="ts">
	import SectionHeading from '$lib/components/atoms/SectionHeading.svelte';
	import TimelineEntry from '$lib/components/molecules/TimelineEntry.svelte';

	type Entry = {
		kind: 'work' | 'project';
		period: string;
		title: string;
		role: string;
		description: string;
		tag: string;
		href?: string;
		linkLabel?: string;
	};

	const entries: Entry[] = [
		{
			kind: 'work',
			period: '11/2025 – actualidad',
			title: 'Whizzes',
			role: 'Full Stack',
			description:
				'Desarrollo y personalización de tiendas Shopify para thebalancelab.es: adaptación de temas, configuración de la tienda e integraciones orientadas a ventas.',
			tag: 'Shopify / Hydrogen',
			href: 'https://thebalancelab.es/',
			linkLabel: 'thebalancelab.es'
		},
		{
			kind: 'work',
			period: '01/2025 – 06/2025',
			title: 'MELIT',
			role: 'Junior Full Stack · Prácticas',
			description:
				'Formación en JHipster (Spring Boot y Angular). App de alquiler de coches con gestión de vehículos y usuarios, y front-end de un portal inmobiliario.',
			tag: 'Angular / Spring Boot'
		},
		{
			kind: 'project',
			period: 'Proyecto',
			title: 'Send Invoice',
			role: 'Proyecto personal',
			description: 'App web para crear, gestionar y emitir facturas digitales en PDF.',
			tag: 'TypeScript · React · PostgreSQL',
			href: 'https://github.com/Jorgealvarezpb7/SendInvoice',
			linkLabel: 'GitHub'
		},
		{
			kind: 'project',
			period: 'Proyecto',
			title: 'CRM Puntos y Descuentos',
			role: 'Proyecto personal',
			description:
				'Gestión de fidelización: las empresas administran puntos de clientes y los convierten en descuentos. Módulos de clientes, inventario y ventas.',
			tag: 'Java · JavaFX · SQLite',
			href: 'https://github.com/Jorgealvarezpb7/Client-Rewards',
			linkLabel: 'GitHub'
		},
		{
			kind: 'project',
			period: 'Proyecto',
			title: 'Rent A Car',
			role: 'Proyecto personal',
			description:
				'Alquiler de vehículos con filtros por categoría y características, reservas online y pago seguro.',
			tag: 'JHipster · Angular · Spring Boot',
			href: 'https://github.com/Jorgealvarezpb7/RentACar',
			linkLabel: 'GitHub'
		}
	];
</script>

<section
	id="experience"
	data-panel
	aria-label="Experiencia"
	class="flex panel flex-col justify-center gap-12 p-16 md:w-[max(100%,1640px)] md:basis-auto"
>
	<SectionHeading index="03" title="Experiencia" />
	<div class="relative">
		<div aria-hidden="true" class="absolute inset-x-0 top-[7px] hidden h-px bg-line md:block"></div>
		<ol class="relative m-0 flex list-none flex-col gap-6 p-0 md:flex-row">
			{#each entries as entry (entry.title)}
				<TimelineEntry {...entry} />
			{/each}
		</ol>
	</div>
</section>
