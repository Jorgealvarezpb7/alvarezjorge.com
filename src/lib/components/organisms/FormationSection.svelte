<script lang="ts">
	import Container from '$lib/components/atoms/Container.svelte';
	import SectionHeading from '$lib/components/atoms/SectionHeading.svelte';
	import FormationRow from '$lib/components/molecules/FormationRow.svelte';
	import ReadingCard from '$lib/components/molecules/ReadingCard.svelte';

	const degrees = [
		{
			title: ['Grado Superior en Desarrollo', 'de Aplicaciones Web'],
			provider: 'UNIVERSAE · Madrid, España',
			duration: '02/2024 – 02/2026'
		},
		{
			title: ['Grado Superior en Desarrollo', 'de Aplicaciones Multiplataforma'],
			provider: 'UNIVERSAE · Madrid, España',
			duration: '02/2024 – 06/2025'
		}
	];

	const readings = [
		{
			title: 'Head First Java',
			meta: "3.ª edición · Kathy Sierra, Bert Bates y Trisha Gee · O'Reilly",
			tone: 'dark'
		},
		{
			title: 'Programming TypeScript',
			meta: "Boris Cherny · O'Reilly",
			tone: 'light'
		}
	] as const;
</script>

<section
	id="formation"
	data-panel
	aria-label="Formación"
	class="panel-card flex panel flex-col justify-center gap-12 bg-surface-muted p-16 wide:px-0"
>
	<Container class="wide:flex wide:flex-col wide:gap-12">
		<SectionHeading index="04" title="Formación" />
		<div class="flex flex-wrap gap-16">
			<div class="flex min-w-0 flex-[3_1_480px] flex-col">
				<h3 class="m-0 mb-2 text-sm font-semibold text-muted-foreground">Títulos</h3>
				{#each degrees as degree (degree.duration + degree.title.join())}
					<FormationRow {...degree} />
				{/each}
			</div>
			<div class="flex min-w-0 flex-[2_1_320px] flex-col gap-4">
				<h3 class="m-0 mb-2 text-sm font-semibold text-muted-foreground">Lecturas</h3>
				{#each readings as reading (reading.title)}
					<ReadingCard {...reading} />
				{/each}
			</div>
		</div>
	</Container>
</section>
