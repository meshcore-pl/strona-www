import news from '../../services/news.js';
import { sendSuccess, sendError } from '../../utils/apiResponse.js';

export const getPost = (req, res) => {
	const { sourceUrl } = req.query;
	if (typeof sourceUrl !== 'string' || !sourceUrl) return sendError(res, 400, 'Podaj parametr sourceUrl.');

	const post = news.posts.find(p => p.sourceUrl === sourceUrl);
	if (!post) return sendError(res, 404, 'Nie znaleziono wpisu.');

	res.set('Cache-Control', 'public, max-age=300');
	sendSuccess(res, { url: post.canonical, title: post.title, markdown: post.markdown });
};

export const getSources = (req, res) => {
	const data = {};
	for (const post of news.posts) {
		if (post.sourceUrl) data[post.sourceUrl] = post.canonical;
	}

	res.set('Cache-Control', 'public, max-age=300');
	sendSuccess(res, data);
};
