import { borders } from './borders.js';
import { getVoivodeship } from './regions.js';
import { project, getViewBox } from './projection.js';

const MAP_PADDING = 4;
const GRID = 2;

const snap = value => Math.round(value * GRID) / GRID;

const simplify = ring => ring.map(point => project(point).map(snap)).filter(([x, y], i, points) => !i || x !== points[i - 1][0] || y !== points[i - 1][1]);

const toPath = ([start, ...points]) => {
	const deltas = points.map(([x, y], i) => {
		const [previousX, previousY] = i ? points[i - 1] : start;
		return `${x - previousX} ${y - previousY}`;
	});
	return `M${start.join(' ')}l${deltas.join(' ').replaceAll(' -', '-')}Z`;
};

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

	const { slug, name } = getVoivodeship(code);

	return {
		code,
		slug,
		name,
		path: simplified.map(toPath).join(''),
		labelX: labelX.toFixed(1),
		labelY: labelY.toFixed(1),
		points: simplified.flat(),
	};
});

const voivodeshipMap = {
	viewBox: getViewBox(shapes.flatMap(shape => shape.points), MAP_PADDING),
	areas: shapes.map(({ code, slug, name, path, labelX, labelY }) => ({ code, slug, name, path, labelX, labelY })),
};

export default voivodeshipMap;
