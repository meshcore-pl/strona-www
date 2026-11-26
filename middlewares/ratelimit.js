import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import RedisClient from '../global/services/redis.js';
import RenderError from '../utils/renderError.js';

const redisStore = prefix => new RedisStore({ sendCommand: (...args) => RedisClient.sendCommand(args), prefix });

export const global = rateLimit({
	windowMs: 60 * 1000,
	limit: 100,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
	store: redisStore('mcpl:ratelimit:global:'),
	handler: (req, res) => RenderError(res, 429),
});

export const contactForm = rateLimit({
	windowMs: 60 * 60 * 1000,
	limit: 3,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
	store: redisStore('mcpl:ratelimit:contactForm:'),
	handler: (req, res) => RenderError(res, 429),
});
