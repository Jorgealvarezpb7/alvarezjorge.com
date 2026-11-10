<script lang="ts">
	import Container from '$lib/components/atoms/Container.svelte';
	import SectionHeading from '$lib/components/atoms/SectionHeading.svelte';
	import ProjectCard from '$lib/components/molecules/ProjectCard.svelte';
	import { localizeProject, projects } from '$lib/data/projects';
	import { i18n } from '$lib/i18n';

	const t = $derived(i18n.t);
</script>

<section
	id="projects"
	data-panel
	aria-label={t.projects.heading}
	class="panel-card panel flex flex-col justify-center gap-10 bg-surface-inverse p-16 text-on-inverse wide:px-0 horizontal:gap-(--panel-gap) horizontal:py-(--panel-py)"
>
	<Container class="wide:flex wide:flex-col wide:gap-10 horizontal:wide:gap-(--panel-gap)">
		<SectionHeading index="02" title={t.projects.heading} tone="dark" />
		<div class="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6">
			{#each projects as project (project.slug)}
				<ProjectCard project={localizeProject(project, t)} />
			{/each}
		</div>
	</Container>
</section>
