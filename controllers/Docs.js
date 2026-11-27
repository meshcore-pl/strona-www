import docs from '../services/docs.js';
import RenderError from '../utils/renderError.js';
import buildSchema from '../utils/schema.js';
import { getRandomTip } from '../content/tips.js';
import getSeoImage, { DEFAULT_THEME_COLOR } from '../utils/seoImage.js';

export const index = (req, res) => res.render('docs/index.ejs', { groups: docs.groups, tip: getRandomTip() });

export const group = (req, res) => {
	const docsGroup = docs.getGroup(req.params.group);
	if (!docsGroup) return RenderError(res, 404);

	res.set('Last-Modified', docsGroup.lastModified.toUTCString());
	res.set('Cache-Control', 'no-cache');
	res.render('docs/group.ejs', { groups: docs.groups, group: docsGroup, tip: getRandomTip() });
};

export const redirectLogo = (req, res) => res.redirect(301, '/dokumentacja/spolecznosc/materialy-graficzne');

export const page = (req, res) => {
	const docsGroup = docs.getGroup(req.params.group);
	if (!docsGroup) return RenderError(res, 404);

	const docsPage = docs.getPage(req.params.group, req.params.slug);
	if (!docsPage) return RenderError(res, 404);

	res.set('Last-Modified', docsPage.date.toUTCString());
	res.set('Cache-Control', 'no-cache');

	const locals = {
		title: `${docsPage.title} | MeshCore Polska`,
		description: docsPage.description || `${docsPage.title} - dokumentacja MeshCore Polska.`,
		canonical: docsPage.canonical,
		groups: docs.groups,
		group: docsGroup,
		page: docsPage,
		articleTitle: docsPage.title,
		articleSection: docsGroup.title,
		datePublished: docsPage.publishedAt.toISOString(),
		dateModified: docsPage.date.toISOString(),
		faq: docsPage.faq,
		image: docsPage.image,
		breadcrumbs: [
			{ name: 'Strona główna', url: '/' },
			{ name: 'Dokumentacja', url: '/dokumentacja' },
			{ name: docsGroup.title, url: `/dokumentacja/${docsGroup.slug}` },
			{ name: docsPage.title, url: docsPage.canonical },
		],
	};

	res.vary('X-Docs-Fetch');
	if (req.get('X-Docs-Fetch') !== '1') return res.render('docs/page.ejs', locals);

	res.render('docs/_page-content.ejs', locals, (err, html) => {
		if (err) return RenderError(res, 500, err);

		const domain = req.app.locals.domain;
		const ogImage = getSeoImage(domain, docsPage.image, docsPage.title);

		res.json({
			title: locals.title,
			description: locals.description,
			canonicalUrl: `${domain}${docsPage.canonical}`,
			image: ogImage.url,
			datePublished: locals.datePublished,
			dateModified: locals.dateModified,
			articleSection: locals.articleSection,
			themeColor: docsPage.themeColor || DEFAULT_THEME_COLOR,
			imageAlt: ogImage.alt,
			schema: JSON.stringify(buildSchema(domain, locals)),
			html,
		});
	});
};
