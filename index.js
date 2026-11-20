import './loadEnv.js';
import express from 'express';
import helmet from 'helmet';
import fs from 'node:fs';
import './global/database/mongoose.js';

// Routes
import PagesRouter from './routes/Pages.js';
import ApiRouter from './routes/Api.js';
import DocsRouter from './routes/Docs.js';
import NewsRouter from './routes/News.js';
import ContactRouter from './routes/Contact.js';
import SitemapRouter from './routes/Sitemap.js';

// Middleware imports
import timeout from './middlewares/timeout.js';
// import blockAiBots from './middlewares/blockAiBots.js';
import logger from './global/middlewares/morgan.js';
import * as limiter from './middlewares/ratelimit.js';

// Utils
import RenderError from './utils/renderError.js';
import buildSchema from './utils/schema.js';
import pluralizePolish from './utils/pluralizePolish.js';

const { version } = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const { DOMAIN, NODE_ENV, PORT, CDN_SEFINEK_URL } = process.env;
const isProd = NODE_ENV === 'production';
if (!CDN_SEFINEK_URL) throw new Error('Missing required environment variable: CDN_SEFINEK_URL');

// Create an Express app
const app = express();

// Configure the app
if (isProd) app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.locals.domain = `${DOMAIN}${isProd ? '' : `:${PORT}`}`;
app.locals.cdn = CDN_SEFINEK_URL;
const [releaseVersion, buildMetadata] = version.split('+');
const buildDate = (/^(\d{4})(\d{2})(\d{2})$/).exec(buildMetadata || '');
app.locals.v = releaseVersion;
app.locals.versionDate = '';
if (buildDate) {
	const [, year, month, day] = buildDate;
	const isoDate = `${year}-${month}-${day}`;
	const date = new Date(`${isoDate}T00:00:00Z`);
	if (!Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === isoDate) app.locals.versionDate = `${day}.${month}.${year}`;
}
app.locals.buildSchema = buildSchema;
app.locals.pluralizePolish = pluralizePolish;

// Use middlewares
app.use(helmet({
	crossOriginResourcePolicy: false,
	contentSecurityPolicy: {
		useDefaults: false,
		directives: {
			defaultSrc: ['\'self\''],
			baseUri: ['\'self\''],
			objectSrc: ['\'none\''],
			scriptSrc: ['\'self\'', CDN_SEFINEK_URL, 'https://cdn.jsdelivr.net', 'https://challenges.cloudflare.com'],
			styleSrc: ['\'self\'', CDN_SEFINEK_URL, 'https://fonts.googleapis.com'],
			fontSrc: ['\'self\'', 'https://fonts.gstatic.com'],
			imgSrc: ['\'self\'', 'https://flasher.meshcore.io', 'https://blog.meshcore.io'],
			connectSrc: ['\'self\'', 'https://challenges.cloudflare.com', 'https://cdn.jsdelivr.net'],
			frameSrc: ['https://challenges.cloudflare.com'],
			workerSrc: ['\'self\''],
			manifestSrc: ['\'self\''],
			frameAncestors: ['\'self\''],
			formAction: ['\'self\''],
		},
	},
}));
app.use(express.static('public'));
app.use(logger);
if (isProd) app.use(limiter.global);
app.use(timeout());
// app.use(blockAiBots);
app.use(express.urlencoded({ extended: false, limit: '8kb' }));


app.use(PagesRouter);
app.use(ApiRouter);
app.use(DocsRouter);
app.use(NewsRouter);
app.use(ContactRouter);
app.use(SitemapRouter);


// Error handling
app.use((req, res) => RenderError(res, 404));
app.use((err, req, res, next) => {
	if (res.headersSent) return next(err);
	const status = err.status >= 400 && err.status < 600 ? err.status : 500;
	RenderError(res, status, status >= 500 ? err : null);
});

// Start the server
app.listen(PORT, () => process.send ? process.send('ready') : console.log(`Server running at ${DOMAIN}:${PORT}`));
