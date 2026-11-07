<script lang="ts">
	import { resolve } from '$app/paths';
	import Chip from '$lib/components/atoms/Chip.svelte';
	import Logo from '$lib/components/atoms/Logo.svelte';
	import ContactCard from '$lib/components/molecules/ContactCard.svelte';
	import Seo from '$lib/components/atoms/Seo.svelte';
	import { PERSON_NAME } from '$lib/seo';
	import ArrowLeft from '~icons/lucide/arrow-left';

	let { data } = $props();
	const project = $derived(data.project);
</script>

<Seo
	title="{project.title} — {PERSON_NAME}"
	description={project.summary}
	path="/proyectos/{project.slug}"
	type="article"
/>

<header
	class="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-background px-12 py-3.5"
>
	<Logo inPage={false} />
	<a
		href="{resolve('/')}#projects"
		class="inline-flex min-h-11 items-center gap-2 px-1 py-3 text-[15px] font-semibold text-accent-text hover:text-link-hover"
	>
		<ArrowLeft class="size-4" aria-hidden="true" />
		Volver
	</a>
</header>

<main class="mx-auto flex max-w-[1180px] flex-col gap-16 p-16">
	<section class="flex flex-col gap-6 rounded-3xl bg-surface-inverse p-10 text-on-inverse md:p-16">
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
		<div class="flex flex-wrap items-center gap-6">
			{#if project.icon}
				<img
					src={project.icon}
					alt=""
					width="88"
					height="88"
					class="size-[88px] rounded-3xl object-contain"
				/>
			{/if}
			<h1
				class="m-0 font-display text-6xl leading-none font-bold tracking-[-0.04em] md:text-[120px]"
			>
				{project.title}
			</h1>
		</div>
		<p class="m-0 text-sm tracking-[0.08em] text-on-inverse-muted uppercase">{project.role}</p>
		<p class="m-0 max-w-[720px] text-xl leading-[1.55] text-on-inverse-body">{project.summary}</p>
	</section>

	<section class="flex flex-col gap-6">
		<h2 class="m-0 text-[15px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
			La historia
		</h2>
		<p
			class="m-0 max-w-[1080px] font-display text-[26px] leading-[1.25] font-medium tracking-[-0.02em] md:text-[36px]"
		>
			{project.story}
		</p>
	</section>

	<section class="flex flex-col gap-6">
		<h2 class="m-0 text-[15px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
			Lo que hice
		</h2>
		<ol class="m-0 flex list-none flex-col p-0">
			{#each project.highlights as highlight, i (highlight)}
				<li
					class="flex gap-6 border-t border-line py-6 text-lg leading-[1.55] text-foreground-soft last:border-b"
				>
					<span class="shrink-0 font-display font-bold text-accent-text">
						{String(i + 1).padStart(2, '0')}
					</span>
					{highlight}
				</li>
			{/each}
		</ol>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="m-0 text-[15px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
			Tecnologías
		</h2>
		<ul class="m-0 flex list-none flex-wrap gap-2.5 p-0">
			{#each project.tags as tag (tag)}
				<Chip label={tag} />
			{/each}
		</ul>
	</section>

	{#if project.repo || project.link}
		<div class="flex flex-wrap gap-3">
			{#if project.repo}
				<ContactCard label="Repositorio" href={project.repo} />
			{/if}
			{#if project.link}
				<ContactCard label="Visitar sitio" href={project.link} />
			{/if}
		</div>
	{/if}

	<footer
		class="flex flex-wrap justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground"
	>
		<span>Madrid, España</span>
		<span>&copy;2026 | Jorge Alvarez</span>
		<a href="{resolve('/')}#projects" class="font-semibold text-accent-text hover:text-link-hover">
			Volver a proyectos ←
		</a>
	</footer>
</main>
