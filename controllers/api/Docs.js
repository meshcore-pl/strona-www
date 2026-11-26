import docs from '../../services/docs.js';
import { sendSuccess } from '../../utils/apiResponse.js';

export const getSearchIndex = (req, res) => {
	res.set('Cache-Control', 'no-cache');
	sendSuccess(res, docs.searchIndex);
};
