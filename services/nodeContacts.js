import { unpack } from 'msgpackr';
import { getCachedNodes, getLastRefreshedAt } from '../global/services/nodeCache.js';
import { borders, findVoivodeship } from './borders.js';

const CONTACT_TYPES = new Map([['client', 1], ['repeater', 2], ['roomServer', 3], ['sensor', 4]]);
const DAY_MS = 24 * 60 * 60 * 1000;

let cache = null;

const toUnixSeconds = date => Math.floor(new Date(date).getTime() / 1000);

// Advert z przyszłości zablokowałby w firmware kolejne adverty węzła (ochrona przed replay)
const toContact = (node, name) => ({
	type: node.t,
	name,
	custom_name: null,
	public_key: Buffer.from(node.pk).toString('hex'),
	flags: 0,
	latitude: String(node.lat),
	longitude: String(node.lon),
	last_advert: Math.min(toUnixSeconds(node.la), toUnixSeconds(Date.now())),
	last_modified: toUnixSeconds(node.ud),
	out_path_list: null,
});

const groupContacts = nodes => {
	const groups = Object.fromEntries(borders.map(([code]) => [code, []]));
	const sorted = nodes
		.map(node => ({ node, updatedAtMs: new Date(node.ud).getTime() }))
		.sort((a, b) => b.updatedAtMs - a.updatedAtMs);

	for (const { node, updatedAtMs } of sorted) {
		const name = node.n?.replaceAll('\uFFFD', '').trim();
		const code = name && findVoivodeship(node);
		if (code) groups[code].push({ updatedAtMs, contact: toContact(node, name) });
	}

	return groups;
};

const getContacts = async ({ voivodeships, types, days, limit }) => {
	const refreshedAtMs = (await getLastRefreshedAt())?.getTime() ?? null;

	if (!cache || cache.refreshedAtMs !== refreshedAtMs) {
		const buffer = await getCachedNodes('pl');
		if (!buffer) return null;

		cache = { refreshedAtMs, groups: groupContacts(unpack(buffer)) };
	}

	const since = Date.now() - days * DAY_MS;
	const typeIds = new Set(types.map(type => CONTACT_TYPES.get(type)));
	return voivodeships
		.flatMap(code => cache.groups[code])
		.filter(({ updatedAtMs, contact }) => updatedAtMs >= since && typeIds.has(contact.type))
		.slice(0, limit)
		.map(({ contact }) => contact);
};

export { CONTACT_TYPES, getContacts };
