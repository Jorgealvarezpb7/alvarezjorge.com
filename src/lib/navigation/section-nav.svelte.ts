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
/** Wait for a resize to settle before measuring whether the panels fit. */
const FIT_CHECK_DELAY_MS = 150;

type GoToOptions = { instant?: boolean; writeHash?: boolean };

/**
 * Section navigation state shared by the page track, the header and section controls.
 *
 * The layout mode comes from CSS: the `horizontal` variant in `layout.css` (the only place
 * the size thresholds live) sets `--layout` on <html>, and `watchLayout` mirrors it into
 * `horizontal`. In horizontal mode the sections are panels on a horizontal track; otherwise
 * they stack vertically. `attach` wires the listeners for the current mode and is re-run when
 * the mode changes.
 */
export class SectionNav {
	/** Index of the active section in `sections`. */
	active = $state(0);
	/** How far the horizontal track is scrolled, from 0 to 1. */
	progress = $state(0);

	readonly last = sections.length - 1;

	#horizontal = $state(typeof document !== 'undefined' && readLayout() === 'horizontal');
	#reducedMotion = new MediaQuery('prefers-reduced-motion: reduce');
	#track: HTMLElement | null = null;
	#attached = false;
	#programmatic = false;
	#releaseTimer: ReturnType<typeof setTimeout> | undefined;
	#frame = 0;

	/** True when sections are laid out on the horizontal track. */
	get horizontal(): boolean {
		return this.#horizontal;
	}

	get activeId(): string {
		return sections[this.active].id;
	}

	/**
	 * Keep `horizontal` in sync with the CSS layout, and fall back to the vertical layout when
	 * the panels don't fit the track (zoom, long copy, large user fonts): panels never scroll,
	 * so anything taller would be clipped. The check is debounced after resizes; once it forces
	 * the vertical layout it keeps it until the viewport size actually changes, so the two
	 * layouts can't flip back and forth. Call inside an `$effect`.
	 */
	watchLayout(track: HTMLElement): () => void {
		// Reads and writes `horizontal`; untracked so the effect runs once, not on every change.
		return untrack(() => this.#watchLayout(track));
	}

	#watchLayout(track: HTMLElement): () => void {
		const root = document.documentElement;
		const viewportSize = () => `${window.innerWidth}x${window.innerHeight}`;
		/** Viewport size at which the vertical layout was forced, `null` when not forced. */
		let forcedAt: string | null = null;
		let timer: ReturnType<typeof setTimeout> | undefined;
		let disposed = false;

		const sync = () => {
			this.#horizontal = readLayout() === 'horizontal';
		};

		const check = () => {
			if (disposed) return;
			if (forcedAt !== null) {
				if (forcedAt === viewportSize()) return;
				// New size: let CSS decide again. Measuring below forces a synchronous layout, so
				// if it still doesn't fit the attribute is back before the next paint.
				forcedAt = null;
				delete root.dataset.layout;
				sync();
			}
			if (this.#horizontal && panelsOverflow(panelsOf(track))) {
				forcedAt = viewportSize();
				root.dataset.layout = 'vertical';
				sync();
			}
		};

		const onResize = () => {
			sync();
			clearTimeout(timer);
			timer = setTimeout(check, FIT_CHECK_DELAY_MS);
		};

		sync();
		check();
		// Web fonts change text metrics; measure again once they are in.
		document.fonts.ready.then(check);
		window.addEventListener('resize', onResize);

		return () => {
			disposed = true;
			clearTimeout(timer);
			window.removeEventListener('resize', onResize);
			delete root.dataset.layout;
		};
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
			this.#track.scrollTo({ left: panelScrollLeft(this.#track, panel), behavior });
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
		return this.#track ? panelsOf(this.#track) : [];
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
			// Panels never scroll vertically on the track: vertical wheel moves the track.
			const delta = event.deltaMode === 1 ? event.deltaY * LINE_HEIGHT_PX : event.deltaY;
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

/**
 * Track scroll position that centers `panel`. A panel wider than the track (the Experiencia
 * timeline) is instead aligned with where centered panels start: the track's side padding.
 */
function panelScrollLeft(track: HTMLElement, panel: HTMLElement): number {
	const left =
		panel.offsetWidth > track.clientWidth
			? panel.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft)
			: panel.offsetLeft - (track.clientWidth - panel.offsetWidth) / 2;
	return Math.max(0, Math.min(track.scrollWidth - track.clientWidth, left));
}

function readLayout(): string {
	return getComputedStyle(document.documentElement).getPropertyValue('--layout').trim();
}

function panelsOf(track: HTMLElement): HTMLElement[] {
	return [...track.querySelectorAll<HTMLElement>(':scope > [data-panel]')];
}

/**
 * True when any panel's content reaches past its bottom edge. Panels use `overflow-y: clip`,
 * so the overflow is invisible; compare every descendant's box with the panel's box.
 */
function panelsOverflow(panels: HTMLElement[]): boolean {
	return panels.some((panel) => {
		const bottom = panel.getBoundingClientRect().bottom + 0.5;
		if (panel.scrollHeight > panel.clientHeight + 1) return true;
		for (const element of panel.querySelectorAll('*')) {
			if (element.getBoundingClientRect().bottom > bottom) return true;
		}
		return false;
	});
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
