import { escapeXml } from '../utils/sitemap.js';
import getSeoImage from '../utils/seoImage.js';
import { toStandaloneHtml } from '../utils/html.js';

const MAX_ITEMS = 25;
const TITLE = 'Aktualności MeshCore Polska';
const DESCRIPTION = 'Newsy, changelogi aplikacji i firmware MeshCore, tłumaczenia wpisów z oficjalnego bloga oraz ogłoszenia społeczności.';

const INVALID_XML_RE = /[^\t\n\r\u0020-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]/gu;
const LEADING_H1_RE = /^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/;

const getFeedPath = tag => (tag ? `/aktualnosci/${tag.slug}/rss.xml` : '/aktualnosci/rss.xml');

const toCdata = str => `<![CDATA[${str.replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;

const renderContent = (post, url) => {
	const body = toStandaloneHtml(post.html.replace(LEADING_H1_RE, ''), url);
	if (!post.sourceUrl) return body;

	return `${body}<p>~ Autor oryginału: ${escapeXml(post.sourceAuthor.name)}. Tłumaczenie na język polski: MeshCore Polska<br><a href="${escapeXml(post.sourceUrl)}">Źródło i oryginał: ${escapeXml(post.source.label)}</a></p>\n`;
};

const renderItem = (domain, post) => {
	const url = `${domain}${post.canonical}`;
	const image = post.image ? getSeoImage(domain, post.image, post.title) : null;

	return [
		'<item>',
		`<title>${escapeXml(post.title)}</title>`,
		`<link>${escapeXml(url)}</link>`,
		`<guid isPermaLink="false">tag:meshcorepolska.org,2026-07-31:aktualnosci/${escapeXml(post.slug)}</guid>`,
		`<pubDate>${post.publishedAt.toUTCString()}</pubDate>`,
		`<atom:updated>${post.date.toISOString()}</atom:updated>`,
		`<dc:creator>${escapeXml(post.sourceAuthor?.name || post.source.label)}</dc:creator>`,
		...post.tags.map(tag => `<category>${escapeXml(tag.label)}</category>`),
		`<description>${escapeXml(post.description || post.title)}</description>`,
		`<content:encoded>${toCdata(renderContent(post, url))}</content:encoded>`,
		...(image ? [`<media:content url="${escapeXml(new URL(image.url).href)}" medium="image"><media:description>${escapeXml(image.alt)}</media:description></media:content>`] : []),
		'</item>',
	].join('\n');
};

const renderFeed = (domain, posts, tag) => {
	const title = tag ? `${TITLE}: ${tag.label}` : TITLE;
	const link = `${domain}${tag ? `/aktualnosci/${tag.slug}` : '/aktualnosci'}`;
	const items = posts.slice(0, MAX_ITEMS);
	const lastBuild = items.reduce((acc, post) => (!acc || post.date > acc ? post.date : acc), null);

	const xml = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">',
		'<channel>',
		`<title>${escapeXml(title)}</title>`,
		`<link>${escapeXml(link)}</link>`,
		`<description>${escapeXml(tag?.description || DESCRIPTION)}</description>`,
		'<language>pl-PL</language>',
		...(lastBuild ? [`<lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>`] : []),
		'<ttl>60</ttl>',
		'<docs>https://www.rssboard.org/rss-specification</docs>',
		`<atom:link href="${escapeXml(domain + getFeedPath(tag))}" rel="self" type="application/rss+xml"/>`,
		`<image><url>${escapeXml(`${domain}/images/logo/favicon-128x128.png`)}</url><title>${escapeXml(title)}</title><link>${escapeXml(link)}</link><width>128</width><height>128</height></image>`,
		...items.map(post => renderItem(domain, post)),
		'</channel>',
		'</rss>',
		'',
	].join('\n');

	return xml.replace(INVALID_XML_RE, '');
};

export { renderFeed, getFeedPath, TITLE as FEED_TITLE };
