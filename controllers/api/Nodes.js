import { CONTACT_TYPES, getContacts } from '../../services/nodeContacts.js';
import { getVoivodeship, voivodeshipList } from '../../services/regions.js';
import { sendSuccess, sendError } from '../../utils/apiResponse.js';

const DEFAULT_TYPE = 'repeater';
const DEFAULT_DAYS = 5;
const MAX_DAYS = 60;
const MAX_LIMIT = 350;
const POSITIVE_INT_RE = /^[1-9]\d{0,2}$/;

const INVALID_VOIVODESHIP = `Nieprawidłowy parametr voivodeship. Dozwolone wartości (można podać kilka po przecinku): ${voivodeshipList.map(region => region.code).join(', ')}.`;
const INVALID_TYPE = `Nieprawidłowy parametr type. Dozwolone wartości (można podać kilka po przecinku): ${[...CONTACT_TYPES.keys()].join(', ')}.`;
const INVALID_DAYS = `Nieprawidłowy parametr days. Dozwolone wartości: liczba od 1 do ${MAX_DAYS}.`;
const INVALID_LIMIT = `Nieprawidłowy parametr limit. Dozwolone wartości: liczba od 1 do ${MAX_LIMIT}.`;

const parseList = (value, isAllowed) => {
	if (typeof value !== 'string') return null;

	const items = value.split(',');
	return items.every(isAllowed) ? [...new Set(items)] : null;
};

const isInRange = (value, max) => typeof value === 'string' && POSITIVE_INT_RE.test(value) && Number(value) <= max;

export const getNodes = async (req, res) => {
	const { voivodeship, type = DEFAULT_TYPE, days = String(DEFAULT_DAYS), limit = String(MAX_LIMIT) } = req.query;

	const voivodeships = parseList(voivodeship, getVoivodeship);
	if (!voivodeships) return sendError(res, 400, INVALID_VOIVODESHIP);

	const types = parseList(type, name => CONTACT_TYPES.has(name));
	if (!types) return sendError(res, 400, INVALID_TYPE);
	if (!isInRange(days, MAX_DAYS)) return sendError(res, 400, INVALID_DAYS);
	if (!isInRange(limit, MAX_LIMIT)) return sendError(res, 400, INVALID_LIMIT);

	const contacts = await getContacts({ voivodeships, types, days: Number(days), limit: Number(limit) });
	if (!contacts) return sendError(res, 503, 'Dane węzłów nie są obecnie dostępne.');

	res.set('Cache-Control', 'public, max-age=300');
	sendSuccess(res, contacts);
};
