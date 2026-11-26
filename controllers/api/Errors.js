import { sendError } from '../../utils/apiResponse.js';

export const notFound = (req, res) => sendError(res, 404, 'Nie znaleziono zasobu.');

export const handleError = (err, req, res, next) => {
	if (res.headersSent) return next(err);

	if (err.status >= 400 && err.status < 500) return sendError(res, err.status, 'Nieprawidłowe żądanie.');

	console.error(err);
	sendError(res, 500, 'Wewnętrzny błąd serwera.');
};
