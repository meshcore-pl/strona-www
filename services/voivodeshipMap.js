import { borders } from './borders.js';
import { getVoivodeship } from './regions.js';

const MAP_PADDING = 4;
const X_SCALE = 100 * Math.cos(52 * Math.PI / 180);
const Y_SCALE = 100;
const GRID = 2;

const snap = value => Math.round(value * GRID) / GRID;
const project = ([lon, lat]) => [snap(lon * X_SCALE), snap(-lat * Y_SCALE)];

const simplify = ring => ring.map(project).filter(([x, y], i, points) => !i || x !== points[i - 1][0] || y !== points[i - 1][1]);

const getCentroid = points => {
	let area = 0, cx = 0, cy = 0;
	for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
		const cross = points[j][0] * points[i][1] - points[i][0] * points[j][1];
		area += cross;
		cx += (points[j][0] + points[i][0]) * cross;
		cy += (points[j][1] + points[i][1]) * cross;
	}
	return [cx / (3 * area), cy / (3 * area)];
};

const shapes = borders.map(([code, rings]) => {
	const simplified = rings.map(simplify);
	const [labelX, labelY] = getCentroid(simplified.reduce((a, b) => b.length > a.length ? b : a));

	return {
		code,
		name: getVoivodeship(code).name,
		path: simplified.map(ring => `M${ring.map(point => point.join(' ')).join('L')}Z`).join(''),
		labelX: labelX.toFixed(1),
		labelY: labelY.toFixed(1),
		points: simplified.flat(),
	};
});

const allPoints = shapes.flatMap(shape => shape.points);
const xs = allPoints.map(([x]) => x);
const ys = allPoints.map(([, y]) => y);
const minX = Math.min(...xs) - MAP_PADDING;
const minY = Math.min(...ys) - MAP_PADDING;

const voivodeshipMap = {
	viewBox: [minX, minY, Math.max(...xs) - minX + MAP_PADDING, Math.max(...ys) - minY + MAP_PADDING].join(' '),
	areas: shapes.map(({ code, name, path, labelX, labelY }) => ({ code, name, path, labelX, labelY })),
};

export default voivodeshipMap;
