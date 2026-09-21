<script lang="ts">
	import SectionHeading from '$lib/components/atoms/SectionHeading.svelte';
	import FormationRow from '$lib/components/molecules/FormationRow.svelte';

	const rows = [
		{
			title: 'Grado Superior en Desarrollo de Aplicaciones Web',
			provider: 'UNIVERSAE, Madrid, España',
			duration: '02/2024 - 02/2026'
		},
		{
			title: 'Grado superior en Desarrollo de Aplicaciones multiplataforma',
			provider: 'UNIVERSAE, Madrid, España',
			duration: '02/2024 - 06/2025'
		},
		{
			title: 'Head First Java (3rd Edition)',
			provider: "Kathy Sierra, Bert Bates & Trisha Gee · O'Reilly"
		},
		{
			title: 'Programming TypeScript',
			provider: "Boris Cherny · O'Reilly"
		}
	];
</script>

<section id="formation" class="mx-auto max-w-6xl px-6 py-20">
	<div class="mb-12 text-center">
		<SectionHeading text="Formacion" />
	</div>
	<div>
		{#each rows as row (row.title)}
			<FormationRow {...row} />
		{/each}
	</div>
</section>
