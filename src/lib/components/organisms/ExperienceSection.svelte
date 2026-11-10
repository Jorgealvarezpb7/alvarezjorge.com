<script lang="ts">
	import SectionHeading from '$lib/components/atoms/SectionHeading.svelte';
	import TimelineEntry from '$lib/components/molecules/TimelineEntry.svelte';
	import { i18n } from '$lib/i18n';

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

	const t = $derived(i18n.t);
	const copy = $derived(t.experience.entries);

	const entries: Entry[] = $derived([
		{
			kind: 'work',
			period: t.experience.currentWork,
			title: 'Whizzes',
			...copy.whizzes,
			tag: 'Shopify / Hydrogen',
			href: 'https://thebalancelab.es/',
			linkLabel: 'thebalancelab.es'
		},
		{
			kind: 'work',
			period: '01/2025 – 06/2025',
			title: 'MELIT',
			...copy.melit,
			tag: 'Angular / Spring Boot'
		},
		{
			kind: 'project',
			period: t.experience.project,
			role: t.experience.personalProject,
			...copy.sendInvoice,
			tag: 'TypeScript · React · PostgreSQL',
			href: 'https://github.com/Jorgealvarezpb7/SendInvoice',
			linkLabel: 'GitHub'
		},
		{
			kind: 'project',
			period: t.experience.project,
			role: t.experience.personalProject,
			...copy.clientRewards,
			tag: 'Java · JavaFX · SQLite',
			href: 'https://github.com/Jorgealvarezpb7/Client-Rewards',
			linkLabel: 'GitHub'
		},
		{
			kind: 'project',
			period: t.experience.project,
			role: t.experience.personalProject,
			...copy.rentACar,
			tag: 'JHipster · Angular · Spring Boot',
			href: 'https://github.com/Jorgealvarezpb7/RentACar',
			linkLabel: 'GitHub'
		}
	]);
</script>

<section
	id="experience"
	data-panel
	aria-label={t.sections.experience}
	class="panel flex flex-col justify-center gap-12 p-16 wide:px-(--container-pad) horizontal:w-[max(min(100%,var(--panel-max)),1640px)] horizontal:basis-auto horizontal:gap-(--panel-gap) horizontal:py-(--panel-py)"
>
	<SectionHeading index="03" title={t.sections.experience} />
	<div class="relative">
		<div
			aria-hidden="true"
			class="absolute inset-x-0 top-[7px] hidden h-px bg-line horizontal:block"
		></div>
		<ol class="relative m-0 flex list-none flex-col gap-6 p-0 horizontal:flex-row">
			{#each entries as entry (entry.title)}
				<TimelineEntry {...entry} />
			{/each}
		</ol>
	</div>
</section>
