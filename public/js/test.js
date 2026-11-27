const map = document.getElementById('test-map');
const readout = document.getElementById('test-map-readout');

const ZOOM_STEP = 1.2;
const MAX_ZOOM = 100;
const DRAG_THRESHOLD_PX = 4;

let dragStart = null;
let dragged = false;

const zoom = viewBox => map.setAttribute('viewBox', viewBox);

const focusArea = viewBox => {
	map.querySelectorAll('.test-map__area').forEach(area => area.classList.toggle('test-map__area--zoomed', area.dataset.viewbox === viewBox));
	zoom(viewBox ?? map.dataset.viewbox);
};

const toMapPoint = event => new DOMPoint(event.clientX, event.clientY).matrixTransform(map.getScreenCTM().inverse());

const zoomAt = ({ x: cx, y: cy }, factor) => {
	const { x, y, width, height } = map.viewBox.baseVal;
	const [, , fullWidth] = map.dataset.viewbox.split(' ').map(Number);
	if (width * factor >= fullWidth) return focusArea(null);

	const scale = Math.max(factor, fullWidth / MAX_ZOOM / width);
	zoom(`${cx - (cx - x) * scale} ${cy - (cy - y) * scale} ${width * scale} ${height * scale}`);
};

const getCoordinates = event => {
	const point = toMapPoint(event);
	const lat = -point.y / Number(map.dataset.yScale);
	const lon = point.x / Number(map.dataset.xScale);
	return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
};

map.addEventListener('pointermove', event => {
	const { code, name } = event.target.dataset;
	const label = code ? `${name} (${code})` : name ?? 'poza granicami';
	readout.textContent = `${getCoordinates(event)} - ${label}`;
});

map.addEventListener('click', event => {
	if (dragged || !event.target.classList.contains('test-map__area')) return;

	focusArea(event.target.classList.contains('test-map__area--zoomed') ? null : event.target.dataset.viewbox);
});

map.addEventListener('wheel', event => {
	event.preventDefault();
	zoomAt(toMapPoint(event), event.deltaY > 0 ? ZOOM_STEP : 1 / ZOOM_STEP);
}, { passive: false });

map.addEventListener('pointerdown', event => {
	if (event.button !== 0) return;

	dragged = false;
	dragStart = { clientX: event.clientX, clientY: event.clientY, point: toMapPoint(event) };
});

map.addEventListener('pointermove', event => {
	if (!dragStart || !(event.buttons & 1)) return;
	if (!dragged && Math.hypot(event.clientX - dragStart.clientX, event.clientY - dragStart.clientY) < DRAG_THRESHOLD_PX) return;

	dragged = true;
	map.setPointerCapture(event.pointerId);
	const current = toMapPoint(event);
	const { x, y, width, height } = map.viewBox.baseVal;
	zoom(`${x + dragStart.point.x - current.x} ${y + dragStart.point.y - current.y} ${width} ${height}`);
});

['pointerup', 'pointercancel'].forEach(type => map.addEventListener(type, () => {
	dragStart = null;
}));

document.querySelectorAll('[data-zoom]').forEach(button => button.addEventListener('click', () => {
	const { x, y, width, height } = map.viewBox.baseVal;
	zoomAt({ x: x + width / 2, y: y + height / 2 }, button.dataset.zoom === 'out' ? ZOOM_STEP : 1 / ZOOM_STEP);
}));

document.querySelectorAll('.test-zoom').forEach(button => button.addEventListener('click', () => {
	focusArea(button.dataset.viewbox);
	map.scrollIntoView({ behavior: 'smooth', block: 'center' });
}));

document.getElementById('test-map-reset').addEventListener('click', () => focusArea(null));

document.getElementById('test-map-nodes').addEventListener('change', event => {
	document.getElementById('test-map-points').toggleAttribute('hidden', !event.target.checked);
});

document.querySelectorAll('[data-toast]').forEach(button => button.addEventListener('click', async () => {
	const { showToast } = await import(`${document.body.dataset.cdn}/js/meshcore/toast.js`);
	showToast(`Przykładowy toast: ${button.dataset.toast}`, button.dataset.toast);
}));
