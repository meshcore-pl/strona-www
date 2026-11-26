import { validateFields, verifySender, deliver } from '../../services/contact.js';
import { sendSuccess, sendError } from '../../utils/apiResponse.js';

const SENT_MESSAGE = 'Dziękujemy! Twoja wiadomość została wysłana. Odpowiemy najszybciej, jak to możliwe.';

const toText = value => typeof value === 'string' ? value.trim() : '';

export const sendMessage = async (req, res) => {
	const body = req.body ?? {};
	const fields = {
		username: toText(body.username),
		email: toText(body.email),
		subject: toText(body.subject),
		message: toText(body.message),
	};

	if (body.website) {
		console.log('Honeypot triggered by', req.ip);
		return sendSuccess(res, undefined, SENT_MESSAGE);
	}

	const errors = validateFields(fields);
	if (!errors.length) {
		const senderError = await verifySender({ email: fields.email, token: toText(body['cf-turnstile-response']), ip: req.ip });
		if (senderError) errors.push(senderError);
	}
	if (errors.length) {
		console.log(`Contact form rejected for ${req.ip}: ${errors.join(' | ')}`);
		return sendError(res, 400, 'Formularz zawiera błędy.', { errors });
	}

	console.log(`New contact message received from ${fields.email}`);

	try {
		await deliver(fields, req.app.locals.domain);
		sendSuccess(res, undefined, SENT_MESSAGE);
	} catch (err) {
		console.error(err);
		sendError(res, 502, 'Nie udało się wysłać wiadomości. Spróbuj ponownie później.');
	}
};
