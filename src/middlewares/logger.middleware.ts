import { type Request, type Response, type NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const { baseUrl, path, params, query, body, method, originalUrl } = req;
	console.log('Request Details:', {
		baseUrl,
		path,
		params,
		query,
		body,
		method,
		originalUrl,
	});

	next();
};
