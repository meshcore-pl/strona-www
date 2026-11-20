import { Router } from 'express';
import { getScript, ENDPOINTS, OFFLINE_HEADER } from '../services/serviceWorker/index.js';
import RenderError from '../utils/renderError.js';
import pages from '../content/pages.js';

const router = Router();
const regionGeneratorBlocked = false;

router.get(ENDPOINTS.serviceWorker, async (req, res, next) => {
	try {
		const script = await getScript();
		res.set({
			'Content-Type': 'text/javascript; charset=utf-8',
			'Cache-Control': 'no-cache',
			'Content-Security-Policy': `default-src 'none'; connect-src 'self' ${req.app.locals.cdn} https:`,
		});
		res.send(script);
	} catch (err) {
		next(err);
	}
});

for (const { path, view } of pages) {
	if (view) router.get(path, (req, res) => res.render(view, path === '/generator-regionow' ? { regionGeneratorBlocked } : {}));
}

router.get(ENDPOINTS.offline, (req, res) => {
	res.set('Cache-Control', 'no-store');
	if (req.get(OFFLINE_HEADER) !== '1') return RenderError(res, 404);
	res.render('offline.ejs');
});

router.get('/discord', (req, res) => res.redirect(301, `https://discord.com/invite/${process.env.DISCORD_INVITE_CODE}`));

export default router;
