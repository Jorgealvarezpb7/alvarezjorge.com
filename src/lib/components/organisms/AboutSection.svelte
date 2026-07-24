<script lang="ts">
	import SectionHeading from '$lib/components/atoms/SectionHeading.svelte';
</script>

<section id="about" class="mx-auto max-w-6xl px-6 py-20">
	<div class="mb-12 text-center">
		<SectionHeading text="Sobre mi" />
	</div>
	<div class="grid items-center gap-12 sm:grid-cols-[1fr_1.5fr]">
		<div class="aspect-square rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-400"></div>
		<div class="space-y-4 text-muted-foreground">
			<p>
				<span class="font-bold text-foreground">Desarrollador Web</span> en transicion hacia una
				carrera en tecnologia.
			</p>
			<p>
				Actualmente mi foco esta en aprender y dominar las habilidades esenciales del desarrollo
				web. Tengo una base solida en <span class="font-semibold text-foreground">HTML</span>,
				<span class="font-semibold text-foreground">CSS</span>,
				<span class="font-semibold text-foreground">Git</span> y
				<span class="font-semibold text-foreground">JavaScript</span>.
			</p>
			<p>
				Me interesa construir interfaces cuidadas, accesibles y con buen rendimiento, siempre
				aprendiendo nuevas herramientas del ecosistema frontend.
			</p>
		</div>
	</div>
</section>
