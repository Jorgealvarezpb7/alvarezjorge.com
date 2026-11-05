<script lang="ts">
	import { slide } from 'svelte/transition';
	import Icon from '$lib/components/atoms/Icon.svelte';

	let {
		icon,
		title,
		category,
		role,
		period,
		summary,
		story,
		highlights,
		tags,
		repo,
		link,
		background
	}: {
		icon?: string;
		title: string;
		category: string;
		role: string;
		period: string;
		summary: string;
		story: string;
		highlights: string[];
		tags: string[];
		repo?: string;
		link?: string;
		background?: string;
	} = $props();

	const uid = $props.id();
	const panelId = `${uid}-details`;
	let open = $state(false);
</script>

<article
	class="glass-card relative rounded-3xl p-6 text-white sm:p-8"
	style:--tint={background}
	style:--shade={background ? '0%' : undefined}
>
	{#if repo}
		<a
			href={repo}
			target="_blank"
			rel="noreferrer"
			aria-label="Ir al repositorio"
			class="group absolute top-3 right-4.5 z-10 flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white sm:top-4 sm:right-6.5"
		>
			<Icon name="github" class="h-6 w-6" />
			<span
				aria-hidden="true"
				class="pointer-events-none absolute right-0 bottom-full mb-2 rounded-md bg-white px-2 py-1 text-xs font-semibold whitespace-nowrap text-black opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
			>
				Ir al repositorio
			</span>
		</a>
	{/if}

	<h3>
		<button
			type="button"
			class="flex w-full cursor-pointer items-center gap-4 rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
			aria-expanded={open}
			aria-controls={open ? panelId : undefined}
			onclick={() => (open = !open)}
		>
			{#if icon}
				<img
					src={icon}
					alt=""
					width="64"
					height="64"
					class="h-16 w-16 shrink-0 rounded-2xl object-contain"
				/>
			{:else}
				<span
					aria-hidden="true"
					class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold"
				>
					{title.charAt(0)}
				</span>
			{/if}
			<span class="min-w-0 flex-1">
				<span class="flex flex-wrap items-center gap-x-3 gap-y-1">
					<span class="text-xl font-bold">{title}</span>
					<span class="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{category}</span>
				</span>
				<span class="mt-1 block text-sm font-normal">{role} · {period}</span>
			</span>
			<Icon
				name="chevron-down"
				class="h-6 w-6 shrink-0 transition-transform duration-200 {open ? 'rotate-180' : ''}"
			/>
		</button>
	</h3>

	<div class="sm:pl-20">
		<p class="mt-4">{summary}</p>

		{#if open}
			<div id={panelId} transition:slide={{ duration: 200 }}>
				<p class="mt-4">{story}</p>
				<ul class="mt-4 list-disc space-y-2 pl-5 marker:text-white">
					{#each highlights as highlight (highlight)}
						<li>{highlight}</li>
					{/each}
				</ul>
				<ul class="mt-6 flex flex-wrap gap-2">
					{#each tags as tag (tag)}
						<li class="rounded-full border border-white/30 bg-black/30 px-3 py-1 text-xs">
							{tag}
						</li>
					{/each}
				</ul>
				{#if link}
					<a
						href={link}
						target="_blank"
						rel="noreferrer"
						class="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-black transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
					>
						<Icon name="globe" class="h-5 w-5" />
						Visitar sitio
					</a>
				{:else}
					<button
						type="button"
						disabled
						class="mt-6 inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-black opacity-70"
					>
						<Icon name="download" class="h-5 w-5" />
						Descargar · Próximamente
					</button>
				{/if}
			</div>
		{/if}
	</div>
</article>

<style>
	/* Translucent "liquid glass" card. --tint sets the colour; the centre is lighter. */
	.glass-card {
		--tint: #737373;
		--shade: 40%;
		isolation: isolate;
		background: radial-gradient(
			ellipse at center,
			color-mix(in oklab, color-mix(in oklab, var(--tint), white 30%) 70%, transparent) 0%,
			color-mix(in oklab, var(--tint) 70%, transparent) 60%,
			color-mix(in oklab, color-mix(in oklab, var(--tint), black var(--shade)) 70%, transparent)
				100%
		);
		backdrop-filter: blur(24px) saturate(180%);
		-webkit-backdrop-filter: blur(24px) saturate(180%);
		box-shadow: 0 12px 40px rgb(0 0 0 / 0.3);
		transition: box-shadow 200ms;
	}

	/* Specular highlight across the top edge */
	.glass-card::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		border-radius: inherit;
		background: linear-gradient(
			to bottom,
			rgb(255 255 255 / 0.18) 0%,
			rgb(255 255 255 / 0.04) 35%,
			transparent 60%
		);
	}

	.glass-card:hover {
		box-shadow: 0 16px 48px rgb(0 0 0 / 0.35);
	}
</style>
