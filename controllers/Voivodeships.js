import { regions, voivodeshipList, getVoivodeship, getLocalRegions } from '../services/regions.js';
import { getVoivodeshipStats } from '../services/voivodeshipStats.js';
import voivodeshipMap from '../services/voivodeshipMap.js';
import RenderError from '../utils/renderError.js';

const dateFormat = new Intl.DateTimeFormat('pl-PL', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Warsaw' });
const formatRefreshedAt = value => (value ? dateFormat.format(new Date(value)) : null);
const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);
const byCode = list => new Map(list.map(item => [item.code, item]));

export const index = async (req, res) => {
	const stats = await getVoivodeshipStats();
	const statsByCode = byCode(stats?.voivodeships ?? []);
	const maxRepeaters = Math.max(1, ...[...statsByCode.values()].map(row => row.types.repeater));
	const getRepeaters = code => statsByCode.get(code).types.repeater;

	res.set('Cache-Control', 'no-cache');
	res.render('voivodeships/index.ejs', {
		voivodeships: voivodeshipList.map(({ code, name }) => ({ code, name: capitalize(name), stats: statsByCode.get(code) })),
		hasStats: Boolean(stats),
		getOpacity: code => (stats ? (0.08 + 0.77 * getRepeaters(code) / maxRepeaters).toFixed(2) : 0.2),
		getLabel: code => getRepeaters(code).toLocaleString('pl-PL'),
		refreshedAt: formatRefreshedAt(stats?.lastRefreshedAt),
		voivodeshipMap,
	});
};

export const page = async (req, res) => {
	const voivodeship = getVoivodeship(req.params.code);
	if (!voivodeship) return RenderError(res, 404);

	const stats = await getVoivodeshipStats();
	const localRegions = getLocalRegions(voivodeship.code);
	const { country, commonChannels, channelDescriptions } = regions;
	const name = capitalize(voivodeship.name);

	res.set('Cache-Control', 'no-cache');
	res.render('voivodeships/page.ejs', {
		voivodeship,
		name,
		locative: voivodeship.name.replace(/ie$/, 'im'),
		stats: stats && byCode(stats.voivodeships).get(voivodeship.code),
		refreshedAt: formatRefreshedAt(stats?.lastRefreshedAt),
		localRegions,
		channels: [...new Set(['Public', ...commonChannels, ...country.channels, ...voivodeship.channels])]
			.map(channel => ({ channel, description: channelDescriptions[channel] ?? 'Kanał regionalny.' })),
		communities: [
			{ name: 'Cała Polska', url: country.socials.discord },
			{ name, url: voivodeship.socials.discord },
			...localRegions.filter(region => region.socials.discord).map(region => ({ name: region.name, url: region.socials.discord })),
		],
		neighbors: voivodeship.neighbors.map(code => ({ code, name: capitalize(getVoivodeship(code).name) })),
		voivodeshipMap,
	});
};
