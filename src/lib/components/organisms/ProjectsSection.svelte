<script lang="ts">
	import Container from '$lib/components/atoms/Container.svelte';
	import SectionHeading from '$lib/components/atoms/SectionHeading.svelte';
	import ProjectCard from '$lib/components/molecules/ProjectCard.svelte';
	import { projects } from '$lib/data/projects';
</script>

<section
	id="projects"
	data-panel
	aria-label="Últimos proyectos"
	class="panel-card flex panel flex-col justify-center gap-10 bg-surface-inverse p-16 text-on-inverse wide:px-0"
>
	<Container class="wide:flex wide:flex-col wide:gap-10">
		<SectionHeading index="02" title="Últimos proyectos" tone="dark" />
		<div class="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6">
			{#each projects as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	</Container>
</section>
