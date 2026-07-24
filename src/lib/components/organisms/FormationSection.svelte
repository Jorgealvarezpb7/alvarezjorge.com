<script lang="ts">
	import SectionHeading from '$lib/components/atoms/SectionHeading.svelte';
	import FormationRow from '$lib/components/molecules/FormationRow.svelte';

	const rows = [
		{ techs: ['figma'], title: 'UI / UX Design', provider: 'Platzi', duration: '17 horas' },
		{ techs: ['html'], title: 'HTML & CSS', provider: 'Platzi', duration: '23 horas' },
		{ techs: ['css'], title: 'CSS Flexbox & Grid', provider: 'Platzi', duration: '8 horas' },
		{ techs: ['js'], title: 'JavaScript', provider: 'Platzi', duration: '37 horas' },
		{
			techs: ['html', 'css', 'js'],
			title: 'Aprende a Programar con JS, HTML y CSS',
			provider: 'Rodrigo Branas',
			duration: '12 horas'
		}
	] as const;
</script>

<section id="formation" class="mx-auto max-w-6xl px-6 py-20">
	<div class="mb-12 text-center">
		<SectionHeading text="Formacion" />
	</div>
	<div>
		{#each rows as row (row.title)}
			<FormationRow techs={[...row.techs]} title={row.title} provider={row.provider} duration={row.duration} />
		{/each}
	</div>
</section>
