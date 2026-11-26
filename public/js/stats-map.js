const MIN_OPACITY = 0.08;
const MAX_OPACITY = 0.85;

const METRICS = [
	{ key: 'nodes', get: row => row.nodes },
	{ key: 'repeaters', get: row => row.types.repeater },
	{ key: 'active', get: row => row.active },
	{ key: 'roomServers', get: row => row.types.roomServer },
	{ key: 'companions', get: row => row.types.client },
];

const section = document.getElementById('stats-voivodeships');
const metricSelect = document.getElementById('stats-metric');
const readout = document.getElementById('stats-map-readout');
const areas = [...section.querySelectorAll('.stats-map__area')];

let rows = [];

const formatNumber = value => value.toLocaleString('pl-PL');
const getMetric = () => METRICS.find(metric => metric.key === metricSelect.value);

const createVoivodeshipLink = (code, text) => {
	const link = document.createElement('a');
	link.href = `/wojewodztwa/${code}`;
	link.textContent = text;
	return link;
};

const describe = code => {
	const row = rows.find(item => item.code === code);
	if (!row) return;

	readout.replaceChildren(
		`${row.name.toUpperCase()}: urządzenia ${formatNumber(row.nodes)}, repeatery ${formatNumber(row.types.repeater)} (aktywne ${formatNumber(row.active)}), room serwery ${formatNumber(row.types.roomServer)}, companiony ${formatNumber(row.types.client)}.`,
		document.createElement('br'),
		createVoivodeshipLink(row.code, 'Zobacz więcej informacji')
	);
};

const render = () => {
	const metric = getMetric();
	const sorted = rows.toSorted((a, b) => metric.get(b) - metric.get(a) || a.name.localeCompare(b.name, 'pl'));
	const max = Math.max(1, metric.get(sorted[0]));

	for (const row of rows) {
		const value = metric.get(row);
		areas.find(area => area.dataset.code === row.code)?.setAttribute('fill-opacity', MIN_OPACITY + (MAX_OPACITY - MIN_OPACITY) * value / max);
		section.querySelector(`.stats-map__label[data-code="${row.code}"]`).textContent = formatNumber(value);
	}

	document.getElementById('stats-voivodeships-rows').replaceChildren(...sorted.map(row => {
		const tr = document.createElement('tr');
		tr.append(...[row.name, ...METRICS.map(item => formatNumber(item.get(row)))].map((text, i) => {
			const td = document.createElement('td');
			td.append(i ? text : createVoivodeshipLink(row.code, text));
			if (METRICS[i - 1] === metric) td.className = 'is-active';
			return td;
		}));
		return tr;
	}));
};

const load = async () => {
	const response = await fetch('/api/v1/stats/voivodeships', { signal: AbortSignal.timeout(8000) });
	const body = await response.json().catch(() => null);
	if (!response.ok || !Array.isArray(body?.data?.voivodeships)) throw new Error(body?.message ?? `HTTP ${response.status}`);

	rows = body.data.voivodeships;
	render();
	document.getElementById('stats-voivodeships-content').hidden = false;
};

metricSelect.addEventListener('change', () => {
	if (rows.length) render();
});

areas.forEach(area => ['pointerenter', 'focus', 'click'].forEach(type => area.addEventListener(type, () => describe(area.dataset.code))));

load().catch(err => {
	console.error('Nie udało się pobrać statystyk województw:', err);
	document.getElementById('stats-voivodeships-error').hidden = false;
});
