import { createSitemap } from '../utils/sitemap.js';
import docs from '../services/docs.js';
import news from '../services/news.js';
import pages from '../content/pages.js';
import { voivodeshipList } from '../services/regions.js';

const LASTMOD = {
	'/dokumentacja': () => docs.lastModified,
	'/aktualnosci': () => news.lastModified,
};

const getEntries = () => [
	...pages.map(({ path }) => ({ loc: path, lastmod: LASTMOD[path]?.() ?? null })),
	...docs.groups.map(group => ({ loc: `/dokumentacja/${group.slug}`, lastmod: group.lastModified })),
	...news.tags.map(tag => ({ loc: `/aktualnosci/${tag.slug}`, lastmod: tag.posts.reduce((acc, p) => (p.date > acc ? p.date : acc), tag.posts[0].date) })),
	...voivodeshipList.map(({ code }) => ({ loc: `/wojewodztwa/${code}` })),
	...news.posts.map(post => ({ loc: post.canonical, lastmod: post.date })),
	...docs.groups.flatMap(group => group.visiblePages.map(page => ({ loc: `/dokumentacja/${group.slug}/${page.slug}`, lastmod: page.date }))),
];

export const sitemap = createSitemap(getEntries);
