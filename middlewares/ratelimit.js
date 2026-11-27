import createRateLimit from '../global/middlewares/rateLimit.js';
import RenderError from '../utils/renderError.js';

const handler = (req, res) => RenderError(res, 429);

export const global = createRateLimit({ windowMs: 60 * 1000, limit: 100, prefix: 'mcpl:ratelimit:global:', handler });
export const contactForm = createRateLimit({ windowMs: 60 * 60 * 1000, limit: 3, prefix: 'mcpl:ratelimit:contactForm:', handler });
