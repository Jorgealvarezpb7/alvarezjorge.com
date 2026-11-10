<script lang="ts">
	import Container from '$lib/components/atoms/Container.svelte';
	import LanguageSwitch from '$lib/components/atoms/LanguageSwitch.svelte';
	import Logo from '$lib/components/atoms/Logo.svelte';
	import NavLink from '$lib/components/atoms/NavLink.svelte';
	import MobileMenu from '$lib/components/molecules/MobileMenu.svelte';
	import { navSections } from '$lib/data/sections';
	import { i18n } from '$lib/i18n';
	import { getSectionNav } from '$lib/navigation/section-nav.svelte';
	import ChevronLeft from '~icons/lucide/chevron-left';
	import ChevronRight from '~icons/lucide/chevron-right';
	import MenuIcon from '~icons/lucide/menu';
	import CloseIcon from '~icons/lucide/x';

	const nav = getSectionNav();
	const t = $derived(i18n.t);
	const uid = $props.id();
	const menuId = `${uid}-menu`;

	let header: HTMLElement;
	let toggle: HTMLButtonElement;
	let open = $state(false);

	function close({ restoreFocus = false } = {}) {
		open = false;
		if (restoreFocus) toggle.focus();
	}

	// The sheet only exists in the vertical layout; close it when the layout switches to the track.
	$effect(() => {
		if (nav.horizontal) open = false;
	});
</script>

<svelte:window
	onkeydown={(event) => {
		if (open && event.key === 'Escape') close({ restoreFocus: true });
	}}
	onpointerdown={(event) => {
		if (open && !header.contains(event.target as Node)) close({ restoreFocus: true });
	}}
/>

<header bind:this={header} class="sticky top-0 z-20 bg-background horizontal:static">
	<div
		class="flex flex-wrap items-center justify-between gap-4 border-b border-border px-12 py-3.5 wide:px-0 horizontal:short:py-1.5"
	>
		<Container
			class="wide:mx-auto wide:flex wide:max-w-(--panel-max) wide:flex-wrap wide:items-center wide:justify-between wide:gap-4"
		>
			<Logo
				class="horizontal:short:py-0"
				onclick={(event) => nav.handleAnchorClick(event, 'hero')}
			/>

			<nav aria-label={t.header.sectionsNav} class="hidden flex-wrap gap-6 horizontal:flex">
				{#each navSections as section (section.id)}
					<NavLink
						id={section.id}
						label={t.sections[section.id]}
						active={nav.activeId === section.id}
						onclick={(event) => nav.handleAnchorClick(event, section.id)}
					/>
				{/each}
			</nav>

			<div
				class="hidden items-center gap-3 font-display text-[15px] text-muted-foreground horizontal:flex"
			>
				<LanguageSwitch class="mr-1" />
				<button
					type="button"
					aria-label={t.header.prevSection}
					onclick={() => nav.prev()}
					class="flex size-11 cursor-pointer items-center justify-center rounded-full border border-border-strong text-foreground transition-opacity hover:opacity-70"
				>
					<ChevronLeft class="size-[18px]" aria-hidden="true" />
				</button>
				<button
					type="button"
					aria-label={t.header.nextSection}
					onclick={() => nav.next()}
					class="flex size-11 cursor-pointer items-center justify-center rounded-full bg-accent text-white transition-opacity hover:opacity-70"
				>
					<ChevronRight class="size-[18px]" aria-hidden="true" />
				</button>
			</div>

			<button
				bind:this={toggle}
				type="button"
				aria-expanded={open}
				aria-controls={menuId}
				aria-label={open ? t.header.closeMenu : t.header.openMenu}
				onclick={() => (open = !open)}
				class="flex size-11 cursor-pointer items-center justify-center rounded-full border border-border-strong text-foreground horizontal:hidden"
			>
				{#if open}
					<CloseIcon class="size-5" aria-hidden="true" />
				{:else}
					<MenuIcon class="size-5" aria-hidden="true" />
				{/if}
			</button>
		</Container>
	</div>

	<div class="hidden h-[3px] bg-border horizontal:block" aria-hidden="true">
		<div
			class="h-[3px] bg-accent transition-[width] duration-[120ms] ease-linear"
			style:width="{(nav.progress * 100).toFixed(2)}%"
		></div>
	</div>

	{#if open}
		<MobileMenu id={menuId} activeId={nav.activeId} onnavigate={() => close()} />
	{/if}
</header>
