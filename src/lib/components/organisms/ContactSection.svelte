<script lang="ts">
	import Container from '$lib/components/atoms/Container.svelte';
	import SectionHeading from '$lib/components/atoms/SectionHeading.svelte';
	import ContactCard from '$lib/components/molecules/ContactCard.svelte';
	import Footer from '$lib/components/molecules/Footer.svelte';
	import { i18n } from '$lib/i18n';

	const links = [
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/jorgealvarezpb7/' },
		{ label: 'GitHub', href: 'https://github.com/jorgealvarezpb7' },
		{ label: 'E-mail', href: 'mailto:jorgealvarezpb7@gmail.com' }
	];

	const t = $derived(i18n.t);
</script>

<section
	id="contact"
	data-panel
	aria-label={t.sections.contact}
	class="panel flex flex-col justify-between gap-10 p-16 wide:px-0 horizontal:gap-(--panel-gap) horizontal:py-(--panel-py)"
>
	<Container
		class="wide:flex wide:flex-1 wide:flex-col wide:justify-between wide:gap-10 horizontal:wide:gap-(--panel-gap)"
	>
		<SectionHeading index="05" title={t.sections.contact} />
		<p
			class="m-0 font-display text-[56px] leading-[0.92] font-bold tracking-[-0.05em] text-foreground md:text-[120px] horizontal:text-[clamp(56px,min(9vw,16dvh),120px)]"
		>
			{t.contact.titleLine1}<br /><span
				class="font-serif font-normal tracking-[-0.02em] text-accent italic"
				>{t.contact.titleLine2}</span
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
