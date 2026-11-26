const DEFAULT_IMAGE = { src: '/images/brand/banner-og.jpg', alt: 'MeshCore Polska: ogólnopolska społeczność sieci mesh' };

export const DEFAULT_THEME_COLOR = '#95010b';

export default (domain, image, fallbackAlt) => {
	const { src, alt } = image ?? DEFAULT_IMAGE;
	return { url: (/^https?:\/\//i).test(src) ? src : domain + src, alt: alt || fallbackAlt };
};
