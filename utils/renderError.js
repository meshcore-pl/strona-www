import { sendError } from './apiResponse.js';

const MESSAGES = {
	400: 'Nieprawidłowe żądanie.',
	404: 'Nie znaleziono strony. Wróć na stronę główną.',
	413: 'Przesłane dane są zbyt duże.',
	429: 'Ups. Zbyt wiele żądań. Spróbuj ponownie za chwilę.',
	500: 'Wystąpił nieoczekiwany błąd serwera. Spróbuj ponownie za chwilę.',
	503: 'Serwer jest chwilowo niedostępny. Spróbuj ponownie za chwilę.',
};

export default (res, status, err) => {
	if (err) console.error(err);

	const message = MESSAGES[status] || 'Wystąpił błąd.';
	if (res.req.originalUrl.startsWith('/api/')) return sendError(res, status, message);

	res.status(status).render('error.ejs', { status, message });
};
