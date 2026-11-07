<script lang="ts">
	import { OG_IMAGE_SIZE, PERSON_NAME, absoluteUrl, seo } from '$lib/seo';

	type Props = {
		title: string;
		description: string;
		/** Site-relative path of the page, used for canonical and og:url. */
		path: string;
		type?: 'website' | 'article';
	};

	let { title, description, path, type = 'website' }: Props = $props();

	const meta = seo.es;
	const canonical = $derived(absoluteUrl(path));
	const image = absoluteUrl(meta.ogImage);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:site_name" content={PERSON_NAME} />
	<meta property="og:type" content={type} />
	<meta property="og:locale" content={meta.locale} />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content={String(OG_IMAGE_SIZE.width)} />
	<meta property="og:image:height" content={String(OG_IMAGE_SIZE.height)} />
	<meta property="og:image:alt" content={meta.ogImageAlt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content={meta.ogImageAlt} />
</svelte:head>
