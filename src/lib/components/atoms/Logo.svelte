<script lang="ts">
	import photo from '$lib/assets/profilepic.png';

	let { name = 'Jorge' }: { name?: string } = $props();

	let dialog: HTMLDialogElement;
</script>

<button
	type="button"
	class="cursor-pointer rounded-full"
	aria-label={name}
	onclick={() => dialog.showModal()}
>
	<img src={photo} alt={name} class="size-14 rounded-full object-cover" />
</button>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	class="m-auto rounded-2xl bg-transparent p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
	onclick={(e) => e.target === dialog && dialog.close()}
>
	<img src={photo} alt={name} class="size-72 rounded-2xl object-cover sm:size-96" />
</dialog>
