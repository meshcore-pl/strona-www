import docs from '../services/docs.js';
import RenderError from '../utils/renderError.js';
import buildSchema from '../utils/schema.js';
import { getRandomTip } from '../content/tips.js';

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
		const ogImage = docsPage.image ? ((/^https?:\/\//i).test(docsPage.image.src) ? docsPage.image.src : domain + docsPage.image.src) : `${domain}/images/brand/banner-og.jpg`;
		const schema = buildSchema({
			domain,
			breadcrumbs: locals.breadcrumbs,
			article: {
				title: docsPage.title,
				description: locals.description,
				datePublished: docsPage.publishedAt.toISOString().slice(0, 10),
				dateModified: docsPage.date.toISOString().slice(0, 10),
				url: docsPage.canonical,
				image: ogImage,
			},
			faq: docsPage.faq,
		});

		res.json({
			title: locals.title,
			description: locals.description,
			canonicalUrl: `${domain}${docsPage.canonical}`,
			image: ogImage,
			themeColor: docsPage.themeColor || '#95010b',
			imageAlt: docsPage.image ? docsPage.image.alt || docsPage.title : 'MeshCore Polska: ogólnopolska społeczność sieci mesh',
			schema: JSON.stringify(schema),
			html,
		});
	});
};
