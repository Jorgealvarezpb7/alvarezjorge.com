<script lang="ts">
	import Logo from '$lib/components/atoms/Logo.svelte';
	import NavLink from '$lib/components/atoms/NavLink.svelte';

	const navItems = [
		{ href: '#about', label: 'Sobre mi', active: true },
		{ href: '#experience', label: 'Experiencia' },
		{ href: '#formation', label: 'Formacion' },
		{ href: '#contact', label: 'Contacto' }
	];
</script>

<header class="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
	<div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
		<Logo />
		<nav class="hidden items-center gap-8 sm:flex">
			{#each navItems as item (item.href)}
				<NavLink href={item.href} label={item.label} active={item.active} />
			{/each}
		</nav>
	</div>
</header>
