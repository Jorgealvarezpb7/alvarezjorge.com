import { getContext, setContext, untrack } from 'svelte';
import { MediaQuery } from 'svelte/reactivity';
import { replaceState } from '$app/navigation';
import { page } from '$app/state';
import { sections, sectionIndex } from '$lib/data/sections';

const CONTEXT_KEY = Symbol('section-nav');
/** Fallback for browsers without `scrollend`: how long a programmatic scroll may take. */
const PROGRAMMATIC_TIMEOUT_MS = 800;
/** Wheel `deltaMode === 1` reports lines; convert to pixels. */
const LINE_HEIGHT_PX = 16;

type GoToOptions = { instant?: boolean; writeHash?: boolean };

/**
 * Section navigation state shared by the page track, the header and section controls.
 *
 * On `md`+ (>= 768px) the sections are panels on a horizontal track; below that they stack
 * vertically. `attach` wires the listeners for the current mode and is re-run when the
 * breakpoint is crossed.
 */
export class SectionNav {
	/** Index of the active section in `sections`. */
	active = $state(0);
	/** How far the horizontal track is scrolled, from 0 to 1. */
	progress = $state(0);

	readonly last = sections.length - 1;

	#wide = new MediaQuery('min-width: 768px');
	#reducedMotion = new MediaQuery('prefers-reduced-motion: reduce');
	#track: HTMLElement | null = null;
	#attached = false;
	#programmatic = false;
	#releaseTimer: ReturnType<typeof setTimeout> | undefined;
	#frame = 0;

	/** True when sections are laid out on the horizontal track. */
	get horizontal(): boolean {
		return this.#wide.current;
	}

	get activeId(): string {
		return sections[this.active].id;
	}

	/**
	 * Wire listeners for the current layout mode. Call inside an `$effect`: reading
	 * `horizontal` makes the effect re-run (and clean up) when the breakpoint is crossed.
	 */
	attach(track: HTMLElement): () => void {
		const horizontal = this.horizontal;
		return untrack(() => {
			this.#track = track;
			const cleanup = horizontal ? this.#attachHorizontal(track) : this.#attachVertical();

			const onHashChange = () => this.#restoreFromHash();
			window.addEventListener('hashchange', onHashChange);

			// First attach restores from the URL; later ones keep the current section in view.
			if (this.#attached) {
				this.goTo(this.active, { instant: true, writeHash: false });
			} else {
				this.#attached = true;
				this.#restoreFromHash(true);
			}

			return () => {
				cleanup();
				window.removeEventListener('hashchange', onHashChange);
				cancelAnimationFrame(this.#frame);
				this.#release();
			};
		});
	}

	goTo(target: number | string, { instant = false, writeHash = true }: GoToOptions = {}): void {
		const index = typeof target === 'string' ? sectionIndex(target) : target;
		const clamped = Math.max(0, Math.min(this.last, index));
		const panel = this.#panels()[clamped];
		if (!panel) return;

		const behavior: ScrollBehavior = instant || this.#reducedMotion.current ? 'auto' : 'smooth';
		this.#holdProgrammatic();
		this.active = clamped;
		if (writeHash) this.#writeHash();

		if (this.horizontal && this.#track) {
			this.#track.scrollTo({ left: panel.offsetLeft, behavior });
		} else {
			panel.scrollIntoView({ block: 'start', behavior });
		}
	}

	next(): void {
		this.goTo(this.active + 1);
	}

	prev(): void {
		this.goTo(this.active - 1);
	}

	/**
	 * Click handler for in-page anchors. On the horizontal track the jump is replaced by a
	 * smooth track scroll; on small screens the native anchor jump is kept.
	 */
	handleAnchorClick(event: MouseEvent, id: string): void {
		if (!this.horizontal) return;
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
			return;
		}
		event.preventDefault();
		this.goTo(id);
	}

	#panels(): HTMLElement[] {
		if (!this.#track) return [];
		return [...this.#track.querySelectorAll<HTMLElement>(':scope > [data-panel]')];
	}

	#restoreFromHash(initial = false): void {
		const index = sectionIndex(decodeURIComponent(location.hash.slice(1)));
		const target = index >= 0 ? index : 0;
		// On first load with no hash there is nothing to restore; avoid rewriting the URL.
		if (initial && index < 0) return;
		this.goTo(target, { instant: initial, writeHash: false });
	}

	#writeHash(): void {
		const hash = `#${this.activeId}`;
		if (location.hash === hash) return;
		try {
			replaceState(hash, page.state);
		} catch {
			// Router not ready yet (before hydration finished); the next update will sync it.
		}
	}

	#setActive(index: number): void {
		if (index === this.active) return;
		this.active = index;
		if (!this.#programmatic) this.#writeHash();
	}

	/** Suppress scroll-driven active/hash updates until the programmatic scroll settles. */
	#holdProgrammatic(): void {
		this.#programmatic = true;
		clearTimeout(this.#releaseTimer);
		this.#releaseTimer = setTimeout(() => this.#release(), PROGRAMMATIC_TIMEOUT_MS);
		const target: EventTarget = this.horizontal && this.#track ? this.#track : window;
		target.addEventListener('scrollend', () => this.#release(), { once: true });
	}

	#release(): void {
		clearTimeout(this.#releaseTimer);
		this.#programmatic = false;
	}

	#attachHorizontal(track: HTMLElement): () => void {
		const measure = () => {
			this.#frame = 0;
			const max = track.scrollWidth - track.clientWidth;
			this.progress = max > 0 ? Math.min(1, track.scrollLeft / max) : 0;
			if (this.#programmatic) return;
			const mid = track.scrollLeft + track.clientWidth / 2;
			let index = 0;
			this.#panels().forEach((panel, i) => {
				if (panel.offsetLeft <= mid) index = i;
			});
			this.#setActive(index);
		};

		const onScroll = () => {
			if (!this.#frame) this.#frame = requestAnimationFrame(measure);
		};

		const onWheel = (event: WheelEvent) => {
			if (event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
			const delta = event.deltaMode === 1 ? event.deltaY * LINE_HEIGHT_PX : event.deltaY;

			// Let a panel taller than the viewport scroll its own content first.
			const panel = (event.target as Element | null)?.closest<HTMLElement>('[data-panel]');
			if (panel && canScrollVertically(panel, delta)) return;

			const max = track.scrollWidth - track.clientWidth;
			if ((track.scrollLeft <= 0 && delta < 0) || (track.scrollLeft >= max - 1 && delta > 0)) {
				return;
			}
			event.preventDefault();
			this.#release();
			track.scrollLeft += delta;
		};

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
			if (isEditable(event.target)) return;
			if (event.key === 'ArrowRight' || event.key === 'PageDown') {
				event.preventDefault();
				this.next();
			} else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
				event.preventDefault();
				this.prev();
			}
		};

		track.addEventListener('scroll', onScroll, { passive: true });
		track.addEventListener('wheel', onWheel, { passive: false });
		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('resize', onScroll);
		measure();

		return () => {
			track.removeEventListener('scroll', onScroll);
			track.removeEventListener('wheel', onWheel);
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('resize', onScroll);
		};
	}

	#attachVertical(): () => void {
		this.progress = 0;
		const panels = this.#panels();
		const observer = new IntersectionObserver(
			(entries) => {
				if (this.#programmatic) return;
				for (const entry of entries) {
					if (entry.isIntersecting) this.#setActive(panels.indexOf(entry.target as HTMLElement));
				}
			},
			{ rootMargin: '-50% 0px -50% 0px' }
		);
		panels.forEach((panel) => observer.observe(panel));
		return () => observer.disconnect();
	}
}

function canScrollVertically(element: HTMLElement, delta: number): boolean {
	if (element.scrollHeight <= element.clientHeight + 1) return false;
	if (delta > 0) return element.scrollTop + element.clientHeight < element.scrollHeight - 1;
	return element.scrollTop > 0;
}

function isEditable(target: EventTarget | null): boolean {
	if (!(target instanceof HTMLElement)) return false;
	return target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
}

export function setSectionNav(nav: SectionNav): SectionNav {
	return setContext(CONTEXT_KEY, nav);
}

export function getSectionNav(): SectionNav {
	const nav = getContext<SectionNav | undefined>(CONTEXT_KEY);
	if (!nav) throw new Error('getSectionNav() must be used inside the home page track');
	return nav;
}
