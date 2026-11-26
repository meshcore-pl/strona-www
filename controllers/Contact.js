import { getRandomTip } from '../content/tips.js';

const EMPTY_VALUES = { username: '', email: '', message: '' };
const DEV_VALUES = { username: 'Jan Kowalski', email: 'contact@sefinek.net', message: 'Jakaś tam testowa wiadomość z formularza kontaktowego.\n\nSzybki brązowy lis przeskoczył nad leniwym psem.\nPchnąć w tę łódź jeża lub ośm skrzyń fig.\nZażółć gęślą jaźń.\n\nZnaki specjalne: <b>test</b> & "cudzysłów" \'apostrof\' 🚀😺' };

export const form = (req, res) => {
	const values = {
		...(process.env.NODE_ENV === 'production' ? EMPTY_VALUES : DEV_VALUES),
		subject: typeof req.query.temat === 'string' ? req.query.temat.trim().slice(0, 120) : '',
	};
	if (values.subject) values.message = '';
	if (typeof req.query.message === 'string') values.message = req.query.message.slice(0, 4000);
	res.render('contact.ejs', { values, tip: getRandomTip() });
};
