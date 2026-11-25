import type { NextFunction, Request, Response } from 'express';
import type TokenService from './services/token/token.service';

export const createAuthMiddleware = (tokenService: TokenService) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const header = req.headers.authorization;
		const token = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : null;

		if (!token) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		try {
			res.locals.userId = tokenService.verifyAccess(token).id;
		} catch {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		next();
	};
};
