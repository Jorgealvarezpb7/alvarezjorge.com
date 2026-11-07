<script lang="ts">
	const DEFAULT_TAPE = 'color-mix(in srgb, var(--color-accent-on-inverse) 75%, transparent)';

	let {
		src,
		alt,
		rotate = 3,
		tapeColor = DEFAULT_TAPE,
		class: className = ''
	}: {
		/** Image URL. */
		src: string;
		/** Alternative text for the photo. */
		alt: string;
		/** Tilt of the whole polaroid, in degrees. */
		rotate?: number;
		/** Any CSS color for the tape strip; defaults to translucent lavender from the theme. */
		tapeColor?: string;
		/** Extra classes for the root `<figure>`. */
		class?: string;
	} = $props();
</script>

<!--
	No hover effect by design. If one is added, wrap it in
	`@media (prefers-reduced-motion: no-preference)`.
-->
<figure class="polaroid {className}" style:transform="rotate({rotate}deg)" style:--tape={tapeColor}>
	<div class="tape" aria-hidden="true"></div>
	<img {src} {alt} loading="eager" fetchpriority="high" decoding="async" />
</figure>

<style>
	.polaroid {
		margin: 0;
		position: relative;
		width: 100%;
		/* Callers can override through `--polaroid-max` (the hero widens it on wide screens). */
		max-width: var(--polaroid-max, 360px);
		background: var(--color-surface);
		/* The thick bottom border is part of the polaroid look, even without a caption. */
		padding: 16px 16px 64px;
		box-sizing: border-box;
		box-shadow: 0 18px 40px color-mix(in srgb, var(--color-foreground) 18%, transparent);
	}

	.tape {
		position: absolute;
		top: -16px;
		left: 50%;
		z-index: 1;
		width: 120px;
		height: 34px;
		margin-left: -60px;
		background: var(--tape);
		transform: rotate(-4deg);
	}

	img {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		/* Crop from the top so the face is never cut off. */
		object-position: center top;
		background: var(--color-surface-inverse);
	}
</style>
