import emailValidator from '@sefinek/email-validator';
import verifyMx from '@sefinek/email-validator/mx';
import * as tcpClient from '../global/services/tcpClient.js';
import sendMail from './mail/mailer.js';
import confirmationMail from './mail/confirmation.js';
import verifyTurnstile from './turnstile.js';

const SUBJECT = 'Kontakt przez formularz MeshCore Polska';

export const validateFields = ({ username, email, subject = '', message }) => {
	const errors = [];
	if (username.length < 2 || username.length > 45) errors.push('Nazwa użytkownika musi mieć od 2 do 45 znaków.');
	if (!emailValidator(email)) errors.push('Podaj poprawny adres e-mail.');
	if (subject.length > 120 || (/[\r\n]/).test(subject)) errors.push('Tytuł może mieć maksymalnie 120 znaków i musi mieścić się w jednym wierszu.');
	if (message.length < 10 || message.length > 4000) errors.push('Wiadomość musi mieć od 10 do 4000 znaków.');
	return errors;
};

export const verifySender = async ({ email, token, ip }) => {
	if (!await verifyTurnstile(token, ip)) return 'Weryfikacja captcha Cloudflare Turnstile nie powiodła się. Odśwież stronę i spróbuj ponownie.';
	if (!await verifyMx(email)) return 'Domena podanego adresu e-mail nie przyjmuje poczty.';
	if ((await tcpClient.checkTempEmail(email))?.blacklisted) return 'Tymczasowe adresy e-mail są niedozwolone.';
	return null;
};

export const deliver = async ({ username, email, subject, message }, domain) => {
	const mailSubject = subject || SUBJECT;
	const adminMail = await sendMail({
		from: `MeshCore Polska <${process.env.MAILER_AUTH_USER}>`,
		replyTo: { name: username, address: email },
		to: `Sefinek <${process.env.MAILER_AUTH_USER}>`,
		subject: mailSubject,
		text: `// Wiadomość od ${username} (${email})\n\n${message}`,
	});

	await sendMail({
		from: `Sefinek <${process.env.MAILER_AUTH_USER}>`,
		replyTo: `Sefinek <${process.env.MAILER_AUTH_USER}>`,
		to: { name: username, address: email },
		subject: mailSubject,
		inReplyTo: adminMail.messageId,
		references: [adminMail.messageId],
		...confirmationMail(username, domain),
	});
};
