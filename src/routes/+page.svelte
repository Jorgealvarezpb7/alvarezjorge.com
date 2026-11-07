<script lang="ts">
	import Header from '$lib/components/molecules/Header.svelte';
	import HeroSection from '$lib/components/organisms/HeroSection.svelte';
	import AboutSection from '$lib/components/organisms/AboutSection.svelte';
	import ProjectsSection from '$lib/components/organisms/ProjectsSection.svelte';
	import ExperienceSection from '$lib/components/organisms/ExperienceSection.svelte';
	import FormationSection from '$lib/components/organisms/FormationSection.svelte';
	import ContactSection from '$lib/components/organisms/ContactSection.svelte';
	import { SectionNav, setSectionNav } from '$lib/navigation/section-nav.svelte';
	import Seo from '$lib/components/atoms/Seo.svelte';
	import { PERSON_NAME, SAME_AS, SITE_URL, absoluteUrl, jsonLd, seo } from '$lib/seo';

	const nav = setSectionNav(new SectionNav());

	const structuredData = jsonLd({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': `${SITE_URL}/#website`,
				name: PERSON_NAME,
				url: `${SITE_URL}/`,
				inLanguage: 'es'
			},
			{
				'@type': 'Person',
				'@id': `${SITE_URL}/#person`,
				name: PERSON_NAME,
				jobTitle: seo.es.jobTitle,
				url: `${SITE_URL}/`,
				image: absoluteUrl(seo.es.ogImage),
				address: { '@type': 'PostalAddress', addressLocality: 'Madrid', addressCountry: 'ES' },
				sameAs: SAME_AS
			}
		]
	});

	let track: HTMLElement;

	// Re-runs when the md breakpoint is crossed (attach reads `nav.horizontal`).
	$effect(() => nav.attach(track));
</script>

<Seo title={seo.es.title} description={seo.es.description} path="/" />

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON-LD built from constants -->
	{@html structuredData}
</svelte:head>

<div class="flex flex-col md:h-dvh">
	<Header />

	<main
		bind:this={track}
		class="relative no-scrollbar flex flex-col panel-track md:min-h-0 md:flex-1 md:flex-row md:overflow-x-auto md:overflow-y-hidden"
	>
		<HeroSection />
		<AboutSection />
		<ProjectsSection />
		<ExperienceSection />
		<FormationSection />
		<ContactSection />
	</main>
</div>
