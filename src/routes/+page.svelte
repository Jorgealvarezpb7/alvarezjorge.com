<script lang="ts">
	import Header from '$lib/components/molecules/Header.svelte';
	import Footer from '$lib/components/molecules/Footer.svelte';
	import HeroSection from '$lib/components/organisms/HeroSection.svelte';
	import MarqueeSection from '$lib/components/organisms/MarqueeSection.svelte';
	import AboutSection from '$lib/components/organisms/AboutSection.svelte';
	import ExperienceSection from '$lib/components/organisms/ExperienceSection.svelte';
	import FormationSection from '$lib/components/organisms/FormationSection.svelte';
	import ContactSection from '$lib/components/organisms/ContactSection.svelte';
</script>

<Header />

<main>
	<HeroSection />
	<MarqueeSection />
	<AboutSection />
	<ExperienceSection />
	<FormationSection />
	<ContactSection />
</main>

<Footer />
