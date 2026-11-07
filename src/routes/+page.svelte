<script lang="ts">
	import Header from '$lib/components/molecules/Header.svelte';
	import HeroSection from '$lib/components/organisms/HeroSection.svelte';
	import AboutSection from '$lib/components/organisms/AboutSection.svelte';
	import ProjectsSection from '$lib/components/organisms/ProjectsSection.svelte';
	import ExperienceSection from '$lib/components/organisms/ExperienceSection.svelte';
	import FormationSection from '$lib/components/organisms/FormationSection.svelte';
	import ContactSection from '$lib/components/organisms/ContactSection.svelte';
	import { SectionNav, setSectionNav } from '$lib/navigation/section-nav.svelte';

	const nav = setSectionNav(new SectionNav());

	let track: HTMLElement;

	// Re-runs when the md breakpoint is crossed (attach reads `nav.horizontal`).
	$effect(() => nav.attach(track));
</script>

<svelte:head>
	<title>Jorge Alvarez — Full Stack Developer</title>
</svelte:head>

<div class="flex flex-col md:h-dvh">
	<Header />

	<main
		bind:this={track}
		class="relative no-scrollbar flex flex-col md:min-h-0 md:flex-1 md:flex-row md:overflow-x-auto md:overflow-y-hidden"
	>
		<HeroSection />
		<AboutSection />
		<ProjectsSection />
		<ExperienceSection />
		<FormationSection />
		<ContactSection />
	</main>
</div>
