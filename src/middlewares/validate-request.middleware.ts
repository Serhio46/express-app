import type { NextFunction, Request, Response } from 'express';
import { validationResult, param, query, type ValidationChain } from 'express-validator';

export const validateRequestMiddleware = (request: Request, response: Response, next: NextFunction) => {
	const errors = validationResult(request);
	if (!errors.isEmpty()) {
		return response.status(400).json({ errors: errors.array() });
	}

	next();
};

export const uuidValidator = [param('id').isUUID().withMessage('Id should be a UUID')];

export const createPaginationValidator = ([min, max]: [number, number], page: number): ValidationChain[] => [
	query('limit')
		.optional()
		.isInt({ min, max })
		.withMessage(`Limit must be between ${min} and ${max} characters`)
		.toInt(),
	query('page')
		.optional()
		.isInt({ min: page })
		.withMessage(`Page must be an integer greater than ${page}`)
		.toInt(),
];
