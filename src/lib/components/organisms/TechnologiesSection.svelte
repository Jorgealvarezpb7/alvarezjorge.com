<script lang="ts">
	import type { Component } from 'svelte';
	import MarqueeStrip from '$lib/components/molecules/MarqueeStrip.svelte';

	import SpringIcon from '~icons/devicon/spring';
	import GitIcon from '~icons/devicon/git';
	import JavaIcon from '~icons/devicon/java';
	import JavascriptIcon from '~icons/devicon/javascript';
	import TypescriptIcon from '~icons/devicon/typescript';
	import VscodeIcon from '~icons/devicon/vscode';
	import Html5Icon from '~icons/devicon/html5';
	import ReactIcon from '~icons/devicon/react';
	import SassIcon from '~icons/devicon/sass';
	import Css3Icon from '~icons/devicon/css3';
	import AngularIcon from '~icons/devicon/angular';
	import TailwindcssIcon from '~icons/devicon/tailwindcss';
	import MysqlIcon from '~icons/devicon/mysql';
	import DockerIcon from '~icons/devicon/docker';
	import SvelteIcon from '~icons/devicon/svelte';

	type TechItem = { name: string; icon: Component };

	// Adding/removing a technology only means editing this list.
	const items: TechItem[] = [
		{ name: 'Spring Boot', icon: SpringIcon },
		{ name: 'Git', icon: GitIcon },
		{ name: 'Java', icon: JavaIcon },
		{ name: 'JavaScript', icon: JavascriptIcon },
		{ name: 'TypeScript', icon: TypescriptIcon },
		{ name: 'VS Code', icon: VscodeIcon },
		{ name: 'HTML5', icon: Html5Icon },
		{ name: 'React', icon: ReactIcon },
		{ name: 'Sass', icon: SassIcon },
		{ name: 'CSS3', icon: Css3Icon },
		{ name: 'Angular', icon: AngularIcon },
		{ name: 'TailwindCSS', icon: TailwindcssIcon },
		{ name: 'MySQL', icon: MysqlIcon },
		{ name: 'Docker', icon: DockerIcon },
		{ name: 'Svelte', icon: SvelteIcon }
	];
</script>

<section class="mx-auto max-w-6xl px-6 py-20">
	<div
		class="flex flex-col items-center justify-center gap-8 rounded-2xl border border-border bg-surface px-6 py-10 sm:px-10"
	>
		<h2 class="text-xl font-bold text-foreground sm:text-2xl">Tecnologías</h2>
		<MarqueeStrip {items} />
	</div>
</section>
