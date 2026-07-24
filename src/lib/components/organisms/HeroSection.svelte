<script lang="ts">
	import TechIcon from '$lib/components/atoms/TechIcon.svelte';

	const techs = ['html', 'css', 'figma', 'js', 'git'] as const;
</script>

<section id="hero" class="mx-auto max-w-6xl px-6 py-20">
	<div class="grid items-center gap-16 sm:grid-cols-2">
		<div class="relative mx-auto h-64 w-64 border-2 border-accent">
			<span class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-6xl font-black text-accent">
				&lt;/&gt;
			</span>
		</div>
		<div>
			<h1 class="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
				Hola, soy Jorge Alvarez<span class="text-accent">.</span>
			</h1>
			<p
				class="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl"
			>
				Frontend Dev
			</p>
			<div class="mt-6 flex items-center gap-3">
				{#each techs as tech (tech)}
					<TechIcon {tech} />
				{/each}
			</div>
		</div>
	</div>
</section>
