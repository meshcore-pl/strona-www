import { definePage } from './lib/page.js';

const SCROLL_KEY_PREFIX = 'meshcore.docs.scroll:';
const ACTIVE_TOLERANCE = 8;
const USER_SCROLL_EVENTS = ['wheel', 'touchstart', 'pointerdown', 'keydown'];

let firstInit = true;
let controller = null;
let saveTimer = 0;

const destroy = () => {
	clearTimeout(saveTimer);
	controller?.abort();
	controller = null;
};

const initScroll = (content, signal) => {
	const headings = [...content.querySelectorAll('h1[id], h2[id], h3[id]')];
	const tocLinks = [...document.querySelectorAll('#docs-toc a, #docs-sidebar__toc a')];
	const toc = document.getElementById('docs-toc');

	const isWindowScroll = () => getComputedStyle(content).overflowY === 'visible';

	const targetFor = hash => hash && hash[0] === '#' && hash.length > 1
		? content.querySelector(`#${CSS.escape(decodeURIComponent(hash.slice(1)))}`)
		: null;

	let activeId = null;
	let pinnedId = null;

	const revealInToc = link => {
		const box = toc.getBoundingClientRect();
		const rect = link.getBoundingClientRect();
		if (rect.top < box.top) toc.scrollTop -= box.top - rect.top + rect.height;
		else if (rect.bottom > box.bottom) toc.scrollTop += rect.bottom - box.bottom + rect.height;
	};

	const setActive = id => {
		if (id === activeId) return;
		activeId = id;
		for (const link of tocLinks) {
			const active = link.getAttribute('href') === `#${id}`;
			link.classList.toggle('active', active);
			if (active && toc?.contains(link)) revealInToc(link);
		}
	};

	const findCurrent = () => {
		const windowScroll = isWindowScroll();
		const scroller = windowScroll ? document.documentElement : content;
		const atEnd = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 4;
		if (atEnd && (pinnedId || scroller.scrollTop > 0)) return pinnedId ?? headings.at(-1).id;

		const base = windowScroll ? 0 : content.getBoundingClientRect().top;
		let current = headings[0];
		for (const heading of headings) {
			const offset = parseFloat(getComputedStyle(heading).scrollMarginTop) || 0;
			if (heading.getBoundingClientRect().top - base > offset + ACTIVE_TOLERANCE) break;
			current = heading;
		}
		return current.id;
	};

	const update = () => {
		if (headings.length) setActive(findCurrent());
	};

	const scrollToTarget = (target, behavior = 'auto') => {
		pinnedId = headings.includes(target) ? target.id : null;
		if (target === headings[0] && target.tagName === 'H1') {
			(isWindowScroll() ? window : content).scrollTo({ top: 0, behavior });
		} else {
			target.scrollIntoView({ block: 'start', behavior });
		}
		update();
	};

	let ticking = false;
	const scheduleUpdate = () => {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(() => {
			ticking = false;
			if (!signal.aborted) update();
		});
	};

	const scrollKey = `${SCROLL_KEY_PREFIX}${location.pathname}`;
	const saveScroll = () => {
		try {
			sessionStorage.setItem(scrollKey, String(Math.round(content.scrollTop)));
			return true;
		} catch {
			return false;
		}
	};

	content.addEventListener('scroll', () => {
		clearTimeout(saveTimer);
		saveTimer = setTimeout(saveScroll, 150);
		scheduleUpdate();
	}, { passive: true, signal });
	window.addEventListener('scroll', scheduleUpdate, { passive: true, signal });
	window.addEventListener('pagehide', saveScroll, { signal });

	for (const type of USER_SCROLL_EVENTS) {
		window.addEventListener(type, () => {
			pinnedId = null;
		}, { passive: true, signal });
	}

	document.addEventListener('click', e => {
		if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		const a = e.target.closest('a[href]');
		const target = targetFor(a?.getAttribute('href'));
		if (!target) return;

		e.preventDefault();
		const { hash } = new URL(a.href);
		if (hash !== location.hash) {
			history.replaceState({ ...history.state, docsScroll: content.scrollTop }, '');
			history.pushState(null, '', hash);
		}
		scrollToTarget(target, 'smooth');
	}, { signal });

	const pagePath = location.pathname;
	window.addEventListener('popstate', e => {
		if (location.pathname !== pagePath) return;

		pinnedId = null;
		const saved = e.state?.docsScroll;
		const target = targetFor(location.hash);
		if (saved !== undefined) content.scrollTop = saved;
		else if (target) scrollToTarget(target);
		else content.scrollTop = 0;
		update();
	}, { signal });

	const restoreSavedScroll = () => {
		const navType = performance.getEntriesByType('navigation')[0]?.type;
		if (location.hash || (navType !== 'reload' && navType !== 'back_forward')) return;

		let saved = 0;
		try {
			saved = Number(sessionStorage.getItem(scrollKey)) || 0;
		} catch {
			saved = 0;
		}
		if (saved <= 0) return;

		const restore = () => {
			content.scrollTop = saved;
			update();
		};
		requestAnimationFrame(restore);
		if (document.readyState !== 'complete') window.addEventListener('load', restore, { once: true, signal });
	};

	if (firstInit) {
		firstInit = false;
		restoreSavedScroll();
	}

	const initial = targetFor(location.hash);
	if (initial) requestAnimationFrame(() => scrollToTarget(initial));
	update();
};

const initDrawer = signal => {
	const toggleBtn = document.getElementById('docs-mobile-toc-btn');
	const backdrop = document.getElementById('docs-mobile-toc-backdrop');
	const sidebar = document.getElementById('docs-sidebar');
	if (!toggleBtn || !backdrop || !sidebar) return;

	const closeDrawer = () => {
		sidebar.classList.remove('is-open');
		backdrop.hidden = true;
		toggleBtn.setAttribute('aria-expanded', 'false');
	};

	toggleBtn.addEventListener('click', () => {
		const open = sidebar.classList.toggle('is-open');
		backdrop.hidden = !open;
		toggleBtn.setAttribute('aria-expanded', String(open));
	}, { signal });
	backdrop.addEventListener('click', closeDrawer, { signal });
	sidebar.addEventListener('click', e => {
		if (e.target.closest('a')) closeDrawer();
	}, { signal });
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape') closeDrawer();
	}, { signal });
};

const init = () => {
	destroy();

	const content = document.getElementById('docs-content');
	if (!content) return;

	import(`${document.body.dataset.cdn}/js/codeBlocks.js`)
		.then(({ highlightCodeBlocks }) => highlightCodeBlocks(content))
		.catch(err => console.error('Nie udało się załadować podświetlania składni:', err));

	controller = new AbortController();
	initScroll(content, controller.signal);
	initDrawer(controller.signal);
};

definePage(import.meta.url, { init, destroy });
