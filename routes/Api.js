import { Router } from 'express';
import * as limiter from '../middlewares/ratelimit.js';
import * as stats from '../controllers/api/Stats.js';
import * as news from '../controllers/api/News.js';
import * as regions from '../controllers/api/Regions.js';
import * as locodes from '../controllers/api/Locodes.js';
import * as nodes from '../controllers/api/Nodes.js';
import * as docs from '../controllers/api/Docs.js';
import * as contact from '../controllers/api/Contact.js';
import { notFound, handleError } from '../controllers/api/Errors.js';

const router = Router();

router.get(['/stats', '/repeater-stats'], stats.getCurrent);
router.get('/stats/history', stats.getHistory);
router.get('/stats/voivodeships', stats.getVoivodeships);

router.get('/regions', regions.getAll);
router.get('/regions/voivodeships', regions.getVoivodeships);
router.get('/regions/voivodeships/:code', regions.getOneVoivodeship);
router.get('/regions/local', regions.getLocal);
router.get('/regions/local/:code', regions.getOneLocal);

router.get('/locodes', locodes.getAll);

router.get('/nodes', nodes.getNodes);

router.get('/news/post', news.getPost);
router.get('/news/sources', news.getSources);

router.get('/docs/search-index', docs.getSearchIndex);

router.post('/contact', limiter.contactForm, contact.sendMessage);

router.use(notFound);
router.use(handleError);

export default router;
