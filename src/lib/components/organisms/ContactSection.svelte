<script lang="ts">
	import Icon from '$lib/components/atoms/Icon.svelte';
	import SectionHeading from '$lib/components/atoms/SectionHeading.svelte';
	import ContactCard from '$lib/components/molecules/ContactCard.svelte';

	const links = [
		{ icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/jorgealvarezpb7/' },
		{ icon: 'github', label: 'GitHub', href: 'https://github.com/jorgealvarezpb7' },
		{ icon: 'mail', label: 'E-mail', href: 'mailto:jorgealvarezpb7@gmail.com' }
	] as const;
</script>

<section id="contact" class="mx-auto max-w-6xl px-6 py-20 text-center">
	<SectionHeading text="Contacto" />
	<p class="mt-4 text-muted-foreground">Escribeme o sigue mis redes</p>
	<div class="mx-auto mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
		{#each links as link (link.label)}
			<ContactCard icon={link.icon} label={link.label} href={link.href} />
		{/each}
	</div>
	<p class="mt-6 inline-flex items-center justify-center gap-2 text-muted-foreground">
		<Icon name="map-pin" class="h-5 w-5 text-accent" />
		Madrid, España
	</p>
</section>
