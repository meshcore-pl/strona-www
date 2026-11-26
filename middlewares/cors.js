const PREFLIGHT_HEADERS = {
	'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
	'Access-Control-Allow-Headers': '*',
	'Access-Control-Max-Age': '86400',
};

export default (req, res, next) => {
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Expose-Headers': 'RateLimit, RateLimit-Policy, Retry-After',
	});
	if (req.method !== 'OPTIONS') return next();

	res.set(PREFLIGHT_HEADERS).sendStatus(204);
};
