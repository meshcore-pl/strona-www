export const sendSuccess = (res, data, message = 'OK') => res.json({ success: true, status: 200, message, data });

export const sendError = (res, status, message, data) => res.status(status).json({ success: false, status, message, data });
