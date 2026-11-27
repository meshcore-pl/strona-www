import { createSeo, ORGANIZATIONS } from '../global/utils/seo.js';
import getSeoImage from './seoImage.js';
import { toStandaloneHtml } from './html.js';

const organization = ORGANIZATIONS.pl;
const site = { name: organization.name, description: organization.description };
const DEFAULT_IMAGE_SIZE = { width: 1200, height: 675 };

export default (domain, {
	title, description, keywords, canonical, noindex, image, pageType, itemList, breadcrumbs, faq,
	datePublished, dateModified, articleTitle, articleType, articleSection, articleTags, articleAuthor, articleSourceUrl,
}) => createSeo({
	domain,
	organization,
	site,
	title,
	description,
	keywords,
	canonical,
	noindex,
	image: { ...getSeoImage(domain, image, articleTitle || title), ...!image && DEFAULT_IMAGE_SIZE },
	pageType,
	aboutOrganization: canonical === '/',
	itemList,
	breadcrumbs,
	faq: faq?.map(({ question, answerHtml }) => ({ question, answerHtml: toStandaloneHtml(answerHtml, `${domain}${canonical}`).trim() })),
	article: datePublished ? {
		type: articleType,
		title: articleTitle,
		section: articleSection,
		tags: articleTags,
		author: articleAuthor,
		sourceUrl: articleSourceUrl,
		datePublished,
		dateModified,
	} : undefined,
});
