<script lang="ts">
	import { resolve } from '$app/paths';
	import Icon from '$lib/components/atoms/Icon.svelte';
	import type { Project } from '$lib/data/projects';
	import { i18n } from '$lib/i18n';
	import ArrowRight from '~icons/lucide/arrow-right';

	let { project }: { project: Project } = $props();
	const t = $derived(i18n.t);
</script>

<article
	class="flex min-h-[380px] flex-col gap-5 rounded-3xl bg-surface-inverse-raised p-10 text-on-inverse horizontal:min-h-[min(380px,48dvh)] horizontal:gap-[clamp(12px,2.5dvh,20px)] horizontal:p-[clamp(24px,5dvh,40px)]"
>
	<div class="flex flex-wrap items-center justify-between gap-3">
		<span
			class="rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-foreground {project.badge ===
			'highlight'
				? 'bg-accent-on-inverse'
				: 'bg-surface-muted'}"
		>
			{project.category}
		</span>
		<span class="text-sm text-on-inverse-muted">{project.period}</span>
	</div>
	<h3
		class="m-0 font-display text-5xl leading-none font-bold tracking-[-0.04em] md:text-[72px] horizontal:text-[clamp(40px,min(5vw,9dvh),72px)]"
	>
		{project.title}
	</h3>
	<p class="m-0 text-sm tracking-[0.08em] text-on-inverse-muted uppercase">{project.role}</p>
	<p class="m-0 max-w-[520px] text-lg leading-[1.55] text-on-inverse-body">{project.summary}</p>
	<div class="mt-auto flex flex-wrap items-center gap-x-8 gap-y-2">
		<a
			href={resolve(i18n.path(`/proyectos/${project.slug}`))}
			class="inline-flex items-center gap-2.5 py-2.5 text-base font-semibold text-accent-on-inverse transition-opacity hover:opacity-80"
		>
			{t.projects.viewProject(project.title)}
			<ArrowRight class="size-4" aria-hidden="true" />
		</a>
		{#if project.repo}
			<a
				href={project.repo}
				target="_blank"
				rel="external noreferrer"
				class="inline-flex items-center gap-2.5 py-2.5 text-base font-semibold text-accent-on-inverse transition-opacity hover:opacity-80"
			>
				{t.projects.viewOnGitHub}
				<Icon name="arrow-up-right" class="size-4" />
			</a>
		{/if}
	</div>
</article>
