<script lang="ts">
	import Container from '$lib/components/atoms/Container.svelte';
	import SectionHeading from '$lib/components/atoms/SectionHeading.svelte';
	import ContactCard from '$lib/components/molecules/ContactCard.svelte';
	import Footer from '$lib/components/molecules/Footer.svelte';

	const links = [
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/jorgealvarezpb7/' },
		{ label: 'GitHub', href: 'https://github.com/jorgealvarezpb7' },
		{ label: 'E-mail', href: 'mailto:jorgealvarezpb7@gmail.com' }
	];
</script>

<section
	id="contact"
	data-panel
	aria-label="Contacto"
	class="flex panel flex-col justify-between gap-10 p-16 wide:px-0"
>
	<Container class="wide:flex wide:flex-1 wide:flex-col wide:justify-between wide:gap-10">
		<SectionHeading index="05" title="Contacto" />
		<p
			class="m-0 font-display text-[56px] leading-[0.92] font-bold tracking-[-0.05em] md:text-[120px]"
		>
			Escríbeme<br /><span class="font-serif font-normal tracking-[-0.02em] text-accent italic"
				>o sigue mis redes</span
			>
		</p>
		<div class="flex flex-wrap gap-3">
			{#each links as link (link.label)}
				<ContactCard {...link} />
			{/each}
		</div>
		<Footer />
	</Container>
</section>
