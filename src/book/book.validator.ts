import { body } from 'express-validator';
import type { ValidationChain } from 'express-validator';
import { createPaginationValidator, uuidValidator } from '../middlewares/validate-request.middleware';

const GENRES = ['Fiction', 'Non-Fiction', 'Mystery', 'Biography', 'Fantasy'];

const requiredString = (field: string, label: string, min = 2, max = 200): ValidationChain =>
	body(field)
		.isString()
		.withMessage(`${label} should be a string`)
		.bail()
		.trim()
		.isLength({ min, max })
		.withMessage(`${label} should be between ${min} and ${max} characters`);

export const createBookValidator: ValidationChain[] = [
	requiredString('title', 'Title'),
	requiredString('author', 'Author'),
	body('genre')
		.isString()
		.withMessage('Genre should be a string')
		.bail()
		.isIn(GENRES)
		.withMessage(`Genre should be one of: ${GENRES.join(', ')}`),
];

export const updateBookValidator: ValidationChain[] = [...uuidValidator, ...createBookValidator];
export const getAllBooksValidator = createPaginationValidator([5, 100], 1);
export const getBookByIdValidator = uuidValidator;
export const deleteBookValidator = uuidValidator;
