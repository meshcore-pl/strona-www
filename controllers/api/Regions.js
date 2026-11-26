import { regions, voivodeshipList, getVoivodeship, getLocalRegions, getLocalRegion } from '../../services/regions.js';
import { sendSuccess, sendError } from '../../utils/apiResponse.js';

const send = (res, data) => {
	res.set('Cache-Control', 'public, max-age=300');
	sendSuccess(res, data);
};

export const getAll = (req, res) => send(res, regions);

export const getVoivodeships = (req, res) => send(res, voivodeshipList);

export const getOneVoivodeship = (req, res) => {
	const voivodeship = getVoivodeship(req.params.code);
	if (!voivodeship) return sendError(res, 404, 'Nie znaleziono województwa.');

	send(res, { ...voivodeship, localRegions: getLocalRegions(voivodeship.code) });
};

export const getLocal = (req, res) => {
	const { voivodeship } = req.query;
	if (voivodeship !== undefined && !getVoivodeship(voivodeship)) return sendError(res, 400, 'Nieznany kod województwa.');

	send(res, getLocalRegions(voivodeship));
};

export const getOneLocal = (req, res) => {
	const region = getLocalRegion(req.params.code);
	if (!region) return sendError(res, 404, 'Nie znaleziono regionu lokalnego.');

	send(res, region);
};
