import fs from 'node:fs';
import path from 'node:path';

// Zewnętrzne pierścienie województw [lon, lat], uproszczone: Nominatim (polygon_threshold=0.002), © OpenStreetMap, ODbL
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

const findVoivodeship = ({ lat, lon }) => borders.find(([, rings]) => rings.some(ring => isInRing(lat, lon, ring)))?.[0];

export { borders, findVoivodeship };
