import { getLocodes } from '../../services/locodes.js';
import { getVoivodeship } from '../../services/regions.js';
import { sendSuccess, sendError } from '../../utils/apiResponse.js';

export const getAll = (req, res) => {
	const { voivodeship } = req.query;
	if (voivodeship !== undefined && !getVoivodeship(voivodeship)) return sendError(res, 400, 'Nieznany kod województwa.');

	res.set('Cache-Control', 'public, max-age=300');
	sendSuccess(res, getLocodes(voivodeship));
};
