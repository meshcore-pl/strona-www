import { computeStats } from '../global/utils/nodeStats.js';
import { getVoivodeshipNodes } from './voivodeshipNodes.js';
import { voivodeshipList } from './regions.js';

const getVoivodeshipStats = async () => {
	const data = await getVoivodeshipNodes();
	if (!data) return null;

	return {
		voivodeships: voivodeshipList.map(({ code, name }) => ({ code, name, ...computeStats(data.groups[code]) })),
		lastRefreshedAt: data.lastRefreshedAt?.toISOString() ?? null,
	};
};

export { getVoivodeshipStats };
