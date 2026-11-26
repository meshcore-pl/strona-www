import { unpack } from 'msgpackr';
import { getCachedNodes, getLastRefreshedAt } from '../global/services/nodeCache.js';
import { borders, findVoivodeship } from './borders.js';

let cache = null;

const groupNodes = async () => {
	const buffer = await getCachedNodes('pl');
	if (!buffer) return null;

	const groups = Object.fromEntries(borders.map(([code]) => [code, []]));
	for (const node of unpack(buffer)) {
		groups[findVoivodeship(node)]?.push(node);
	}
	for (const nodes of Object.values(groups)) {
		nodes.sort((a, b) => new Date(b.ud) - new Date(a.ud));
	}
	return groups;
};

const getVoivodeshipNodes = async () => {
	const lastRefreshedAt = await getLastRefreshedAt();
	const refreshedAtMs = lastRefreshedAt?.getTime() ?? null;

	if (!cache || cache.refreshedAtMs !== refreshedAtMs) {
		const entry = { refreshedAtMs, groups: groupNodes() };
		cache = entry;
		const forget = () => {
			if (cache === entry) cache = null;
		};
		entry.groups.then(groups => groups || forget(), forget);
	}

	const groups = await cache.groups;
	return groups && { groups, lastRefreshedAt };
};

export { getVoivodeshipNodes };
