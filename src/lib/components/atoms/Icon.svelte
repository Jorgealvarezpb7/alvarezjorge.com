<script lang="ts">
	type IconName =
		'arrow-up-right' | 'linkedin' | 'instagram' | 'github' | 'mail' | 'globe' | 'map-pin';

	let { name, class: className = '' }: { name: IconName; class?: string } = $props();
</script>

{#if name === 'arrow-up-right'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class={className}>
		<path d="M7 17 17 7M7 7h10v10" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
{:else if name === 'linkedin'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class={className}>
		<rect x="3" y="3" width="18" height="18" rx="3" />
		<path d="M7.5 10v6.5M7.5 7.5v.01M12 16.5V13c0-1.5 1-3 3-3s3 1.5 3 3v3.5" />
		<path d="M12 10.5v.5" />
	</svg>
{:else if name === 'instagram'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class={className}>
		<rect x="3" y="3" width="18" height="18" rx="5" />
		<circle cx="12" cy="12" r="4" />
		<path d="M17 7h.01" stroke-linecap="round" />
	</svg>
{:else if name === 'github'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class={className}>
		<path
			d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
{:else if name === 'mail'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class={className}>
		<rect x="3" y="5" width="18" height="14" rx="2" />
		<path d="m4 7 8 6 8-6" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
{:else if name === 'globe'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class={className}>
		<circle cx="12" cy="12" r="9" />
		<path
			d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
{:else if name === 'map-pin'}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class={className}>
		<path
			d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<circle cx="12" cy="9.5" r="2.5" />
	</svg>
{/if}
