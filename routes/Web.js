import { Router } from 'express';
import * as pages from '../controllers/Pages.js';
import * as docs from '../controllers/Docs.js';
import * as news from '../controllers/News.js';
import * as voivodeships from '../controllers/Voivodeships.js';
import * as contact from '../controllers/Contact.js';
import { sitemap } from '../controllers/Sitemap.js';
import { test } from '../controllers/Test.js';
import { ENDPOINTS } from '../services/serviceWorker/index.js';
import sitePages from '../content/pages.js';
import { createRobots } from '../global/utils/robots.js';

const router = Router();

for (const page of sitePages) {
	if (page.view) router.get(page.path, pages.renderPage(page));
}

router.get(ENDPOINTS.serviceWorker, pages.serviceWorker);
router.get(ENDPOINTS.offline, pages.offline);
router.get('/discord', pages.discord);

router.get('/dokumentacja', docs.index);
router.get('/dokumentacja/spolecznosc/nasze-logo', docs.redirectLogo);
router.get('/dokumentacja/:group', docs.group);
router.get('/dokumentacja/:group/:slug', docs.page);

router.get('/aktualnosci', news.index);
router.get('/aktualnosci/rss.xml', news.feed);
router.get('/aktualnosci/:tag', news.tag);
router.get('/aktualnosci/:tag/rss.xml', news.feed);
router.get('/aktualnosci/:tag/:title', news.post);

router.get('/wojewodztwa', voivodeships.index);
router.get('/wojewodztwa/:slug', voivodeships.page);

router.get('/kontakt', contact.form);

router.get('/sitemap.xml', sitemap);
router.get('/robots.txt', createRobots());

if (process.env.NODE_ENV !== 'production') router.get('/test', test);

export default router;
