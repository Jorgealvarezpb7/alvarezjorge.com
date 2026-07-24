<script lang="ts">
	import SectionHeading from '$lib/components/atoms/SectionHeading.svelte';
	import ContactCard from '$lib/components/molecules/ContactCard.svelte';

	const links = [
		{ icon: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
		{ icon: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
		{ icon: 'github', label: 'GitHub', href: 'https://github.com' },
		{ icon: 'mail', label: 'E-mail', href: 'mailto:hola@example.com' }
	] as const;
</script>

<section id="contact" class="mx-auto max-w-6xl px-6 py-20 text-center">
	<SectionHeading text="Contacto" />
	<p class="mt-4 text-muted-foreground">Escribime o segui mis redes</p>
	<div class="mx-auto mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
		{#each links as link (link.label)}
			<ContactCard icon={link.icon} label={link.label} href={link.href} />
		{/each}
	</div>
</section>
