<script lang="ts">
	type Tech = 'html' | 'css' | 'js' | 'figma' | 'git';

	let { tech, size = 'md' }: { tech: Tech; size?: 'sm' | 'md' } = $props();

	const styles: Record<Tech, { bg: string; text: string; label: string }> = {
		html: { bg: 'bg-[#e34f26]', text: 'text-white', label: 'HTML' },
		css: { bg: 'bg-[#264de4]', text: 'text-white', label: 'CSS' },
		js: { bg: 'bg-[#f0db4f]', text: 'text-black', label: 'JS' },
		figma: { bg: 'bg-[#a259ff]', text: 'text-white', label: 'FIG' },
		git: { bg: 'bg-[#f34f29]', text: 'text-white', label: 'GIT' }
	};

	const style = $derived(styles[tech]);
	const sizeClass = $derived(size === 'sm' ? 'h-10 w-10 text-xs' : 'h-14 w-14 text-sm');
</script>

<div
	class="flex shrink-0 items-center justify-center rounded-lg font-bold {sizeClass} {style.bg} {style.text}"
>
	{style.label}
</div>
