const X_SCALE = 100 * Math.cos(52 * Math.PI / 180);
const Y_SCALE = 100;

const project = ([lon, lat]) => [lon * X_SCALE, -lat * Y_SCALE];

const getViewBox = (points, padding) => {
	const xs = points.map(([x]) => x);
	const ys = points.map(([, y]) => y);
	const minX = Math.min(...xs) - padding;
	const minY = Math.min(...ys) - padding;
	return [minX, minY, Math.max(...xs) - minX + padding, Math.max(...ys) - minY + padding].map(value => value.toFixed(1)).join(' ');
};

export { X_SCALE, Y_SCALE, project, getViewBox };
