<script lang="ts">
	import { defaultLocale, htmlLang, i18n, locales, localizePath, ogLocale } from '$lib/i18n';
	import { OG_IMAGES, OG_IMAGE_SIZE, PERSON_NAME, absoluteUrl } from '$lib/seo';

	type Props = {
		title: string;
		description: string;
		/** Route path of the page (`/proyectos/notely`); localized for canonical and hreflang. */
		path: string;
		type?: 'website' | 'article';
	};

	let { title, description, path, type = 'website' }: Props = $props();

	const locale = $derived(i18n.locale);
	const canonical = $derived(absoluteUrl(localizePath(path, locale)));
	const image = $derived(absoluteUrl(OG_IMAGES[locale]));
	const imageAlt = $derived(i18n.t.meta.ogImageAlt);
	const alternates = $derived(
		locales.map((l) => ({ hreflang: htmlLang[l], href: absoluteUrl(localizePath(path, l)) }))
	);
	const defaultHref = $derived(absoluteUrl(localizePath(path, defaultLocale)));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#each alternates as alternate (alternate.hreflang)}
		<link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={defaultHref} />

	<meta property="og:site_name" content={PERSON_NAME} />
	<meta property="og:type" content={type} />
	<meta property="og:locale" content={ogLocale[locale]} />
	{#each locales.filter((l) => l !== locale) as l (l)}
		<meta property="og:locale:alternate" content={ogLocale[l]} />
	{/each}
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content={String(OG_IMAGE_SIZE.width)} />
	<meta property="og:image:height" content={String(OG_IMAGE_SIZE.height)} />
	<meta property="og:image:alt" content={imageAlt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content={imageAlt} />
</svelte:head>
