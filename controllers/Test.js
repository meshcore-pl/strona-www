import fs from 'node:fs/promises';
import path from 'node:path';
import { borders } from '../services/borders.js';
import { CONTACT_TYPES, getContacts } from '../services/nodeContacts.js';
import { getVoivodeship } from '../services/regions.js';

const ICONS_PATH = path.join(import.meta.dirname, '../public/icons.svg');
const MAP_PADDING = 6;
const X_SCALE = 100 * Math.cos(52 * Math.PI / 180);
const Y_SCALE = 100;

const project = (lon, lat) => [lon * X_SCALE, -lat * Y_SCALE];

const getViewBox = points => {
	const xs = points.map(([x]) => x);
	const ys = points.map(([, y]) => y);
	const minX = Math.min(...xs) - MAP_PADDING;
	const minY = Math.min(...ys) - MAP_PADDING;
	return [minX, minY, Math.max(...xs) - minX + MAP_PADDING, Math.max(...ys) - minY + MAP_PADDING].map(value => value.toFixed(1)).join(' ');
};

const buildMap = async () => {
	const allPoints = [];
	const areas = borders.map(([code, rings], index) => {
		const projected = rings.map(ring => ring.map(([lon, lat]) => project(lon, lat)));
		const points = projected.flat();
		allPoints.push(...points);

		return {
			code,
			name: getVoivodeship(code).name,
			color: `hsl(${Math.round(index * 360 * 7 / borders.length) % 360} 70% 55%)`,
			vertices: points.length,
			path: projected.map(ring => `M${ring.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L')}Z`).join(''),
			viewBox: getViewBox(points),
			nodes: [],
		};
	});

	let nodesAvailable = true;
	// Sekwencyjnie, żeby pierwsze wywołanie zbudowało cache dla pozostałych
	for (const area of areas) {
		const contacts = await getContacts({ voivodeships: [area.code], types: [...CONTACT_TYPES.keys()], days: 36500, limit: Infinity });
		if (!contacts) {
			nodesAvailable = false;
			break;
		}

		area.nodes = contacts.map(({ name, latitude, longitude }) => {
			const [x, y] = project(Number(longitude), Number(latitude));
			return { name, latitude, longitude, path: `M${x.toFixed(2)} ${y.toFixed(2)}h0` };
		});
	}

	return {
		areas,
		viewBox: getViewBox(allPoints),
		nodesAvailable,
		xScale: X_SCALE,
		yScale: Y_SCALE,
	};
};

export const test = async (req, res) => {
	const [map, icons] = await Promise.all([buildMap(), fs.readFile(ICONS_PATH, 'utf8')]);

	res.set('Cache-Control', 'no-store');
	res.render('test.ejs', { map, icons: [...icons.matchAll(/<symbol[^>]*\sid="([^"]+)"/g)].map(match => match[1]) });
};
