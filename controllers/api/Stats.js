import { getStats, formatWarsawDate } from '../../global/services/nodeCache.js';
import StatsDaily from '../../global/database/models/statsDaily.model.js';
import { sendSuccess, sendError } from '../../utils/apiResponse.js';

const MAX_HISTORY_DAYS = 365;
const DEFAULT_HISTORY_DAYS = 90;
const REGIONS = ['pl', 'all'];
const DAYS_RE = /^[1-9]\d{0,2}$/;

const INVALID_REGION = `Nieprawidłowy parametr region. Dozwolone wartości: ${REGIONS.join(', ')}.`;
const INVALID_DAYS = `Nieprawidłowy parametr days. Dozwolone wartości: liczba od 1 do ${MAX_HISTORY_DAYS} lub all.`;

const isValidDays = days => days === 'all' || (typeof days === 'string' && DAYS_RE.test(days) && Number(days) <= MAX_HISTORY_DAYS);

export const getRepeaterStats = async (req, res) => {
	const { region = 'pl' } = req.query;
	if (!REGIONS.includes(region)) return sendError(res, 400, INVALID_REGION);

	const stats = await getStats(region);
	if (!stats) return sendError(res, 503, 'Dane węzłów nie są obecnie dostępne.');

	res.set('Cache-Control', 'public, max-age=60');
	sendSuccess(res, stats);
};

export const getHistory = async (req, res) => {
	const { region = 'pl', days = String(DEFAULT_HISTORY_DAYS) } = req.query;
	if (!REGIONS.includes(region)) return sendError(res, 400, INVALID_REGION);
	if (!isValidDays(days)) return sendError(res, 400, INVALID_DAYS);

	const query = { region };

	if (days !== 'all') {
		const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
		query.date = { $gte: formatWarsawDate(cutoff) };
	}

	const history = await StatsDaily.find(query, '-_id -region -createdAt -updatedAt')
		.sort({ date: 1 })
		.lean();

	res.set('Cache-Control', 'public, max-age=300');
	sendSuccess(res, history);
};
