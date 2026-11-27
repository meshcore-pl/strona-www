import { getScript, OFFLINE_HEADER } from '../services/serviceWorker/index.js';
import RenderError from '../utils/renderError.js';
import voivodeshipMap from '../services/voivodeshipMap.js';
import { voivodeshipList } from '../services/regions.js';

const regionGeneratorBlocked = false;
const VIEW_LOCALS = {
	'/generator-regionow': { regionGeneratorBlocked },
	'/statystyki': { voivodeshipMap },
	'/generator-nazw': { voivodeships: voivodeshipList },
};

export const renderPage = ({ path, view }) => (req, res) => res.render(view, VIEW_LOCALS[path] ?? {});

export const serviceWorker = async (req, res) => {
	const script = await getScript();
	res.set({
		'Content-Type': 'text/javascript; charset=utf-8',
		'Cache-Control': 'no-cache',
		'Content-Security-Policy': `default-src 'none'; connect-src 'self' ${req.app.locals.cdn} https:`,
	});
	res.send(script);
};

export const offline = (req, res) => {
	res.set('Cache-Control', 'no-store');
	if (req.get(OFFLINE_HEADER) !== '1') return RenderError(res, 404);
	res.render('offline.ejs');
};

export const discord = (req, res) => res.redirect(301, `https://discord.com/invite/${process.env.DISCORD_INVITE_CODE}`);
