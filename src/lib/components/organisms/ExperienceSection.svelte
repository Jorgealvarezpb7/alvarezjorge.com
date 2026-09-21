<script lang="ts">
	import SectionHeading from '$lib/components/atoms/SectionHeading.svelte';
	import TimelineEntry from '$lib/components/molecules/TimelineEntry.svelte';

	const entries = [
		{
			period: '11/2025 - Actualidad',
			title: 'Full Stack Whizzes',
			href: 'https://thebalancelab.es/',
			description:
				'Desarrollo y personalización de e-commerce en Shopify para thebalancelab.es, incluyendo adaptación de temas, configuración de la tienda online e integración de funcionalidades comerciales orientadas a la venta.',
			tags: ['Shopify/Hydrogen']
		},
		{
			period: '01/2025 - 06/2025',
			title: 'Junior Full Stack MELIT',
			description:
				'Durante mis prácticas empresariales, recibí una capacitación en JHipster, una herramienta que combina Spring Boot y Angular para el desarrollo full-stack de aplicaciones web. Participé en el desarrollo de una aplicación para la renta de coches, enfocada en la gestión vehículos y usuarios. Asi mismo ayude en el desarrollo de front-end en un proyecto para captar y vender pisos de una inmobiliaria.',
			tags: ['Angular/Spring Boot']
		},
		{
			period: 'Proyecto',
			title: 'Send Invoice',
			href: 'https://github.com/Jorgealvarezpb7/SendInvoice',
			description:
				'Aplicacion web de facturación que permite crear, gestionar y emitir facturas digitales de formato PDF.',
			tags: ['TypeScript', 'React', 'PostgreSQL']
		},
		{
			period: 'Proyecto',
			title: 'CRM Puntos y Descuentos',
			href: 'https://github.com/Jorgealvarezpb7/Client-Rewards',
			description:
				'Aplicación de gestión de fidelizaciones que permite a las empresas administrar puntos de clientes y para convertirlo en descuentos. Incluye módulos de clientes, inventario y ventas, con una interfaz intuitiva.',
			tags: ['Java', 'JavaFX', 'SQLite']
		},
		{
			period: 'Proyecto',
			title: 'Rent A Car',
			href: 'https://github.com/Jorgealvarezpb7/RentACar',
			description:
				'Aplicación web de alquiler de vehículos que permite a los clientes buscar coches por categorías y características específicas mediante filtros avanzados. Incluye sistema de reservas en línea y procesamiento seguro de pagos.',
			tags: ['JHipster', 'Angular', 'Spring Boot']
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
