<script lang="ts">
	import SectionHeading from '$lib/components/atoms/SectionHeading.svelte';
	import ProjectCard from '$lib/components/molecules/ProjectCard.svelte';
	import notelyIcon from '$lib/assets/icon notely 2.png';

	const projects = [
		{
			icon: notelyIcon,
			title: 'Notely',
			category: 'Proyecto open source',
			role: 'Creador y desarrollador',
			period: 'sept. 2026 – actualidad',
			summary:
				'App nativa de notas adhesivas para macOS, con checklists, descripciones en Markdown y sincronización con issues de GitHub.',
			story:
				'Fue un proyecto muy bonito y divertido de construir: nació como una herramienta para mi propio Mac y terminó convirtiéndose en mi laboratorio para aprender desarrollo nativo.',
			highlights: [
				'Lo desarrollé siguiendo Spec-Driven Development con OpenSpec: cada feature empieza como una especificación y de ahí sale el código y los tests.',
				'Diseñé una arquitectura modular en Swift Package Manager, separando dominio, persistencia, integraciones y UI en targets independientes.',
				'Construí ventanas flotantes con AppKit y SwiftUI que recuerdan texto, tamaño y posición entre sesiones, con formato de texto, colores por nota y animaciones.',
				'Se migró la persistencia a SQLite con un sistema de migraciones propio y su batería de tests.',
				'Integré la API de GitHub para sincronizar notas con issues, guardando el token de forma segura en el Llavero de macOS.',
				'Añadí detección de enlaces con tarjetas de vista previa y un parser de Markdown hecho a mano.'
			],
			tags: ['Swift', 'SwiftUI', 'AppKit', 'SQLite', 'GitHub API', 'OpenSpec'],
			repo: 'https://github.com/Jorgealvarezpb7/Notely'
		}
	];
</script>

<section id="projects" class="mx-auto max-w-6xl px-6 py-20">
	<div class="mb-12 text-center">
		<SectionHeading text="Últimos Proyectos" />
	</div>
	<div class="flex flex-col gap-6">
		{#each projects as project (project.title)}
			<ProjectCard {...project} />
		{/each}
	</div>
</section>
