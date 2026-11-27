const SVG_RE = /<svg\b[\s\S]*?<\/svg>\s*/g;
const HEADING_ANCHOR_RE = /<a\b[^>]*\sclass="docs-anchor"[^>]*><\/a>/g;
const TAG_RE = /<[a-z][^>]*>/gi;
const URL_ATTR_RE = /(\s(?:href|src|poster)=")([^"]*)"/gi;

const absolutizeUrls = (html, baseUrl) => html.replace(TAG_RE, element => element.replace(URL_ATTR_RE, (match, attr, value) => {
	const url = URL.parse(value, baseUrl);
	return url ? `${attr}${url.href.replaceAll('"', '%22')}"` : match;
}));

export const toStandaloneHtml = (html, baseUrl) => absolutizeUrls(html.replace(SVG_RE, '').replace(HEADING_ANCHOR_RE, ''), baseUrl);
