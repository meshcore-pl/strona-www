import createTimeout from '../global/middlewares/timeout.js';
import RenderError from '../utils/renderError.js';

export default () => createTimeout({ onTimeout: res => RenderError(res, 503) });
