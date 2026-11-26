import news from '../services/news.js';
import { renderFeed, getFeedPath, FEED_TITLE } from '../services/newsFeed.js';
import RenderError from '../utils/renderError.js';
import { getRandomTip } from '../content/tips.js';

export const index = (req, res) => res.render('news/index.ejs', { posts: news.posts, tags: news.tags, tip: getRandomTip() });

export const tag = (req, res) => {
	const newsTag = news.getTag(req.params.tag);
	if (!newsTag) return RenderError(res, 404);

	res.render('news/tag.ejs', { tag: newsTag, tags: news.tags, feed: { title: `${FEED_TITLE}: ${newsTag.label}`, href: getFeedPath(newsTag) } });
};

export const feed = (req, res) => {
	const newsTag = req.params.tag ? news.getTag(req.params.tag) : null;
	if (req.params.tag && !newsTag) return RenderError(res, 404);

	res.vary('Accept');
	res.set({
		'Content-Type': `${req.get('Accept')?.includes('text/html') ? 'application/xml' : 'application/rss+xml'}; charset=utf-8`,
		'Cache-Control': 'public, max-age=3600',
		'Access-Control-Allow-Origin': '*',
		'Content-Security-Policy': 'default-src \'none\'; style-src \'unsafe-inline\'',
	});
	res.send(renderFeed(req.app.locals.domain, newsTag ? newsTag.posts : news.posts, newsTag));
};

export const post = (req, res) => {
	const newsPost = news.getPost(req.params.title);
	if (!newsPost) return RenderError(res, 404);
	if (req.params.tag !== newsPost.tagSlug) return res.redirect(301, newsPost.canonical);

	res.set('Last-Modified', newsPost.date.toUTCString());
	res.set('Cache-Control', 'no-cache');

	res.render('news/post.ejs', {
		title: newsPost.title,
		description: newsPost.description || newsPost.title,
		canonical: newsPost.canonical,
		post: newsPost,
		breadcrumbs: [
			{ name: 'Strona główna', url: '/' },
			{ name: 'Aktualności', url: '/aktualnosci' },
			...(newsPost.tagSlug ? [{ name: newsPost.tags[0].label, url: `/aktualnosci/${newsPost.tagSlug}` }] : []),
			{ name: newsPost.title, url: newsPost.canonical },
		],
	});
};
