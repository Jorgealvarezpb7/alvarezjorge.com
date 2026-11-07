<script lang="ts">
	import photo from '$lib/assets/profile.webp';
	import { getSectionNav } from '$lib/navigation/section-nav.svelte';

	const nav = getSectionNav();
</script>

<section
	id="hero"
	data-panel
	aria-label="Inicio"
	class="flex panel flex-wrap items-center gap-12 px-16 py-12"
>
	<div class="flex min-w-0 flex-[999_1_560px] flex-col gap-5">
		<span
			class="inline-flex items-center gap-2.5 self-start rounded-full border border-border-strong px-4 py-2 text-sm text-foreground-soft"
		>
			<span aria-hidden="true" class="size-2 rounded-full bg-status"></span>
			Disponible para nuevos proyectos
		</span>
		<p class="m-0 font-serif text-[64px] leading-none text-accent italic">Hola, soy</p>
		<h1
			class="m-0 font-display text-[84px] leading-[0.86] font-bold tracking-[-0.05em] uppercase md:text-[168px]"
		>
			Jorge<br />Alvarez
		</h1>
		<div class="mt-3 flex flex-wrap items-center gap-4 text-lg text-foreground-soft">
			<span class="font-display text-2xl font-medium text-foreground">Full Stack Developer</span>
			<span aria-hidden="true" class="h-px w-10 bg-faint"></span>
			<span>Madrid, España</span>
		</div>
	</div>

	<div class="flex min-w-0 flex-[1_1_320px] flex-col items-center gap-6">
		<div
			class="aspect-[4/5] w-full max-w-[400px] overflow-hidden rounded-[200px_200px_24px_24px] bg-accent"
		>
			<img src={photo} alt="Foto de Jorge Alvarez" class="size-full object-cover" />
		</div>
		<button
			type="button"
			onclick={() => nav.next()}
			class="hidden min-h-11 cursor-pointer items-center gap-3 px-1 py-3 text-[15px] text-muted-foreground transition-opacity hover:opacity-70 md:flex"
		>
			Desliza para explorar
			<svg
				width="40"
				height="16"
				viewBox="0 0 40 16"
				fill="none"
				stroke="currentColor"
				stroke-width="1.6"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="M1 8h37M31 1l7 7-7 7" />
			</svg>
		</button>
	</div>
</section>
