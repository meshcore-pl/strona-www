import { definePage } from './lib/page.js';

const SCROLL_KEY_PREFIX = 'meshcore.docs.scroll:';

let firstInit = true;
let scrollEl = null;
let onScroll = null;
let onPageHide = null;
let saveTimer = 0;
let onAnchorClick = null;
let onToggleClick = null;
let onBackdropClick = null;
let onSidebarClick = null;
let onKeydown = null;

const destroy = () => {
	clearTimeout(saveTimer);
	if (onPageHide) window.removeEventListener('pagehide', onPageHide);
	onPageHide = null;

	if (scrollEl && onScroll) scrollEl.removeEventListener('scroll', onScroll);
	scrollEl = null;
	onScroll = null;

	if (onAnchorClick) document.removeEventListener('click', onAnchorClick);
	onAnchorClick = null;

	const toggleBtn = document.getElementById('docs-mobile-toc-btn');
	if (toggleBtn && onToggleClick) toggleBtn.removeEventListener('click', onToggleClick);
	onToggleClick = null;

	const backdrop = document.getElementById('docs-mobile-toc-backdrop');
	if (backdrop && onBackdropClick) backdrop.removeEventListener('click', onBackdropClick);
	onBackdropClick = null;

	const sidebar = document.getElementById('docs-sidebar');
	if (sidebar && onSidebarClick) sidebar.removeEventListener('click', onSidebarClick);
	onSidebarClick = null;

	if (onKeydown) document.removeEventListener('keydown', onKeydown);
	onKeydown = null;
};

const init = () => {
	destroy();

	const content = document.getElementById('docs-content');
	if (!content) return;

	import(`${document.body.dataset.cdn}/js/codeBlocks.js`)
		.then(({ highlightCodeBlocks }) => highlightCodeBlocks(content))
		.catch(err => console.error('Nie udało się załadować podświetlania składni:', err));

	const targetFor = href => href && href[0] === '#' && href.length > 1
		? content.querySelector(`#${CSS.escape(decodeURIComponent(href.slice(1)))}`)
		: null;

	const headings = [...content.querySelectorAll('h1[id], h2[id], h3[id]')];
	const tocLinks = [...document.querySelectorAll('#docs-toc a, #docs-sidebar__toc a')];

	const setActive = id => {
		const sel = `#${id}`;
		tocLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === sel));
	};

	const update = () => {
		if (!headings.length) return;

		let activeId = headings[0].id;
		if (content.scrollTop + content.clientHeight >= content.scrollHeight - 4) {
			activeId = headings[headings.length - 1].id;
		} else {
			const top = content.getBoundingClientRect().top;
			for (const heading of headings) {
				if (heading.getBoundingClientRect().top - top <= 120) activeId = heading.id;
				else break;
			}
		}
		setActive(activeId);
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

	let ticking = false;
	onScroll = () => {
		clearTimeout(saveTimer);
		saveTimer = setTimeout(saveScroll, 150);
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(() => {
			update();
			ticking = false;
		});
	};
	onPageHide = saveScroll;
	window.addEventListener('pagehide', onPageHide);
	scrollEl = content;
	content.addEventListener('scroll', onScroll, { passive: true });

	if (firstInit) {
		firstInit = false;
		const navType = performance.getEntriesByType('navigation')[0]?.type;
		if (!location.hash && (navType === 'reload' || navType === 'back_forward')) {
			let saved = 0;
			try {
				saved = Number(sessionStorage.getItem(scrollKey)) || 0;
			} catch {
				saved = 0;
			}
			if (saved > 0) {
				const restore = () => {
					content.scrollTop = saved;
					update();
				};
				requestAnimationFrame(restore);
				if (document.readyState !== 'complete') window.addEventListener('load', restore, { once: true });
			}
		}
	}

	onAnchorClick = e => {
		if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		const a = e.target.closest('a[href]');
		if (!a) return;
		const target = targetFor(a.getAttribute('href'));
		if (!target) return;
		e.preventDefault();
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		history.replaceState(history.state, '', a.getAttribute('href'));
		setActive(target.id);
	};
	document.addEventListener('click', onAnchorClick);

	const initial = targetFor(location.hash);
	if (initial) requestAnimationFrame(() => initial.scrollIntoView({ block: 'start' }));
	update();

	const toggleBtn = document.getElementById('docs-mobile-toc-btn');
	const backdrop = document.getElementById('docs-mobile-toc-backdrop');
	const sidebar = document.getElementById('docs-sidebar');
	if (toggleBtn && backdrop && sidebar) {
		const closeDrawer = () => {
			sidebar.classList.remove('is-open');
			backdrop.hidden = true;
			toggleBtn.setAttribute('aria-expanded', 'false');
		};

		onToggleClick = () => {
			const open = sidebar.classList.toggle('is-open');
			backdrop.hidden = !open;
			toggleBtn.setAttribute('aria-expanded', String(open));
		};
		toggleBtn.addEventListener('click', onToggleClick);

		onBackdropClick = closeDrawer;
		backdrop.addEventListener('click', onBackdropClick);

		onSidebarClick = e => {
			if (e.target.closest('a')) closeDrawer();
		};
		sidebar.addEventListener('click', onSidebarClick);

		onKeydown = e => {
			if (e.key === 'Escape') closeDrawer();
		};
		document.addEventListener('keydown', onKeydown);
	}
};

definePage(import.meta.url, { init, destroy });
