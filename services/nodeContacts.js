import { getVoivodeshipNodes } from './voivodeshipNodes.js';

const CONTACT_TYPES = new Map([['client', 1], ['repeater', 2], ['roomServer', 3], ['sensor', 4]]);
const DAY_MS = 24 * 60 * 60 * 1000;

const toUnixSeconds = date => Math.floor(new Date(date).getTime() / 1000);
const cleanName = name => name?.replaceAll('\uFFFD', '').trim();

const toContact = node => ({
	type: node.t,
	name: cleanName(node.n),
	custom_name: null,
	public_key: Buffer.from(node.pk).toString('hex'),
	flags: 0,
	latitude: String(node.lat),
	longitude: String(node.lon),
	last_advert: Math.min(toUnixSeconds(node.la), toUnixSeconds(Date.now())),
	last_modified: toUnixSeconds(node.ud),
	out_path_list: null,
});

const getContacts = async ({ voivodeships, types, days, limit }) => {
	const data = await getVoivodeshipNodes();
	if (!data) return null;

	const since = Date.now() - days * DAY_MS;
	const typeIds = new Set(types.map(type => CONTACT_TYPES.get(type)));
	return voivodeships
		.flatMap(code => data.groups[code])
		.filter(node => typeIds.has(node.t) && new Date(node.ud).getTime() >= since && cleanName(node.n))
		.slice(0, limit)
		.map(toContact);
};

export { CONTACT_TYPES, getContacts };
