export default [
	{ path: '/', view: 'index.ejs' },
	{ path: '/dokumentacja' },
	{ path: '/kontakt' },
	{ path: '/aktualnosci' },
	{ path: '/statystyki', view: 'stats.ejs' },
	{ path: '/wojewodztwa' },
	{ path: '/generator-regionow', view: 'region-generator.ejs' },
	{ path: '/generator-nazw', view: 'name-generator.ejs' },
	{ path: '/polityka-prywatnosci', view: 'privacy.ejs' },
];
