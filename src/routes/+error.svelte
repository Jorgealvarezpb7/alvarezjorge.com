<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Logo from '$lib/components/atoms/Logo.svelte';
	import ArrowRight from '~icons/lucide/arrow-right';

	/**
	 * Texts SvelteKit puts in `error.message` when no reason was given: status texts for
	 * framework errors, `Internal Error` for unexpected throws, `Unknown Error` for odd bodies.
	 */
	const DEFAULT_MESSAGES = new Set([
		'Internal Error',
		'Unknown Error',
		'Not Found',
		'Method Not Allowed',
		'Forbidden',
		'Bad Request',
		'Unauthorized'
	]);

	/** The error's message when it is a reason someone wrote, `null` when it is framework text. */
	function customReason(status: number, message: string | undefined): string | null {
		const text = message?.trim();
		if (!text || DEFAULT_MESSAGES.has(text) || text === `Error: ${status}`) return null;
		return text;
	}

	const status = $derived(page.status);
	const reason = $derived(customReason(status, page.error?.message));
	const notFound = $derived(status === 404);

	const title = $derived(notFound ? 'Página no encontrada' : (reason ?? 'Algo salió mal'));
	const text = $derived(
		notFound
			? 'La página que buscas no existe o fue movida. Verifica la URL o regresa al inicio.'
			: reason
				? null
				: 'Ocurrió un error inesperado. Intenta de nuevo o regresa al inicio.'
	);
	const reasonLine = $derived(notFound ? reason : null);
	const documentTitle = $derived(
		notFound ? 'Página no encontrada — Jorge Alvarez' : `Error ${status} — Jorge Alvarez`
	);
</script>

<svelte:head>
	<title>{documentTitle}</title>
</svelte:head>

<div class="flex min-h-dvh flex-col bg-background text-foreground">
	<header
		class="sticky top-0 z-20 flex items-center border-b border-border bg-background px-6 py-3.5 md:px-12"
	>
		<Logo inPage={false} />
	</header>

	<main
		class="mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center gap-6 px-6 py-16 md:px-16"
	>
		<p
			class="m-0 font-display text-[96px] leading-none font-bold tracking-[-0.05em] text-accent md:text-[200px]"
		>
			{status}
		</p>
		<h1
			class="m-0 font-display text-4xl leading-[1.1] font-bold tracking-[-0.03em] break-words md:text-6xl"
		>
			{title}
		</h1>
		{#if text}
			<p class="m-0 max-w-[560px] text-lg leading-[1.55] text-muted-foreground">{text}</p>
		{/if}
		{#if reasonLine}
			<p class="m-0 text-sm text-muted-foreground">{reasonLine}</p>
		{/if}
		<a
			href={resolve('/')}
			class="inline-flex min-h-11 items-center gap-2 self-start px-1 py-3 text-[15px] font-semibold text-accent-text hover:text-link-hover"
		>
			Ir al inicio
			<ArrowRight class="size-4" aria-hidden="true" />
		</a>
	</main>
</div>
