import fs from 'node:fs';
import path from 'node:path';

const borders = Object.entries(JSON.parse(fs.readFileSync(path.join(import.meta.dirname, '../content/voivodeship-borders.json'), 'utf8')));

const isInRing = (lat, lon, ring) => {
	let inside = false;
	for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
		const [xi, yi] = ring[i];
		const [xj, yj] = ring[j];
		if (yi > lat !== yj > lat && lon < (xj - xi) * (lat - yi) / (yj - yi) + xi) inside = !inside;
	}
	return inside;
};

const getBounds = ring => {
	const lons = ring.map(([lon]) => lon);
	const lats = ring.map(([, lat]) => lat);
	return { minLon: Math.min(...lons), maxLon: Math.max(...lons), minLat: Math.min(...lats), maxLat: Math.max(...lats) };
};

const areas = borders.map(([code, rings]) => ({ code, rings: rings.map(ring => ({ ring, ...getBounds(ring) })) }));

const findVoivodeship = ({ lat, lon }) => areas.find(({ rings }) => rings.some(({ ring, minLon, maxLon, minLat, maxLat }) =>
	lon >= minLon && lon <= maxLon && lat >= minLat && lat <= maxLat && isInRing(lat, lon, ring)))?.code;

export { borders, findVoivodeship };
