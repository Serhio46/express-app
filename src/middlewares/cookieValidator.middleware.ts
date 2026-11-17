import { type Request, type Response, type NextFunction } from 'express';

export const cookieValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
	console.log('Cookies:', req.cookies);

	next();
};
