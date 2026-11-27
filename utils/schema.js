import getSeoImage from './seoImage.js';
import { toStandaloneHtml } from './html.js';

const NAME = 'MeshCore Polska';
const DESCRIPTION = 'Pierwsza ogólnopolska społeczność skupiona wokół sieci MeshCore, czyli komunikacji radiowej LoRa działającej bez internetu i GSM.';
const EMAIL = 'contact@sefinek.net';

export default (domain, {
	title, description, canonical, image, pageType = 'WebPage', itemList, breadcrumbs, faq,
	datePublished, dateModified = datePublished, articleTitle = title, articleType, articleSection, articleTags, articleAuthor, articleSourceUrl,
}) => {
	const organizationId = `${domain}/#organization`;
	const websiteId = `${domain}/#website`;

	const graph = [
		{
			'@type': 'Organization',
			'@id': organizationId,
			name: NAME,
			description: DESCRIPTION,
			url: `${domain}/`,
			logo: { '@type': 'ImageObject', url: `${domain}/images/brand/logo-3-192.jpg`, width: 192, height: 192 },
			email: EMAIL,
			contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: EMAIL, url: `${domain}/kontakt`, availableLanguage: 'pl' },
			areaServed: { '@type': 'Country', name: 'Polska' },
			sameAs: [`https://discord.com/invite/${process.env.DISCORD_INVITE_CODE}`, 'https://github.com/meshcore-pl'],
		},
		{
			'@type': 'WebSite',
			'@id': websiteId,
			name: NAME,
			description: DESCRIPTION,
			url: `${domain}/`,
			inLanguage: 'pl-PL',
			publisher: { '@id': organizationId },
		},
	];

	if (!canonical) return { '@context': 'https://schema.org', '@graph': graph };

	const url = `${domain}${canonical}`;
	const webPageId = `${url}#webpage`;
	const breadcrumbId = breadcrumbs && `${url}#breadcrumb`;
	const imageUrl = getSeoImage(domain, image).url;

	let mainEntity;
	if (faq?.length) {
		mainEntity = faq.map(f => ({
			'@type': 'Question',
			name: f.question,
			acceptedAnswer: { '@type': 'Answer', text: toStandaloneHtml(f.answerHtml, url).trim() },
		}));
	} else if (itemList?.length) {
		mainEntity = {
			'@type': 'ItemList',
			numberOfItems: itemList.length,
			itemListElement: itemList.map((item, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: item.name,
				url: `${domain}${item.url}`,
			})),
		};
	}

	graph.push({
		'@type': faq?.length ? [pageType, 'FAQPage'] : pageType,
		'@id': webPageId,
		url,
		name: title,
		description,
		inLanguage: 'pl-PL',
		isPartOf: { '@id': websiteId },
		about: canonical === '/' ? { '@id': organizationId } : undefined,
		primaryImageOfPage: { '@type': 'ImageObject', url: imageUrl },
		breadcrumb: breadcrumbId && { '@id': breadcrumbId },
		datePublished,
		dateModified,
		mainEntity,
	});

	if (breadcrumbs) {
		graph.push({
			'@type': 'BreadcrumbList',
			'@id': breadcrumbId,
			itemListElement: breadcrumbs.map((item, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: item.name,
				item: `${domain}${item.url}`,
			})),
		});
	}

	if (datePublished) {
		const organization = { '@id': organizationId };

		graph.push({
			'@type': articleType || ['Article', 'TechArticle'],
			'@id': `${url}#article`,
			headline: articleTitle,
			description,
			image: imageUrl,
			datePublished,
			dateModified,
			inLanguage: 'pl-PL',
			url,
			articleSection,
			keywords: articleTags?.length ? articleTags : undefined,
			author: articleAuthor || organization,
			publisher: organization,
			translator: articleSourceUrl ? organization : undefined,
			translationOfWork: articleSourceUrl ? { '@type': 'BlogPosting', '@id': articleSourceUrl, url: articleSourceUrl, inLanguage: 'en', author: articleAuthor } : undefined,
			isPartOf: { '@id': webPageId },
			mainEntityOfPage: { '@id': webPageId },
		});
	}

	return { '@context': 'https://schema.org', '@graph': graph };
};
