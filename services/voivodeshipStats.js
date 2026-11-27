import { computeStats } from '../global/utils/nodeStats.js';
import { getVoivodeshipNodes } from './voivodeshipNodes.js';
import { voivodeshipList } from './regions.js';

let cache = null;

const computeVoivodeships = groups => voivodeshipList.map(({ code, name }) => ({ code, name, ...computeStats(groups[code]) }));

const getVoivodeshipStats = async () => {
	const data = await getVoivodeshipNodes();
	if (!data) return null;

	if (cache?.groups !== data.groups) cache = { groups: data.groups, voivodeships: computeVoivodeships(data.groups) };

	return {
		voivodeships: cache.voivodeships,
		lastRefreshedAt: data.lastRefreshedAt?.toISOString() ?? null,
	};
};

export { getVoivodeshipStats };
