import { unpack } from 'msgpackr';
import { getCachedNodes, getLastRefreshedAt } from '../global/services/nodeCache.js';
import { computeStats } from '../global/utils/nodeStats.js';
import { findVoivodeship } from './borders.js';
import { voivodeshipList } from './regions.js';

let cache = null;

const build = nodes => {
	const groups = Object.groupBy(nodes, node => findVoivodeship(node) ?? '');
	return voivodeshipList.map(({ code, name }) => ({ code, name, ...computeStats(groups[code] ?? []) }));
};

const getVoivodeshipStats = async () => {
	const lastRefreshedAt = await getLastRefreshedAt();
	const refreshedAtMs = lastRefreshedAt?.getTime() ?? null;

	if (!cache || cache.refreshedAtMs !== refreshedAtMs) {
		const buffer = await getCachedNodes('pl');
		if (!buffer) return null;

		cache = { refreshedAtMs, voivodeships: build(unpack(buffer)) };
	}

	return { voivodeships: cache.voivodeships, lastRefreshedAt: lastRefreshedAt?.toISOString() ?? null };
};

export { getVoivodeshipStats };
